/* eslint-disable prettier/prettier */
import { IsValidBoolean, IsValidDate, IsValidNumber, IsValidText } from "../../common/decorators/custom-validator.decorator";
import { PaginationReqDto } from "../../common/dtos/pagination.dto";


export class GetListBillDto extends PaginationReqDto {
    @IsValidDate({ required: false })
    date_from?: Date;
  
    @IsValidDate({ required: false })
    date_to?: Date;
  
    @IsValidNumber({ required: false })
    money_from?: number;
  
    @IsValidNumber({ required: false })
    money_to?: number;
  
    @IsValidText({ required: false })
    sort_by?: string;
  
    @IsValidBoolean({ required: false })
    descending?: boolean;
  
    @IsValidNumber({ required: false })
    status?: number;
  }