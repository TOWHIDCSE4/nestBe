/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { MoPostsService } from './mo-posts.service';
import { CreateMoPostDto } from './dto/create-mo-post.dto';
import { UpdateMoPostDto } from './dto/update-mo-post.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryResponseDto } from '../../../shared/dto/query-response.dto';
import { MsgCode } from '../../../shared/constants/message.constants';


@ApiTags('User Manage Mo-posts')
@Controller('user/manage/mo_posts')
export class MoPostsController {
  constructor(private readonly moPostsService: MoPostsService) { }


  @ApiParam({ name: 'post_id', required: false })
  @Get(':post_id')
  async findAll(@Param('post_id') post_id?: number) {
    try {
      const moPost = post_id ? await this.moPostsService.findOne(post_id) : await this.moPostsService.findAll();
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
