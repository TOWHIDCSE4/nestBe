import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { paginate } from 'nestjs-typeorm-paginate';
import { PrefixType } from '../../../common/constants/global.constant';
import { StatusCode } from '../../../common/constants/status-code.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import {
  BadRequestExc,
  UnauthorizedExc,
} from '../../../common/exceptions/custom.exception';
import {
  CreateSystemPermissionReqDto,
  UpdateSystemPermissionReqDto,
} from '../../dtos/req/create-system-permission.req.dto';
import { GetListSystemPermissionReqDto } from '../../dtos/req/get-list-system-permissions.req.dto';
import { SystemPermissionsRepository } from '../../repositories/system-permissions.repository';
@Injectable()
export class SystemPermissionsAdminService {
  constructor(private systemPermissionsRepo: SystemPermissionsRepository) {}

  async getAllPermissions(query: GetListSystemPermissionReqDto, headers: any) {
    const { descending, limit, page, sort_by } = query;

    if (limit >= 600 || limit < 1) {
      throw new BadRequestExc(StatusCode.INVALID_LIMIT_REQUEST);
    }

    const queryBuilder =
      this.systemPermissionsRepo.createQueryBuilder('system_permissions');

    if (sort_by) {
      queryBuilder.orderBy(
        sort_by || 'created_at',
        descending ? 'DESC' : 'ASC',
      );
    }

    const { items, meta } = await paginate(queryBuilder, { limit, page });
    return AppResponseDto.fromPagination({
      data: items,
      limit,
      meta,
      page,
      url: `${headers?.host}/${PrefixType.ADMIN}/system-permissions`,
    });
  }

  async getPermission(id: number) {
    const systemPermission = await this.systemPermissionsRepo.findOneBy({
      id,
    });

    if (!systemPermission) {
      throw new UnauthorizedExc(StatusCode.NO_PERMISSION_ACCESS);
    }

    return AppResponseDto.fromNonePagination(systemPermission);
  }

  async deletePermission(id: number) {
    const systemPermission = await this.systemPermissionsRepo.findOneBy({
      id,
    });
    if (!systemPermission)
      throw new UnauthorizedExc(StatusCode.NO_PERMISSION_ACCESS);

    if (!systemPermission.able_remove)
      throw new UnauthorizedExc(StatusCode.THIS_ROLE_UNABLE_REMOVE);

    await this.systemPermissionsRepo.delete({ id });

    return AppResponseDto.fromNonePagination({});
  }

  async createSystemPermission(body: CreateSystemPermissionReqDto) {
    const {
      name,
      description,
      able_decentralization,
      all_access,
      manage_bill,
      manage_collaborator,
      manage_contract,
      manage_message,
      manage_mo_post,
      manage_motel,
      manage_motel_consult,
      manage_notification,
      manage_order_service_sell,
      manage_renter,
      manage_report_problem,
      manage_report_statistic,
      manage_service,
      manage_service_sell,
      manage_user,
      setting_banner,
      setting_category_help,
      setting_contact,
      setting_help,
      view_badge,
      manage_wallet,
    } = body;
    const systemPermissions = await this.systemPermissionsRepo.save({
      name,
      description,
      view_badge: view_badge ? 1 : 0,
      able_decentralization: able_decentralization ? 1 : 0,
      all_access: all_access ? 1 : 0,
      manage_bill: manage_bill ? 1 : 0,
      manage_collaborator: manage_collaborator ? 1 : 0,
      manage_contract: manage_contract ? 1 : 0,
      manage_message: manage_message ? 1 : 0,
      manage_mo_post: manage_mo_post ? 1 : 0,
      manage_motel: manage_motel ? 1 : 0,
      manage_motel_consult: manage_motel_consult ? 1 : 0,
      manage_notification: manage_notification ? 1 : 0,
      manage_order_service_sell: manage_order_service_sell ? 1 : 0,
      manage_renter: manage_renter ? 1 : 0,
      manage_report_problem: manage_report_problem ? 1 : 0,
      manage_report_statistic: manage_report_statistic ? 1 : 0,
      manage_service: manage_service ? 1 : 0,
      manage_service_sell: manage_service_sell ? 1 : 0,
      manage_user: manage_user ? 1 : 0,
      setting_banner: setting_banner ? 1 : 0,
      setting_category_help: setting_category_help ? 1 : 0,
      setting_contact: setting_contact ? 1 : 0,
      setting_help: setting_help ? 1 : 0,
      manage_wallet: manage_wallet ? 1 : 0,
    });
    return AppResponseDto.fromNonePagination(systemPermissions);
  }

