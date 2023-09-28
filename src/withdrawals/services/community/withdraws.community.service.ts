import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import dayjs from 'dayjs';
import { paginate } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';
import { User } from '../../../auth/entities/user.entity';
import { AccountRankDefineCode } from '../../../auth/enums/user.enum';
import { UserRepository } from '../../../auth/repositories/user.repository';
import { PrefixType } from '../../../common/constants/global.constant';
import { StatusCode } from '../../../common/constants/status-code.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { EventEmitterName } from '../../../common/enums/app.enum';
import { BadRequestExc } from '../../../common/exceptions/custom.exception';
import {
  NotiUserDefineCode,
  TypeFCM,
} from '../../../notification/enums/noti.enum';
import {
  GetListWithdrawalReqDto,
  RequestWithdrawalReqDto,
  UpdateWithdrawalReqDto,
} from '../../dtos/req/withdrawals.req.dto';
import { StatusWithdrawalDefineCode } from '../../enums/wallet-transaction.enum';
import { EWalletCollaboratorsRepository } from '../../repositories/e-wallet-collaborators.repository';
import { WithdrawalsRepository } from '../../repositories/withdrawals.repository';

@Injectable()
export class WithdrawalsCommunityService {
  constructor(
    private userRepo: UserRepository,
    private withdrawalsRepo: WithdrawalsRepository,
    private eventEmitter: EventEmitter2,
    private eWalletCollaboratorsRepo: EWalletCollaboratorsRepository,
  ) {}

