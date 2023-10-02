/* eslint-disable prettier/prettier */
import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, ModuleRef } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { bullConfig } from './common/config/bull.config';
import { ScheduleModule } from '@nestjs/schedule';
import { dataSource } from '../data-source';
import { AdminBannerModule } from './admin/banner/admin-banner.module';
import { AuthModule } from './auth/auth.module';
import globalConfig, { GlobalConfig } from './common/config/global.config';
import { TIME_ZONE } from './common/constants/global.constant';
import { AppEnvironment } from './common/enums/app.enum';
import { AllExceptionsFilter } from './common/filters/all.filter';
import { ExternalModule } from './external/external.module';
import { MoServiceModule } from './mo-service/mo-service.module';
import { NotificationModule } from './notification/notification.module';
import { ServiceSellModule } from './service-sell/service-sell.module';
import { ServiceModule } from './service/service.module';
import { UserModule } from './admin/users/user.module';
import { UtilsModule } from './utils/utils.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { SystemPermissionsModule } from './system_permissions/system_permissions.module';
import { AdminMotelsModule } from './admin/motels/admin-motels.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [
    // RedisModule.forRootAsync(redisConfig),
    // BullModule.forRootAsync(bullOptions),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => globalConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(dataSource);
      },
    }),
    UtilsModule,
    AuthModule,
    ServiceSellModule,
    ExternalModule,
    AdminBannerModule,
    AdminMotelsModule,
    ServiceModule,
    MoServiceModule,
    UserModule,
    WithdrawalsModule,
    NotificationModule,
    SystemPermissionsModule,
    BillsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { exposeDefaultValues: true },
      }),
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private configService: ConfigService<GlobalConfig>,
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault(TIME_ZONE);

    const isLocalOrTest = [AppEnvironment.LOCAL, AppEnvironment.TEST].includes(
      this.configService.get('environment'),
    );

    if (isLocalOrTest) return;
  }
}
