import {
  Body,
  Controller,
  Post,
  MessageEvent,
  Sse,
  Param,
} from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma.service';
import { NotificationInput } from '../inputs/notifications.input';
import { KafkaProducerService } from '@infra/messaging/kafka/kafka-producer.service';
import { SendNotification } from '@application/interactors/send-notification';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaProducerService,
    private readonly sendNotification: SendNotification,
  ) {}

  @Sse(`sse/:tenantId`)
  sse(@Param('tenantId') tenantId: string): Observable<MessageEvent> {
    return interval(2000).pipe(
      map((_) => ({ data: { hello: 'world', tenantId } })),
    );
  }

  @Post()
  async create(@Body() data: NotificationInput): Promise<void> {
    await this.sendNotification.handle({
      category: data.category,
      content: data.content,
      tenantId: data.tenantId,
    });
    // await this.prisma.notification.create({
    //   data,
    // });
    // this.kafkaService.emit('tracking-notifications.send-notification', data);
  }
}
