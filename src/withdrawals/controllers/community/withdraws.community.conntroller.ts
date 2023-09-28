import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateUserRequirePhone,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import {
  GetListWithdrawalReqDto,
  RequestWithdrawalReqDto,
  UpdateWithdrawalReqDto,
} from '../../dtos/req/withdrawals.req.dto';
import { WithdrawalsCommunityService } from '../../services/community/withdraws.community.service';

@Controller(`${PrefixType.USER}/community/request_withdrawals`)
@ApiTags('Community request withdrawals')
@AuthenticateUserRequirePhone()
export class WithdrawalsCommunityController {
  constructor(
    private withdrawalsCommunityService: WithdrawalsCommunityService,
  ) {}

  @Post()
  createRequestWithdraws(
    @CurrentUser() user: User,
    @Body() body: RequestWithdrawalReqDto,
  ) {
    return this.withdrawalsCommunityService.requestWithdrawal(body, user);
  }

  @Get()
  getRequestWithdraws(
    @CurrentUser() user: User,
    @Query() query: GetListWithdrawalReqDto,
    @Headers() headers: any,
  ) {
    return this.withdrawalsCommunityService.getList(query, user, headers);
  }

  @Get(':withdrawal_id')
  getDetailWithdrawal(
    @CurrentUser() user: User,
    @Param('withdrawal_id') id: number,
  ) {
    return this.withdrawalsCommunityService.getDetail(id, user);
  }

  @Delete(':withdrawal_id')
  deleteWithdrawal(
    @CurrentUser() user: User,
    @Param('withdrawal_id') id: number,
  ) {
    return this.withdrawalsCommunityService.deleteWithdrawal(id, user);
  }

  @Put(':withdrawal_id')
  updateRequestWithdraws(
    @CurrentUser() user: User,
    @Body() body: UpdateWithdrawalReqDto,
    @Param('withdrawal_id') id: number,
  ) {
    return this.withdrawalsCommunityService.updateRequestWithdrawal(
      body,
      user,
      id,
    );
  }
}
