import { OrderTrackingMapper } from '@application/mappers/order-tracking.mapper';
import { Maybe } from '@commons/logic';
import { OrderTracking } from '@domain/entities/order-tracking';
import {
  IOrderTrackingRepository,
  OrderTrackingResponse,
} from '@domain/repositories/order-tracking.repository';
import { PrismaService } from '@infra/database/prisma.service';
import { LoggerService } from '@infra/providers/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderTrackingRepository implements IOrderTrackingRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: OrderTrackingMapper,
    private readonly logger: LoggerService,
  ) {}

  async findByTenantId(
    tenantId: string,
  ): Promise<Array<OrderTrackingResponse>> {
    const orderTrackings = await this.prisma.orderTracking.findMany({
      where: {
        tenantId,
      },
    });

    return orderTrackings.length
      ? (orderTrackings as Array<OrderTrackingResponse>)
      : [];
  }

  async findByOrderId(orderId: string): Promise<Maybe<OrderTrackingResponse>> {
    const orderTracking = await this.prisma.orderTracking.findUnique({
      where: {
        orderId,
      },
    });

    return !orderTracking ? null : (orderTracking as OrderTrackingResponse);
  }

  async findBySlug(slug: string): Promise<Maybe<OrderTrackingResponse>> {
    const orderTracking = await this.prisma.orderTracking.findUnique({
      where: {
        slug,
      },
    });

    return !orderTracking ? null : (orderTracking as OrderTrackingResponse);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.orderTracking.delete({
      where: {
        id,
      },
    });
  }

  async create(data: OrderTracking): Promise<void> {
    console.log('data', data);

    const orderTracking = this.mapper.toPersistence(data);

    console.log('data', orderTracking);

    await this.prisma.orderTracking.create({
      data: orderTracking as Prisma.OrderTrackingCreateInput,
    });
  }

  async update(data: OrderTracking): Promise<void> {
    const orderTracking = this.mapper.toPersistence(data);

    this.logger.debug('OrderTrackingRepository.update', orderTracking);

    await this.prisma.orderTracking.update({
      where: {
        id: orderTracking.id,
      },
      data: orderTracking as Prisma.OrderTrackingUpdateInput,
    });
  }

  async list(): Promise<Array<OrderTrackingResponse>> {
    const orderTrackings = await this.prisma.orderTracking.findMany();

    return orderTrackings.length
      ? (orderTrackings as Array<OrderTrackingResponse>)
      : [];
  }

  async findById(id: string): Promise<Maybe<OrderTracking>> {
    const orderTracking = await this.prisma.orderTracking.findUnique({
      where: {
        id,
      },
    });

    return !orderTracking
      ? null
      : this.mapper.toDomain(orderTracking as OrderTrackingResponse);
  }
}
