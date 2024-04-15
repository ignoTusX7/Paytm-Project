"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@ignotus/db/client";

interface TransferResponse {
  status: "Success" | "Failure";
  message: string;
}

export async function p2pTransfer(
  to: string,
  amount: number
): Promise<TransferResponse> {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
      return { status: "Failure", message: "Error while sending" };
    }

    const toUser = await prisma.user.findFirst({
      where: {
        mobileNumber: to,
      },
    });

    if (!toUser) {
      return { status: "Failure", message: "User not found" };
    }

    if (Number(toUser.id) === Number(from)) {
      throw new Error("You can't send Money to Yourself");
      // return { status: "Failure", message: "You can't send Money to Yourself" };
    }

    await prisma.$transaction(async (tx) => {
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient Balance");
      }

      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    return { status: "Success", message: "Successfully Transferred" };
  } catch (error) {
    return {
      status: "Failure",
      message: error.message || "Internal Server Error",
    };
  }
}
