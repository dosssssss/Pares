import { Request, Response } from "express";

import {
  getSummary,getOrderHistory,} from "../services/report.service";

export async function summary(
  _req: Request,
  res: Response
) {
  try {
    const data =
      await getSummary();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to load report",
    });
  }
}

export async function orderHistory(
  _req: Request,
  res: Response
) {
  try {
    const data =
      await getOrderHistory();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to load orders",
    });
  }
}