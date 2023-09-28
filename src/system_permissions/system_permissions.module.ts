import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { SystemPermissionsAdminController } from './controllers/admin/system_permissions.controller';
import { SystemPermissionsRepository } from './repositories/system-permissions.repository';
import { SystemPermissionsAdminService } from './services/admin/system_permissions.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([SystemPermissionsRepository]),
    AuthModule,
  ],
  controllers: [SystemPermissionsAdminController],
  providers: [SystemPermissionsAdminService],
})
export class SystemPermissionsModule {}
