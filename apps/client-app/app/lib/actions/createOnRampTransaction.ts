"use server";

import { getServerSession } from "next-auth";
import { authOption } from "../auth";
import db from "@ignotus/db/client";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOption);

  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  console.log(amount);

  const token = (Math.random() * 1000).toString();

  await db.onRampTransaction.create({
    data: {
      token: token,
      amount: Number(amount) * 100,
      status: "Processing",
      startTime: new Date(),
      provider,
      userId: Number(session.user.id),
    },
  });

  return {
    message: "Done",
  };
}
