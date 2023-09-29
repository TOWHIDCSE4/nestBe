/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminMotelService } from './admin-motel.service';
import { MsgCode } from '../../shared/constants/message.constants';
import { QueryResponseDto } from '../../shared/dto/query-response.dto';

@ApiTags('Admin Motel Service')
@Controller('admin/motels')
export class AdminMotelController {
    constructor(private readonly motelService: AdminMotelService) { }


    @Get()
    async getAllBanners(): Promise<any> {
      const banners = await this.motelService.getAll();
      return new QueryResponseDto(
        HttpStatus.OK,
        true,
        MsgCode.SUCCESS[0],
        MsgCode.SUCCESS[1],
        banners,
      );
    }

    @Get(':motelId')
    async getBannerById(@Param('motelId') motelId: number): Promise<any> {
        try {
            const banner = await this.motelService.getById(motelId);
            return new QueryResponseDto(
                HttpStatus.OK,
                true,
                MsgCode.SUCCESS[0],
                MsgCode.SUCCESS[1],
                banner,
            );
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
