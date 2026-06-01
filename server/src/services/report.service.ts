import { prisma } from "../config/prisma";
export async function getSummary() {
  const totalOrders =
    await prisma.order.count();

  const salesResult =
    await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

  const totalSales =
    Number(
      salesResult._sum.totalAmount || 0
    );

  const bestSeller =
    await prisma.orderItem.groupBy({
      by: ["menuItemId"],

      _sum: {
        quantity: true,
      },

      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },

      take: 1,
    });

  let bestSellingItem =
    "No sales yet";

  if (bestSeller.length > 0) {
    const item =
      await prisma.menuItem.findUnique({
        where: {
          id:
            bestSeller[0].menuItemId,
        },
      });

    bestSellingItem =
      item?.name ||
      "Unknown";
  }

  return {
    totalSales,

    totalOrders,

    averageOrderValue:
      totalOrders > 0
        ? totalSales /
          totalOrders
        : 0,

    bestSellingItem,
  };
}
export async function getOrderHistory() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      orderItems: {
        include: {
          menuItem: true,
        },
      },
    },
  });
}