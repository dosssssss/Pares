import { prisma } from "../config/prisma";

export async function createOrder(
  totalAmount: number,
  cashReceived: number,
  changeAmount: number
) {
  const lastOrder = await prisma.order.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const nextNumber = String(
    (lastOrder?.id ?? 0) + 1
  ).padStart(4, "0");

  return prisma.order.create({
    data: {
      orderNumber: nextNumber,

      totalAmount,

      status: "PAID",

      paymentMethod: "CASH",

      cashReceived,

      changeAmount,

      paidAt: new Date(),
    },
  });
}


export async function getOpenOrders() {
  return prisma.order.findMany({
    where: {
      status: "OPEN",
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function addItemToOrder(
  orderId: number,
  menuItemId: number,
  quantity: number
) {
  const menuItem = await prisma.menuItem.findUnique({
    where: {
      id: menuItemId,
    },
  });

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  const unitPrice = Number(menuItem.price);

  const subtotal =
    unitPrice * quantity;

  await prisma.orderItem.create({
    data: {
      orderId,
      menuItemId,
      quantity,
      unitPrice,
      subtotal,
    },
  });

  const orderItems =
    await prisma.orderItem.findMany({
      where: {
        orderId,
      },
    });

  const totalAmount =
    orderItems.reduce(
      (sum, item) =>
        sum + Number(item.subtotal),
      0
    );

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      totalAmount,
    },
  });

  return prisma.order.findUnique({
    where: {
      id: orderId,
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