  @Transactional()
  async requestWithdrawal(body: RequestWithdrawalReqDto, user: User) {
    const { amount_money } = body;
    if (user.account_rank !== AccountRankDefineCode.LOYAL) {
      throw new BadRequestExc(StatusCode.FUNC_REQUIRE_ACCOUNT_RANK_LOYAL);
    }

    const accountBalance = await this.eWalletCollaboratorsRepo.findOneBy({
      user_id: user.id,
    });

    if (!accountBalance) {
      throw new BadRequestExc(StatusCode.NOT_E_WALLET_EXISTS);
    }

    const withdrawal = await this.withdrawalsRepo.findOneBy({
      user_id: user.id,
      status: StatusWithdrawalDefineCode.PROGRESSING,
    });
    if (withdrawal) {
      throw new BadRequestExc(StatusCode.REQUEST_WITHDRAWAL_PREVIOUS_NO_HANDLE);
    }

    if (amount_money < 0) {
      throw new BadRequestExc(StatusCode.INVALID_MONEY);
    }
    if (amount_money > accountBalance.account_balance) {
      throw new BadRequestExc(
        StatusCode.WITHDRAWAL_MONEY_CANNOT_GREATER_THAN_BALANCE,
      );
    }
    const withdrawalCreate = await this.withdrawalsRepo.save({
      user_id: user.id,
      amount_money: amount_money,
      status: StatusWithdrawalDefineCode.PROGRESSING,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.eventEmitter.emit(EventEmitterName.NOTIFICATION_ADMIN, {
      user_id: user.id,
      title: 'Yêu cầu rút tiền mới',
      content: `Yêu cầu rút tiền mới từ người dùng ${user.name}`,
      type: TypeFCM.NEW_REQUEST_WITHDRAWAL,
      role: NotiUserDefineCode.USER_IS_ADMIN,
      references_value: withdrawalCreate.id,
    });

    return AppResponseDto.fromNonePagination(withdrawalCreate);
  }

  async getList(query: GetListWithdrawalReqDto, user: User, headers: any) {
    const {
      date_from,
      date_to,
      descending,
      limit,
      money_from,
      money_to,
      page,
      sort_by,
      status,
    } = query;

    if (limit >= 600 || limit < 1) {
      throw new BadRequestExc(StatusCode.INVALID_LIMIT_REQUEST);
    }

    let dateFrom, dateTo;
    if (date_from !== null && date_to !== null) {
      const date1 = dayjs(date_from);
      const date2 = dayjs(date_to);

      dateFrom = date1.format('YYYY-MM-DD 00:00:00');
      dateTo = date2.format('YYYY-MM-DD 23:59:59');
    }

    const queryBuilder = this.withdrawalsRepo
      .createQueryBuilder('withdrawals')
      .where('withdrawals.user_id = :userId', { userId: user.id });

    if (status) {
      queryBuilder.andWhere('withdrawals.status = :status', { status });
    }
    if (money_from) {
      queryBuilder.andWhere('withdrawals.amount_money >= :moneyFrom', {
        moneyFrom: money_from,
      });
    }
    if (money_to) {
      queryBuilder.andWhere('withdrawals.amount_money <= :moneyTo', {
        moneyTo: money_to,
      });
    }
    if (dateFrom) {
      queryBuilder.andWhere('withdrawals.created_at >= :dateFrom', {
        dateFrom,
      });
    }
    if (dateTo) {
      queryBuilder.andWhere('withdrawals.created_at <= :dateTo', {
        dateTo,
      });
    }
    if (sort_by) {
      queryBuilder.orderBy(
        sort_by || 'created_at',
        descending ? 'DESC' : 'ASC',
      );
    }
    const { items, meta } = await paginate(queryBuilder, { limit, page });
    return AppResponseDto.fromPagination({
      data: items,
      limit,
      meta,
      page,
      url: `${headers?.host}/${PrefixType.USER}/community/request_withdrawals`,
    });
  }

  async getDetail(id: number, user: User) {
    const withdrawalRequestExist = await this.withdrawalsRepo.findOneBy({
      id,
      user_id: user.id,
    });

    if (!withdrawalRequestExist) {
      throw new BadRequestExc(StatusCode.NO_WITHDRAWAL_ID_EXISTS);
    }
    return AppResponseDto.fromNonePagination(withdrawalRequestExist);
  }

  async deleteWithdrawal(id: number, user: User) {
    const withdrawalRequestExist = await this.withdrawalsRepo.findOneBy({
      id,
      user_id: user.id,
    });
    if (!withdrawalRequestExist)
      throw new BadRequestExc(StatusCode.NO_WITHDRAWAL_ID_EXISTS);

    if (withdrawalRequestExist.status === StatusWithdrawalDefineCode.APPROVED)
      throw new BadRequestExc(StatusCode.REQUEST_WITHDRAWAL_HAS_APPROVED);

    await this.withdrawalsRepo.delete(withdrawalRequestExist);
    return AppResponseDto.fromNonePagination({});
  }

  async updateRequestWithdrawal(
    body: UpdateWithdrawalReqDto,
    user: User,
    id: number,
  ) {
    const { amount_money, status } = body;
    const withdrawalRequestExist = await this.withdrawalsRepo.findOneBy({
      id,
      user_id: user.id,
    });
    if (!withdrawalRequestExist)
      throw new BadRequestExc(StatusCode.NO_WITHDRAWAL_ID_EXISTS);

    const accountBalance = await this.eWalletCollaboratorsRepo.findOneBy({
      user_id: user.id,
    });

    if (!accountBalance) {
      throw new BadRequestExc(StatusCode.NOT_E_WALLET_EXISTS);
    }

    if (status === StatusWithdrawalDefineCode.APPROVED)
      throw new BadRequestExc(StatusCode.INVALID_REQUEST_WITHDRAWAL_STATUS);

    if (withdrawalRequestExist.status === StatusWithdrawalDefineCode.APPROVED)
      throw new BadRequestExc(StatusCode.REQUEST_WITHDRAWAL_HAS_APPROVED);

    if (amount_money > accountBalance.account_balance) {
      throw new BadRequestExc(
        StatusCode.WITHDRAWAL_MONEY_CANNOT_GREATER_THAN_BALANCE,
      );
    }
    if (amount_money < 0) throw new BadRequestExc(StatusCode.INVALID_MONEY);

    withdrawalRequestExist.amount_money = amount_money;
    withdrawalRequestExist.status = status;
    withdrawalRequestExist.updated_at = new Date();

    const withdrawalRequestUpdated = await this.withdrawalsRepo.save(
      withdrawalRequestExist,
    );
    return AppResponseDto.fromNonePagination(withdrawalRequestUpdated);
  }
}
