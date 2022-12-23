import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { configuration } from '@config/configuration';

@Injectable()
export class KafkaProducerService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      client: configuration.kafka,
    });
  }

  async onModuleDestroy() {
    await this.close();
  }

  async onModuleInit() {
    await this.connect();
  }
}
