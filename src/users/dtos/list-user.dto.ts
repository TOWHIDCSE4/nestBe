/* eslint-disable prettier/prettier */
import { IsValidBoolean, IsValidDate, IsValidNumber, IsValidText } from "../../common/decorators/custom-validator.decorator";
import { PaginationReqDto } from "../../common/dtos/pagination.dto";


export class GetListUserDto extends PaginationReqDto {
  @IsValidText({ required: false })
  name?: string;
  
  @IsValidNumber({ required: false })
  phone_number?: number;

  @IsValidText({ required: false })
  email?: string;

  @IsValidDate({ required: false })
  date_from?: Date;

  @IsValidDate({ required: false })
  date_to?: Date;

  @IsValidBoolean({ required: false })
  descending?: boolean;

  @IsValidText({ required: false })
  sort_by?: string;

}