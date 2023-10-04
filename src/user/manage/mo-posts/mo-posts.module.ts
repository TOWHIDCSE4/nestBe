/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MoPostsService } from './mo-posts.service';
import { MoPostsController } from './mo-posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoPost } from './entities/mo-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoPost])],
  controllers: [MoPostsController],
  providers: [MoPostsService],
})
export class MoPostsModule {}
