/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminMotels } from './entities/admin-motels.entity';
import { AdminMotelController } from './admin-motels.controller';
import { AdminMotelService } from './admin-motel.service';
import { AuthModule } from '../../auth/auth.module';
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([AdminMotels])],
  controllers: [AdminMotelController],
  providers: [AdminMotelService],
})
export class AdminMotelsModule { }
