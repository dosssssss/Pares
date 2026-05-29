import { prisma } from "../config/prisma";

export async function createMenuItem(
  categoryId: number,
  name: string,
  price: number
) {
  return prisma.menuItem.create({
    data: {
      categoryId,
      name,
      price,
    },
  });
}

export async function getMenuItems() {
  return prisma.menuItem.findMany({
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getMenuItemsByCategory(
  categoryId: number
) {
  return prisma.menuItem.findMany({
    where: {
      categoryId,
      isAvailable: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}