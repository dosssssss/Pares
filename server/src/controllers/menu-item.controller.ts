import { Request, Response } from "express";

import {
  createMenuItem,
  getMenuItems,
  getMenuItemsByCategory,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
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

export async function update(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const {
      categoryId,
      name,
      price,
    } = req.body;

    const item =
      await updateMenuItem(
        id,
        Number(categoryId),
        name,
        Number(price)
      );

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update menu item",
    });
  }
}

export async function remove(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    await deleteMenuItem(id);

    res.json({
      success: true,
      message:
        "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete menu item",
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
export async function toggleAvailability(
  req: Request,
  res: Response
) {
  try {
    const id = Number(
      req.params.id
    );

    const item =
      await toggleMenuItemAvailability(
        id
      );

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed",
    });
  }
}