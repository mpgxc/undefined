import { ApplicationError, failure, success } from '@commons/logic';
import {
  ISendNotification,
  SendNotificationInput,
  SendNotificationOutput,
} from '@domain/interactors/send-notification';

import { Notification } from '@domain/entities/notification';
import { LoggerService } from '@infra/providers/logger/logger.service';
import { IOrderTrackingRepository } from '@domain/repositories/order-tracking.repository';
import { Inject } from '@nestjs/common';
import { OrderTrackingRepository } from '@application/repositories/order-tracking.repository';
import { OrderTracking } from '@domain/entities/order-tracking';
import { randomBytes } from 'node:crypto';

export class SendNotification implements ISendNotification {
  constructor(
    private readonly logger: LoggerService,

    @Inject(OrderTrackingRepository.name)
    private readonly orderTrackingRepository: IOrderTrackingRepository,
  ) {
    this.logger.setContext(SendNotification.name);
  }

  async handle(props: SendNotificationInput): Promise<SendNotificationOutput> {
    try {
      this.logger.debug('SendNotification.handle', props);

      const notification = Notification.build({
        category: props.category,
        content: props.content,
        tenantId: props.tenantId,
      });

      this.logger.debug(notification);

      const orderTracking = OrderTracking.build({
        content: {
          customer: {},
          order: {},
          details: 'details',
        },
        tenantId: randomBytes(16).toString('hex'),
        orderId: randomBytes(16).toString('hex'),
        slug: randomBytes(16).toString('hex'),
        createdAt: new Date(),
      });

      await this.orderTrackingRepository.create(orderTracking);

      if (true) {
        return failure(
          ApplicationError.build({
            message: 'SendNotification.handle failed',
            type: 'ExampleError',
          }),
        );
      }

      return success();
    } catch (error) {
      this.logger.error('SendNotification.handle', error);

      return failure(
        ApplicationError.build({
          message: 'SendNotification.handle failed',
          type: 'UnexpectedError',
        }),
      );
    }
  }
}
