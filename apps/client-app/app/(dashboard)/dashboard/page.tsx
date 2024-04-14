import { getServerSession } from "next-auth";
import React from "react";
import { INewSession, authOption } from "../../lib/auth";
import { Card } from "@ignotus/ui";
import { getBalance } from "../../lib/actions/getBalance";

export default async function Dashboard() {
  const session: INewSession | null = await getServerSession(authOption);
  const balance = await getBalance();
  return (
    <div className="w-[90%] mx-auto md:w-screen">
      <div className="text-3xl fon-semibold mt-4 flex gap-2">
        <h3 className="font-bold text-[#00baf2]">Hii, </h3>
        {session?.user.name}.
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
        <div>
          <Card title={"Wallet"}>
            <div className="flex justify-between border-b border-slate-300 pb-2">
              <div>Unlocked balance</div>
              <div>{(balance.amount / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
              <div>Total Locked Balance</div>
              <div>{(balance.locked / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
              <div>Total Balance</div>
              <div>{((balance.locked + balance.amount) / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
