import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function updateUser(
  user: Pick<User, "id" | "firstName" | "lastName" | "email" | "title">
) {
  const result = await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      title: user.title,
      email: user.email,
    },
  });

  return result;
}

export async function addUser(
  user: Pick<User, "firstName" | "lastName" | "title" | "email">
) {
  const hashedPassword = await bcrypt.hash("P@ssword1", 10);
  return prisma.user.create({
    data: { ...user, password: { create: { hash: hashedPassword } } },
  });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      title: true,
    },
  });

  return users;
}
