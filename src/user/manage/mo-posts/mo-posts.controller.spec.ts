import { Test, TestingModule } from '@nestjs/testing';
import { MoPostsController } from './mo-posts.controller';
import { MoPostsService } from './mo-posts.service';

describe('MoPostsController', () => {
  let controller: MoPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoPostsController],
      providers: [MoPostsService],
    }).compile();

    controller = module.get<MoPostsController>(MoPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
