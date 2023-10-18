import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { MoServiceController } from './controllers/mo-service.controller';
import { MoServiceRepository } from './repositories/mo-service.repository';
import { MoServiceService } from './services/mo-service.service';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmCustomModule.forFeature([MoServiceRepository])],
  controllers: [MoServiceController],
  providers: [MoServiceService],
})
export class MoServiceModule {}
