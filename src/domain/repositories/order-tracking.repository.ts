import { IRepository } from '@commons/domain';
import { Maybe } from '@commons/logic';
import {
  OrderTracking,
  OrderTrackingProps,
} from '@domain/entities/order-tracking';

export type OrderTrackingResponse = OrderTrackingProps & {
  id: string;
};

export interface IOrderTrackingRepository
  extends IRepository<OrderTracking, OrderTrackingResponse> {
  findByTenantId(tenantId: string): Promise<Array<OrderTrackingResponse>>;
  findByOrderId(orderId: string): Promise<Maybe<OrderTrackingResponse>>;
  findBySlug(slug: string): Promise<Maybe<OrderTrackingResponse>>;
}
