import { OnModuleDestroy, Injectable } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';
import { configuration } from '@config/configuration';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: configuration.kafka,
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
