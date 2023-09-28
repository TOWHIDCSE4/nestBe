import {
  IsValidBoolean,
  IsValidDate,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../common/dtos/pagination.dto';

export class WithdrawalsReqDto {
  @IsValidNumber({ required: false })
  withdraw_money?: number;

  @IsValidNumber({ required: false })
  account_number?: string;

  @IsValidText({ required: false })
  bank_account_holder_name?: string;

  @IsValidText({ required: false })
  bank_name?: string;

  @IsValidText({ required: false })
  withdraw_content?: string;
}

export class RequestWithdrawalReqDto {
  @IsValidNumber()
  amount_money: number;
}

export class GetListWithdrawalReqDto extends PaginationReqDto {
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

export class UpdateWithdrawalReqDto {
  @IsValidNumber()
  amount_money: number;

  @IsValidNumber({ required: false })
  status?: number;
}