  async updateSystemPermission(body: UpdateSystemPermissionReqDto, id: number) {
    const systemPermission = await this.systemPermissionsRepo.findOneBy({ id });
    if (!systemPermission)
      throw new UnauthorizedExc(StatusCode.NO_PERMISSION_ACCESS);

    if (body.name) systemPermission.name = body.name;
    if (body.description) systemPermission.description = body.description;
    if (_.isBoolean(body.all_access))
      systemPermission.all_access = body.all_access ? 1 : 0;
    if (_.isBoolean(body.view_badge))
      systemPermission.view_badge = body.view_badge ? 1 : 0;
    if (_.isBoolean(body.manage_motel))
      systemPermission.manage_motel = body.manage_motel ? 1 : 0;
    if (_.isBoolean(body.manage_user))
      systemPermission.manage_user = body.manage_user ? 1 : 0;
    if (_.isBoolean(body.manage_mo_post))
      systemPermission.manage_mo_post = body.manage_mo_post ? 1 : 0;
    if (_.isBoolean(body.manage_contract))
      systemPermission.manage_contract = body.manage_contract ? 1 : 0;
    if (_.isBoolean(body.manage_renter))
      systemPermission.manage_renter = body.manage_renter ? 1 : 0;
    if (_.isBoolean(body.manage_bill))
      systemPermission.manage_bill = body.manage_bill ? 1 : 0;
    if (_.isBoolean(body.manage_message))
      systemPermission.manage_message = body.manage_message ? 1 : 0;
    if (_.isBoolean(body.manage_report_problem))
      systemPermission.manage_report_problem = body.manage_report_problem
        ? 1
        : 0;
    if (_.isBoolean(body.manage_service))
      systemPermission.manage_service = body.manage_service ? 1 : 0;
    if (_.isBoolean(body.manage_service_sell))
      systemPermission.manage_service_sell = body.manage_service_sell ? 1 : 0;
    if (_.isBoolean(body.manage_order_service_sell))
      systemPermission.manage_order_service_sell =
        body.manage_order_service_sell ? 1 : 0;
    if (_.isBoolean(body.manage_notification))
      systemPermission.manage_notification = body.manage_notification ? 1 : 0;
    if (_.isBoolean(body.setting_banner))
      systemPermission.setting_banner = body.setting_banner ? 1 : 0;
    if (_.isBoolean(body.setting_contact))
      systemPermission.setting_contact = body.setting_contact ? 1 : 0;
    if (_.isBoolean(body.setting_help))
      systemPermission.setting_help = body.setting_help ? 1 : 0;
    if (_.isBoolean(body.setting_category_help))
      systemPermission.setting_category_help = body.setting_category_help
        ? 1
        : 0;
    if (_.isBoolean(body.manage_motel_consult))
      systemPermission.manage_motel_consult = body.manage_motel_consult ? 1 : 0;
    if (_.isBoolean(body.manage_report_statistic))
      systemPermission.manage_report_statistic = body.manage_report_statistic
        ? 1
        : 0;
    if (_.isBoolean(body.manage_collaborator))
      systemPermission.manage_collaborator = body.manage_collaborator ? 1 : 0;
    if (_.isBoolean(body.able_decentralization))
      systemPermission.able_decentralization = body.able_decentralization
        ? 1
        : 0;

    if (_.isBoolean(body.manage_wallet))
      systemPermission.manage_wallet = body.manage_wallet ? 1 : 0;

    const systemPermissionUpdated = await this.systemPermissionsRepo.save(
      systemPermission,
    );

    return AppResponseDto.fromNonePagination(systemPermissionUpdated);
  }
}
