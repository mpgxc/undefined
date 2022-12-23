import { OrderTracking } from './order-tracking';

describe('OrderTracking', () => {
  it('should be able to create a OrderTracking', () => {
    const orderTracking = OrderTracking.build({
      content: {
        customer: {},
        order: {},
      },
      tenantId: 'tenantId',
      orderId: 'orderId',
      slug: 'slug',
      createdAt: new Date(),
    });

    orderTracking.status = 'DONE_ORDER';

    expect(orderTracking).toBeDefined();
  });
});
