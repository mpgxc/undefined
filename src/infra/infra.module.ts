import { ApplicationModule } from '@application/application.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './database/prisma.service';
import { HealthController } from './http/controllers/health.controller';
import { NotificationController } from './http/controllers/notification.controller';
import { KafkaController } from './messaging/kafka/controllers/kafka.controller';
import { KafkaConsumerService } from './messaging/kafka/kafka-consumer.service';
import { KafkaProducerService } from './messaging/kafka/kafka-producer.service';
import { LoggerService } from './providers/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApplicationModule,
  ],
  providers: [
    PrismaService,
    KafkaConsumerService,
    KafkaProducerService,
    LoggerService,
  ],
  exports: [PrismaService],
  controllers: [NotificationController, KafkaController, HealthController],
})
export class InfraModule {}
