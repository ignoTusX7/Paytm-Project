"use server";
import { getServerSession } from "next-auth";
import { authOption } from "../auth";
import db from "@ignotus/db/client"

export async function getOnRampTransactions() {
    const session = await getServerSession(authOption);
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy : {
            startTime: "desc"
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
