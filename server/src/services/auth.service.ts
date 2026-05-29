import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma";

export async function loginUser(
  username: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}