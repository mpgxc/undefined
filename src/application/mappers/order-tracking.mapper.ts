import { IMapper } from '@commons/domain';
import {
  OrderTracking,
  OrderTrackingProps,
} from '@domain/entities/order-tracking';
import { Injectable } from '@nestjs/common';

export type OrderTrackingRaw = OrderTrackingProps & {
  id: string;
};

@Injectable()
export class OrderTrackingMapper
  implements IMapper<OrderTracking, OrderTrackingRaw>
{
  toDomain = (data: OrderTrackingRaw): OrderTracking =>
    OrderTracking.build(data);

  toPersistence = (data: OrderTracking): OrderTrackingRaw => ({
    id: data.id,
    orderId: data.orderId,
    tenantId: data.tenantId,
    slug: data.slug,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    completedStatuses: data.completedStatuses,
    content: data.content,
    isCompleted: data.isCompleted,
  });
}
