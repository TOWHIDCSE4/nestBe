import { PartialType } from '@nestjs/swagger';
import { CreateMoPostDto } from './create-mo-post.dto';

export class UpdateMoPostDto extends PartialType(CreateMoPostDto) {}
