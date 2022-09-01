import { PrismaClient } from "@prisma/client";
import bcrypt, { decodeBase64 } from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@holidays.com",
      firstName: "John",
      lastName: "Smith",
      title: "Admin",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });
  const holidaysTypes = [
    "Urlop wypoczynkowy",
    "Urlop okolicznościowy",
    "Urlop ojcowski",
  ];

  holidaysTypes.map(async (type) => {
    return await prisma.holidayType.create({
      data: { name: type, description: type },
    });
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
