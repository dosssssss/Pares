import { Request, Response } from "express";

import { loginUser } from "../services/auth.service";

export async function login(
  req: Request,
  res: Response
) {
  try {
    const { username, password } = req.body;

    const result = await loginUser(
      username,
      password
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
}