import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: "admin",
    },
  });

  if (existingUser) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("Admin user created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });