import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { DeliveryStatus } from 'src/common/constants/notifications';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(notificationData: any) {
    const currentDate = new Date();
    notificationData.createdOn = currentDate.toISOString();
    notificationData.deliveryStatus = DeliveryStatus.PENDING;
    const notification = this.notificationRepository.create(notificationData);
    const result = await this.notificationRepository.save(notification);
    return result;
  }
}
