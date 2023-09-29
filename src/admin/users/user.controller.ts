/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { QueryResponseDto } from '../../shared/dto/query-response.dto';
import { MsgCode } from '../../shared/constants/message.constants';

@ApiTags('Users')
@Controller('admin/users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getAllUsers(): Promise<any> {

    try {
      const users = await this.userService.getAll();
      return new QueryResponseDto(
        HttpStatus.OK,
        true,
        MsgCode.SUCCESS[0],
        MsgCode.SUCCESS[1],
        users,
      );
    } catch (error) {
      console.log(error);
      
      if (error instanceof NotFoundException) {
        return {
            code: 404,
            success: true,
            msg_code: 'BAD REQUEST',
            msg: 'Users Not Found',
            data: null,
        };
    }

    }

  }


  @Get(':user_id')
  async getUserById(@Param('user_id') user_id: number): Promise<any> {
      try {
          const banner = await this.userService.findById(user_id);
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
                  msg: 'User Not Found with that Id',
                  data: null,
              };
          }
      }
  }

}
