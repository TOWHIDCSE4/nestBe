/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entties/user.entity';
import { BadRequestExc } from '../../common/exceptions/custom.exception';
import { StatusCode } from '../../common/constants/status-code.constant';
import { GetListUserDto } from './dtos/list-user.dto';
import dayjs from 'dayjs';
import { paginate } from 'nestjs-typeorm-paginate';
import { AppResponseDto } from '../../common/dtos/app-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getList(query: GetListUserDto, headers: any) {
    const {
      name,
      phone_number,
      email,
      date_from,
      date_to,
      descending,
      sort_by,
      page,
      limit
    } = query;
    console.log(limit, page);

    if (limit >= 600 || limit < 1) {
      throw new BadRequestExc(StatusCode.INVALID_LIMIT_REQUEST);
    }

    let dateFrom, dateTo;
    if (date_from && date_to) {
      const date1 = dayjs(date_from);
      const date2 = dayjs(date_to);

      dateFrom = date1.format('YYYY-MM-DD 00:00:00');
      dateTo = date2.format('YYYY-MM-DD 23:59:59');
    }

    const queryBuilder = this.userRepository
      .createQueryBuilder('users')

    if (name) {
      queryBuilder.andWhere('users.name = :name', { name });
    }
    if (phone_number) {
      queryBuilder.andWhere('users.phone_number = :phone_number', { phone_number });
    }
    if (email) {
      queryBuilder.andWhere('users.email = :email', { email });
    }

    if (dateFrom) {
      queryBuilder.andWhere('users.created_at >= :dateFrom', {
        dateFrom,
      });
    }
    if (dateTo) {
      queryBuilder.andWhere('users.created_at <= :dateTo', {
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
      url: `${headers?.host}/api/admin/users`,
    });
  }

  async setHost(id: number): Promise<any> {
    const isUserExist = this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!isUserExist) {
      throw new NotFoundException('No User exists with the given ID');
    }
    const isUpdate = this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ is_host: 1 })
      .where('id = :id', { id })
      .execute();

    return isUpdate;
  }
}
