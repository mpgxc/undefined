import { ApplicationError, Either } from '@commons/logic';

type SendNotificationInput = {
  tenantId: string;
  content: string;
  category: string;
};

type SendNotificationOutput = Either<ApplicationError, unknown>;

interface ISendNotification {
  handle(props: SendNotificationInput): Promise<SendNotificationOutput>;
}

export { SendNotificationOutput, SendNotificationInput, ISendNotification };
