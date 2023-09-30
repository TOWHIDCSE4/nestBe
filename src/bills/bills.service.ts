/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bills } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bills) private readonly billRepository: Repository<Bills>,
  ) { }

  create(createBillDto: CreateBillDto) {
    return 'This action adds a new bill';
  }

  async findAll() {
    const bills = await this.billRepository.find();
    return bills;
  }

  async findById(id: number): Promise<Bills> {
    return this.billRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
