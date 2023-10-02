/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminMotels } from './entities/admin-motels.entity';
import { BadRequestExc } from '../../common/exceptions/custom.exception';
import { StatusCode } from '../../common/constants/status-code.constant';
import { AppResponseDto } from '../../common/dtos/app-response.dto';

@Injectable()
export class AdminMotelService {
  constructor(
    @InjectRepository(AdminMotels)
    private motelRepository: Repository<AdminMotels>,
  ) { }

  async getById(motelId: number) {

    const motel = await this.motelRepository.findOne({
      where: {
        id: motelId,
      },
    })


    if (!motel) {
      throw new NotFoundException('No motel exists with the given ID');
    }
    return motel;
  }

  async getAll() {
    const banners = await this.motelRepository.find({});
    return banners;
  }

  async deleteMotels(motelId: number) {
    const motel = await this.motelRepository.findOne({
      where: {
        id: motelId,
      },
    })

    if (!motel)
      throw new BadRequestExc(StatusCode.NO_SERVICE_SELL_EXISTS);

    await this.motelRepository.delete(motelId);

    return AppResponseDto.fromNonePagination({ idDeleted: motelId });
  }
}
