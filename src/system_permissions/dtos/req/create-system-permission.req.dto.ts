import {
  IsValidBoolean,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class CreateSystemPermissionReqDto {
  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidBoolean({ required: false })
  view_badge?: boolean;

  @IsValidBoolean({ required: false })
  manage_motel?: boolean;

  @IsValidBoolean({ required: false })
  manage_user?: boolean;

  @IsValidBoolean({ required: false })
  manage_mo_post?: boolean;

  @IsValidBoolean({ required: false })
  manage_contract?: boolean;

  @IsValidBoolean({ required: false })
  manage_renter?: boolean;

  @IsValidBoolean({ required: false })
  manage_bill?: boolean;

  @IsValidBoolean({ required: false })
  manage_message?: boolean;

  @IsValidBoolean({ required: false })
  manage_report_problem?: boolean;

  @IsValidBoolean({ required: false })
  manage_service?: boolean;

  @IsValidBoolean({ required: false })
  manage_service_sell?: boolean;

  @IsValidBoolean({ required: false })
  manage_order_service_sell?: boolean;

  @IsValidBoolean({ required: false })
  manage_notification?: boolean;

  @IsValidBoolean({ required: false })
  setting_banner?: boolean;

  @IsValidBoolean({ required: false })
  setting_contact?: boolean;

  @IsValidBoolean({ required: false })
  setting_help?: boolean;

  @IsValidBoolean({ required: false })
  all_access?: boolean;

  @IsValidBoolean({ required: false })
  setting_category_help?: boolean;

  @IsValidBoolean({ required: false })
  manage_motel_consult?: boolean;

  @IsValidBoolean({ required: false })
  manage_report_statistic?: boolean;

  @IsValidBoolean({ required: false })
  able_decentralization?: boolean;

  @IsValidBoolean({ required: false })
  manage_collaborator?: boolean;

  @IsValidBoolean({ required: false })
  manage_wallet?: boolean;
}

export class UpdateSystemPermissionReqDto {
  @IsValidText({ required: false })
  name?: string;

  @IsValidText({ required: false })
  description?: string;

  @IsValidBoolean({ required: false })
  view_badge?: boolean;

  @IsValidBoolean({ required: false })
  manage_motel?: boolean;

  @IsValidBoolean({ required: false })
  manage_user?: boolean;

  @IsValidBoolean({ required: false })
  manage_mo_post?: boolean;

  @IsValidBoolean({ required: false })
  manage_contract?: boolean;

  @IsValidBoolean({ required: false })
  manage_renter?: boolean;

  @IsValidBoolean({ required: false })
  manage_bill?: boolean;

  @IsValidBoolean({ required: false })
  manage_message?: boolean;

  @IsValidBoolean({ required: false })
  manage_report_problem?: boolean;

  @IsValidBoolean({ required: false })
  manage_service?: boolean;

  @IsValidBoolean({ required: false })
  manage_service_sell?: boolean;

  @IsValidBoolean({ required: false })
  manage_order_service_sell?: boolean;

  @IsValidBoolean({ required: false })
  manage_notification?: boolean;

  @IsValidBoolean({ required: false })
  setting_banner?: boolean;

  @IsValidBoolean({ required: false })
  setting_contact?: boolean;

  @IsValidBoolean({ required: false })
  setting_help?: boolean;

  @IsValidBoolean({ required: false })
  all_access?: boolean;

  @IsValidBoolean({ required: false })
  setting_category_help?: boolean;

  @IsValidBoolean({ required: false })
  manage_motel_consult?: boolean;

  @IsValidBoolean({ required: false })
  manage_report_statistic?: boolean;

  @IsValidBoolean({ required: false })
  able_decentralization?: boolean;

  @IsValidBoolean({ required: false })
  manage_collaborator?: boolean;

  @IsValidBoolean({ required: false })
  manage_wallet?: boolean;
}
