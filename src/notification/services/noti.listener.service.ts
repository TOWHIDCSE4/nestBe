import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Transactional } from 'typeorm-transactional';
import { EventEmitterName } from '../../common/enums/app.enum';
import { NotificationReqDto } from '../dtos/req/noti.req.dto';
import { NotificationService } from './notification.service';

@Injectable()
export class NotiListenerService {
  constructor(private notificationService: NotificationService) {}

  @Transactional()
  @OnEvent(EventEmitterName.NOTIFICATION_USER)
  async pushNotificationUser(noti: NotificationReqDto) {
    await this.notificationService.handlNotiUser(noti);
  }

  @Transactional()
  @OnEvent(EventEmitterName.NOTIFICATION_ADMIN)
  async pushNotificationAdmin(noti: NotificationReqDto) {
    await this.notificationService.handlNotiAdmin(noti);
  }
}
