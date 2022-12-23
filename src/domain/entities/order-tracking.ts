import { Entity } from '@commons/domain';
import { Maybe, Replace } from '@commons/logic';

export enum OrderTrackingStatus {
  ACCEPTED_ORDER = 'ACCEPTED_ORDER',
  REJECTED_ORDER = 'REJECTED_ORDER',
  PREPARING_ORDER = 'PREPARING_ORDER',
  READY_ORDER = 'READY_ORDER',
  ON_THE_WAY_ORDER = 'ON_THE_WAY_ORDER',
  DONE_ORDER = 'DONE_ORDER',
}

export type OrderTrackingStatusUnion = keyof typeof OrderTrackingStatus;

export type OrderTrackingDetails = {
  order: Record<string, any>;
  customer: Record<string, any>;
  details: Maybe<string>;
};

export type OrderTrackingProps = {
  orderId: string;
  tenantId: string;
  slug: string;
  status: OrderTrackingStatusUnion;
  completedStatuses: Array<OrderTrackingStatusUnion | string>;
  isCompleted: boolean;
  content: OrderTrackingDetails | string;
  createdAt: Date;
  updatedAt?: Maybe<Date>;
};

export class OrderTracking extends Entity<OrderTrackingProps> {
  private update() {
    this._props.updatedAt = new Date();
  }

  private complete() {
    this._props.isCompleted = true;
    this.update();
  }

  private stepAlreadyExists(status: OrderTrackingStatusUnion) {
    return this._props.completedStatuses
      .map((status) => {
        const [stepName] = status.split(':');

        return stepName;
      })
      .includes(status);
  }

  private get numberStatuses() {
    return Object.keys(OrderTrackingStatus).filter((key) => isNaN(Number(key)))
      .length;
  }

  public get content(): OrderTrackingDetails | string {
    return this._props.content;
  }

  public get status(): OrderTrackingStatusUnion {
    return this._props.status;
  }

  //TODO: Refactor this method to support functional error handling (Either) and remove the throws
  public set status(status: OrderTrackingStatusUnion) {
    if (this._props.completedStatuses.length === this.numberStatuses) {
      throw new Error('The order is already completed!');
    }

    if (this.stepAlreadyExists(status)) {
      throw new Error('The status is already included!');
    }

    this.update();
    this._props.status = status;
    this._props.completedStatuses.push(
      `${status}:${this._props.updatedAt?.toISOString()}}`,
    );

    if (this._props.completedStatuses.length === this.numberStatuses) {
      this.complete();
    }
  }

  public get completedStatuses(): Array<OrderTrackingStatus | string> {
    return this._props.completedStatuses;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Maybe<Date> {
    return this._props.updatedAt;
  }

  public get isCompleted(): boolean {
    return this._props.isCompleted;
  }

  public get orderId(): string {
    return this._props.orderId;
  }

  public get tenantId(): string {
    return this._props.tenantId;
  }

  public get slug(): string {
    return this._props.slug;
  }

  public static build(
    props: Replace<
      OrderTrackingProps,
      {
        createdAt?: Date;
        completedStatuses?: Array<OrderTrackingStatusUnion | string>;
        isCompleted?: boolean;
        status?: OrderTrackingStatusUnion;
      }
    >,
    id?: string,
  ): OrderTracking {
    const today = new Date();

    return new OrderTracking(
      {
        ...props,
        createdAt: props.createdAt ?? today,
        completedStatuses: props.completedStatuses ?? [
          `${OrderTrackingStatus.ACCEPTED_ORDER}:${today.toISOString()}}`,
        ],
        isCompleted: props.isCompleted ?? false,
        status: props.status ?? OrderTrackingStatus.ACCEPTED_ORDER,
      },
      id,
    );
  }
}
