/* eslint-disable @typescript-eslint/ban-types */

import { Maybe, Replace } from '@commons/logic';
import { Entity } from '@commons/domain';

export type NotificationProps = {
  tenantId: string;
  content: string;
  category: string;
  readAt?: Maybe<Date>;
  createdAt: Date;
};

export class Notification extends Entity<NotificationProps> {
  public get tenantId(): string {
    return this._props.tenantId;
  }

  public get category(): string {
    return this._props.category;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get readAt(): Maybe<Date> {
    return this._props.readAt;
  }

  public static build(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ): Notification {
    return new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
