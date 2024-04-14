"use server";
import db from "@ignotus/db/client";

export const getUserById = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      mobileNumber: true,
    },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
};
