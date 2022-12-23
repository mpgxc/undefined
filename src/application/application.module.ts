import { Module } from '@nestjs/common';

import { PrismaService } from '@infra/database/prisma.service';
import { OrderTrackingRepository } from './repositories/order-tracking.repository';
import { SendNotification } from './interactors/send-notification';
import { LoggerService } from '@infra/providers/logger/logger.service';
import { OrderTrackingMapper } from './mappers/order-tracking.mapper';

@Module({
  imports: [],
  providers: [
    LoggerService,
    SendNotification,
    PrismaService,
    OrderTrackingMapper,
    {
      provide: OrderTrackingRepository.name,
      useClass: OrderTrackingRepository,
    },
  ],
  exports: [SendNotification],
})
export class ApplicationModule {}
