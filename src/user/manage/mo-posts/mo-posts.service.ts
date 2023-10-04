/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoPost } from './entities/mo-post.entity';
import { Repository } from 'typeorm';
import { BadRequestExc } from '../../../common/exceptions/custom.exception';
import { StatusCode } from '../../../common/constants/status-code.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';

@Injectable()
export class MoPostsService {

  constructor(
    @InjectRepository(MoPost) private readonly moPostRepository: Repository<MoPost>,
  ) { }
  

  async findAll() {
    const bills = await this.moPostRepository.find({});
    return bills;
  }

  async findOne(id: number): Promise<MoPost> {
    
    return this.moPostRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    const post = await this.moPostRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!post)
      throw new BadRequestExc(StatusCode.NO_SERVICE_SELL_EXISTS);

    await this.moPostRepository.delete(id);

    return AppResponseDto.fromNonePagination({ idDeleted: id });
  }
}
