/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { MoPostsService } from './mo-posts.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryResponseDto } from '../../../shared/dto/query-response.dto';
import { MsgCode } from '../../../shared/constants/message.constants';


@ApiTags('User Manage Mo-posts')
@Controller('user/manage/mo_posts')
export class MoPostsController {
  constructor(private readonly moPostsService: MoPostsService) { }


  @Get()
  async findAll() {
    try {
      const moPosts = await this.moPostsService.findAll();
      return new QueryResponseDto(
        HttpStatus.OK,
        true,
        MsgCode.SUCCESS[0],
        MsgCode.SUCCESS[1],
        moPosts ? moPosts : "No data found!",
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          success: true,
          msg_code: 'BAD REQUEST',
          msg: 'Mo Post Not Found',
          data: null,
        };
      }
    }
  }

  @Get(':post_id')
  async findOne(@Param('post_id') post_id: number) {
    try {
      const moPost = await this.moPostsService.findOne(post_id)
      return new QueryResponseDto(
        HttpStatus.OK,
        true,
        MsgCode.SUCCESS[0],
        MsgCode.SUCCESS[1],
        moPost ? moPost : "No data found!",
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          success: true,
          msg_code: 'BAD REQUEST',
          msg: 'Mo Post Not Found',
          data: null,
        };
      }

    }
  }


  @Delete(':post_id')
  remove(@Param('post_id') post_id: string) {
    return this.moPostsService.remove(+post_id);
  }
}
