import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { SystemPermissions } from '../entities/system-permissions.entity';

@Injectable()
export class SystemPermissionsRepository extends BaseRepository<SystemPermissions> {
  constructor(dataSource: DataSource) {
    super(SystemPermissions, dataSource);
  }
}
