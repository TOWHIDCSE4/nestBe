/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminMotels } from './entities/admin-motels.entity';

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
}
