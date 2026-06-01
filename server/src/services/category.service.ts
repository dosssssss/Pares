import { prisma } from "../config/prisma";

export async function createCategory(
  name: string,
  displayOrder: number
) {
  return prisma.category.create({
    data: {
      name,
      displayOrder,
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: {
      displayOrder: "asc",
    },
  });
}

export async function deleteCategory(
  id: number
) {
  return prisma.category.delete({
    where: {
      id,
    },
  });
}