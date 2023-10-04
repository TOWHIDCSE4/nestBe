/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, HttpStatus, NotFoundException } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryResponseDto } from '../shared/dto/query-response.dto';
import { MsgCode } from '../shared/constants/message.constants';

@ApiTags('Users Bills')
@Controller('user/manage/bills')
export class BillsController {

  constructor(private readonly billsService: BillsService) { }


  // @Post()
  // create(@Body() createBillDto: CreateBillDto) {
  //   return this.billsService.create(createBillDto);
  // }

  @Get()
  async findAll() {
    try {
      const bills = await this.billsService.findAll();
      return new QueryResponseDto(
        HttpStatus.OK,
        true,
        MsgCode.SUCCESS[0],
        MsgCode.SUCCESS[1],
        bills,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          success: true,
          msg_code: 'BAD REQUEST',
          msg: 'Users Bill Not Found',
          data: null,
        };
      }
    }
  }
  @Get(':bill_id')
  async findOne(@Param('bill_id') bill_id: number) {
    try {
      const bill = await this.billsService.findById(bill_id)
      return new QueryResponseDto(
        HttpStatus.OK,
        true,
        MsgCode.SUCCESS[0],
        MsgCode.SUCCESS[1],
        bill,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          success: true,
          msg_code: 'BAD REQUEST',
          msg: 'User Bill Not Found',
          data: null,
        };
      }

    }
  }



}
