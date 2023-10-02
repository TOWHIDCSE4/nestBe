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
  // createRequestWithdraws(
  //   @CurrentUser() user: User,
  //   @Body() body: RequestWithdrawalReqDto,
  // ) {
  //   return this.withdrawalsCommunityService.requestWithdrawal(body, user);
  // }


  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  @ApiParam({ name: 'bill_id', required: false })
  @Get(':bill_id')
  async findAll(@Param('bill_id') bill_id?: number) {
    try {
      const users = bill_id ? await this.billsService.findById(bill_id) : await this.billsService.findAll();
      return new QueryResponseDto(
        HttpStatus.OK,
        true,
        MsgCode.SUCCESS[0],
        MsgCode.SUCCESS[1],
        users,
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
}
