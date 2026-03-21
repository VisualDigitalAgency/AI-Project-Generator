// database/seed/001_users.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin-change-me", 12);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      passwordHash: adminPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("✓ Seed complete");
}

main().finally(() => prisma.$disconnect());
