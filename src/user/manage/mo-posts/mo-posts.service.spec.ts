import { Test, TestingModule } from '@nestjs/testing';
import { MoPostsService } from './mo-posts.service';

describe('MoPostsService', () => {
  let service: MoPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoPostsService],
    }).compile();

    service = module.get<MoPostsService>(MoPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
