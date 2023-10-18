// service.controller.ts
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMoServiceDto } from '../dtos/update-mo-service.dto';
import { MoServiceService } from '../services/mo-service.service';

import { AuthenticateAdmin } from '../../common/decorators/auth.decorator';

@ApiTags('MoService')
@Controller('user/manage/mo_services')
@AuthenticateAdmin()
export class MoServiceController {
  constructor(private readonly MosSrviceService: MoServiceService) {}

  @Put(':mo_service_id')
  async update(
    @Param('mo_service_id') mo_service_id: number,
    @Body() updateMoServiceDto: UpdateMoServiceDto,
  ) {
    try {
      const service = await this.MosSrviceService.update(
        mo_service_id,
        updateMoServiceDto,
      );
      return {
        code: 200,
        success: true,
        msg_code: 'SUCCESS',
        msg: 'Success',
        data: service,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          success: true,
          msg_code: 'BAD REQUEST',
          msg: 'Mo Service Not Found with that Id',
          data: null,
        };
      }
    }
  }

  @Get('motel_id/' + ':mo_service_id')
  async getInfoByServiceId(@Param('mo_service_id') mo_service_id: number) {
    try {
      const services = await this.MosSrviceService.getByMoServiceId(
        mo_service_id,
      );
      return {
        code: 200,
        success: true,
        msg_code: 'SUCCESS',
        msg: 'Success',
        data: services,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          success: true,
          msg_code: 'BAD REQUEST',
          msg: 'Mo Service Not Found with that Id',
          data: null,
        };
      }
    }
  }
}
