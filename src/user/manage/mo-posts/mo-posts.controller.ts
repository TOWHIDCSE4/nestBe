import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoPostsService } from './mo-posts.service';
import { CreateMoPostDto } from './dto/create-mo-post.dto';
import { UpdateMoPostDto } from './dto/update-mo-post.dto';

@Controller('mo-posts')
export class MoPostsController {
  constructor(private readonly moPostsService: MoPostsService) {}

  @Post()
  create(@Body() createMoPostDto: CreateMoPostDto) {
    return this.moPostsService.create(createMoPostDto);
  }

  @Get()
  findAll() {
    return this.moPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moPostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoPostDto: UpdateMoPostDto) {
    return this.moPostsService.update(+id, updateMoPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moPostsService.remove(+id);
  }
}
