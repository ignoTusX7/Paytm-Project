"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@ignotus/db/client";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

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
