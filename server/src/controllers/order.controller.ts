import { Request, Response } from "express";

import {
  createOrder,
  getOpenOrders,
  addItemToOrder,
} from "../services/order.service";



export async function create(
  _req: Request,
  res: Response
) {
  try {
    const order = await createOrder();

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create order",
    });
  }
}

export async function getOpen(
  _req: Request,
  res: Response
) {
  const orders = await getOpenOrders();

  res.json({
    success: true,
    data: orders,
  });
}
export async function addItem(
  req: Request,
  res: Response
) {
  try {
    const orderId = Number(
      req.params.id
    );

    const {
      menuItemId,
      quantity,
    } = req.body;

    const order =
      await addItemToOrder(
        orderId,
        Number(menuItemId),
        Number(quantity)
      );

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add item",
    });
  }
}