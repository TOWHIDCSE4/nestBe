/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './entities/bill.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Bills])],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [TypeOrmModule, BillsService],

})
export class BillsModule { }
