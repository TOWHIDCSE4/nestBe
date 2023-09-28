import {
  IsValidBoolean,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../common/dtos/pagination.dto';

export class GetListSystemPermissionReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  sort_by?: string;

  @IsValidBoolean({ required: false })
  descending?: boolean;
}
