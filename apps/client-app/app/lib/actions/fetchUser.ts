"use server";
import db from "@ignotus/db/client";

export const fetchUser = async (mobileNumber: string) => {
  const user = await db.user.findUnique({
    where: {
      mobileNumber: mobileNumber,
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
