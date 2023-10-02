import { Module } from '@nestjs/common';
import { MoPostsService } from './mo-posts.service';
import { MoPostsController } from './mo-posts.controller';

@Module({
  controllers: [MoPostsController],
  providers: [MoPostsService]
})
export class MoPostsModule {}
