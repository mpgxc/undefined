import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  app.connectMicroservice<MicroserviceOptions>({
    strategy: app.get(KafkaConsumerService),
  });

  app.enableShutdownHooks();
  app.enableCors({
    credentials: true,
  });

  await app.startAllMicroservices();

  app.listen(Number(process.env.APP_PORT) || 3000).then(async () => {
    console.log(`Http Server running 🚀: ${await app.getUrl()}`);
  });
})();
