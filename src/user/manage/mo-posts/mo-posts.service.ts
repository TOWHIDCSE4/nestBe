import { Injectable } from '@nestjs/common';
import { CreateMoPostDto } from './dto/create-mo-post.dto';
import { UpdateMoPostDto } from './dto/update-mo-post.dto';

@Injectable()
export class MoPostsService {
  create(createMoPostDto: CreateMoPostDto) {
    return 'This action adds a new moPost';
  }

  findAll() {
    return `This action returns all moPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moPost`;
  }

  update(id: number, updateMoPostDto: UpdateMoPostDto) {
    return `This action updates a #${id} moPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} moPost`;
  }
}
