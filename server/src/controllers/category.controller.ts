import { Request, Response } from "express";

import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../services/category.service";

export async function create(
  req: Request,
  res: Response
) {
  try {
    const { name, displayOrder } = req.body;

    if (!name?.trim()) {
  return res.status(400).json({
    success: false,
    message: "Category name is required",
  });
}

    const category = await createCategory(
      name,
      displayOrder ?? 0
    );

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create category",
    });
  }
}



export async function getAll(
  _req: Request,
  res: Response
) {
  const categories = await getCategories();

  res.json({
    success: true,
    data: categories,
  });
}
export async function remove(
  req: Request,
  res: Response
) {
  try {
    const id = Number(
      req.params.id
    );

    await deleteCategory(id);

    res.json({
      success: true,
      message:
        "Category deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete category",
    });
  }
}