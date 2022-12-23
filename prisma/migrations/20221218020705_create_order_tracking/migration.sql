-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('ORDER', 'TENANT', 'CUSTOMER');

-- CreateTable
CREATE TABLE "order_tracking" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "completedStatuses" TEXT[],
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_tracking_orderId_key" ON "order_tracking"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "order_tracking_slug_key" ON "order_tracking"("slug");

-- CreateIndex
CREATE INDEX "order_tracking_orderId_idx" ON "order_tracking"("orderId");

-- CreateIndex
CREATE INDEX "order_tracking_tenantId_idx" ON "order_tracking"("tenantId");
