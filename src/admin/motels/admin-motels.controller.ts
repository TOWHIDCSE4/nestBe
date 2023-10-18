/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminMotelService } from './admin-motel.service';
import { MsgCode } from '../../shared/constants/message.constants';
import { QueryResponseDto } from '../../shared/dto/query-response.dto';
import { AuthenticateAdmin } from '../../common/decorators/auth.decorator';

@ApiTags('Admin Motel Service')
@Controller('admin/motels')
@AuthenticateAdmin()
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

    @Get(':motel_id')
    async getMotelById(@Param('motel_id') motel_id: number): Promise<any> {
        try {
            const banner = await this.motelService.getById(motel_id);
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
                    msg: 'Motels Not Found with that Id',
                    data: null,
                };
            }
        }
    }

    @Delete(':motel_id')
    deleteServiceSell(@Param('motel_id') motel_id: number) {
      return this.motelService.deleteMotels(motel_id);
    }
}
