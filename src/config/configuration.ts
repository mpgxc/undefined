import 'dotenv/config';
import { KafkaConfig } from '@nestjs/microservices/external/kafka.interface';

export const configuration = {
  kafka: {
    clientId: String(process.env.KAFKA_CLIENT_ID) as string,
    brokers: [process.env.KAFKA_BROKER as string],
    sasl: {
      mechanism: process.env.KAFKA_SASL_MECHANISM as string,
      username: process.env.KAFKA_SASL_USERNAME as string,
      password: process.env.KAFKA_SASL_PASSWORD as string,
    },
    ssl: true,
  } as KafkaConfig,
};
