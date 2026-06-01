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
export async function updateMenuItem(
  id: number,
  categoryId: number,
  name: string,
  price: number
) {
  return prisma.menuItem.update({
    where: {
      id,
    },
    data: {
      categoryId,
      name,
      price,
    },
  });
}


export async function deleteMenuItem(
  id: number
) {
  const orderItem =
    await prisma.orderItem.findFirst({
      where: {
        menuItemId: id,
      },
    });

  if (orderItem) {
    throw new Error(
      "Cannot delete menu item because it already exists in sales history."
    );
  }

  return prisma.menuItem.delete({
    where: {
      id,
    },
  });
}
export async function toggleMenuItemAvailability(
  id: number
) {
  const item =
    await prisma.menuItem.findUnique({
      where: { id },
    });

  if (!item) {
    throw new Error(
      "Menu item not found"
    );
  }

  return prisma.menuItem.update({
    where: { id },
    data: {
      isAvailable:
        !item.isAvailable,
    },
  });
}