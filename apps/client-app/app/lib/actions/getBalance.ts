"use server";
import db from "@ignotus/db/client";
import { getServerSession } from "next-auth";
import { INewSession, authOptions } from "../auth";

export const getBalance = async () => {
  const session: INewSession | null = await getServerSession(authOptions);
  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session?.user.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
};
