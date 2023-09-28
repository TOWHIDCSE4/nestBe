import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import { AuthenticateAdmin } from '../../../common/decorators/auth.decorator';
import {
  CreateSystemPermissionReqDto,
  UpdateSystemPermissionReqDto,
} from '../../dtos/req/create-system-permission.req.dto';
import { GetListSystemPermissionReqDto } from '../../dtos/req/get-list-system-permissions.req.dto';
import { SystemPermissionsAdminService } from '../../services/admin/system_permissions.service';

@Controller(`${PrefixType.ADMIN}/system-permissions`)
@AuthenticateAdmin()
@ApiTags('System permissions')
export class SystemPermissionsAdminController {
  constructor(
    private systemPermissionsAdminService: SystemPermissionsAdminService,
  ) {}

  @Get()
  getAllPermissions(
    @Query() query: GetListSystemPermissionReqDto,
    @Headers() headers: any,
  ) {
    return this.systemPermissionsAdminService.getAllPermissions(query, headers);
  }

  @Get(':system_permission_id')
  getPermission(@Param('system_permission_id') id: number) {
    return this.systemPermissionsAdminService.getPermission(id);
  }

  @Delete(':system_permission_id')
  deletePermission(@Param('system_permission_id') id: number) {
    return this.systemPermissionsAdminService.deletePermission(id);
  }

  @Post()
  createSystemPermission(@Body() body: CreateSystemPermissionReqDto) {
    return this.systemPermissionsAdminService.createSystemPermission(body);
  }

  @Put(':system_permission_id')
  updateSystemPermission(
    @Body() body: UpdateSystemPermissionReqDto,
    @Param('system_permission_id') id: number,
  ) {
    return this.systemPermissionsAdminService.updateSystemPermission(body, id);
  }
}
