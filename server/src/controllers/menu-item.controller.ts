import { Request, Response } from "express";

import {
  createMenuItem,
  getMenuItems,
  getMenuItemsByCategory,
} from "../services/menu-item.service";

export async function create(
  req: Request,
  res: Response
) {
  try {
    const {
      categoryId,
      name,
      price,
    } = req.body;

    const item = await createMenuItem(
      Number(categoryId),
      name,
      Number(price)
    );

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create menu item",
    });
  }
}

export async function getAll(
  _req: Request,
  res: Response
) {
  const items = await getMenuItems();

  res.json({
    success: true,
    data: items,
  });
}

export async function getByCategory(
  req: Request,
  res: Response
) {
  const categoryId = Number(
    req.params.categoryId
  );

  const items =
    await getMenuItemsByCategory(
      categoryId
    );

  res.json({
    success: true,
    data: items,
  });
}