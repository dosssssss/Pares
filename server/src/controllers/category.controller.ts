import { Request, Response } from "express";

import {
  createCategory,
  getCategories,
} from "../services/category.service";

export async function create(
  req: Request,
  res: Response
) {
  try {
    const { name, displayOrder } = req.body;

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