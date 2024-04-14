"use server";

import db from "@ignotus/db/client";
import { getServerSession } from "next-auth";
import { INewSession, authOption } from "../auth";

export const getP2PTransfers = async () => {
  const session: INewSession | null = await getServerSession(authOption);
  const myID = Number(session?.user.id);

  try {
    // const p2p = await db.p2pTransfer.findMany({
    //   where: {
    //     toUserId: myID,
    //   },
    //   orderBy: {
    //     timestamp: "desc",
    //   },
    // });
    const p2p = await db.user.findUnique({
      where: {
        id: myID,
      },
      select: {
        sentTransfers: {
          select: {
            id: true,
            amount: true,
            timestamp: true,
            fromUserId: true,
            toUserId: true,
          },
          orderBy: {
            timestamp: "desc",
          },
        },
        receivedTransfers: {
          select: {
            id: true,
            amount: true,
            timestamp: true,
            fromUserId: true,
            toUserId: true,
          },
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    });
   
    return p2p;
  } catch (error) {
    throw new Error("Failed to get users");
  }
};
