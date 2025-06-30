const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin1234", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
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
