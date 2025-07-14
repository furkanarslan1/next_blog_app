const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      password: hashedPassword,
      role: "ADMIN",
      firstName: "Admin",
      lastName: "User",
      username: "admin",
    },
    create: {
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("error:", err);
    prisma.$disconnect();
    process.exit(1);
  });
