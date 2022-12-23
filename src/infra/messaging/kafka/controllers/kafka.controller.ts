import { LoggerService } from '@infra/providers/logger/logger.service';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(KafkaController.name);
  }

  @EventPattern('tracking-notifications.send-notification')
  async handle(@Payload() body: Record<string, unknown>) {
    this.logger.debug('Accepted Order: ', body);
  }
}
