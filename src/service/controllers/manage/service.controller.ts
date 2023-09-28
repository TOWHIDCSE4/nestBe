// service.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from '../../dtos/create.service.dto';
import { Service } from '../../entities/service.entity';
import { ServiceManageService } from '../../services/manage/service.service';

@ApiTags('Services')
@Controller('user/manage/services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceManageService) {}

  @Get('/by/' + ':userId')
  async getAllByUserId(@Param('userId') userId: number) {
    const services = await this.serviceService.getAllByUserId(userId);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Get()
  async getAll() {
    const services = await this.serviceService.getAll();

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    const service = await this.serviceService.createService(createServiceDto);

    return service;
  }

  @Get(':service_id')
  async getInfoByServiceId(@Param('service_id') service_id: number) {
    const services = await this.serviceService.getByServiceId(service_id);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }
}
