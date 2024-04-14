import React from "react";
import { getP2PTransfers } from "../../lib/actions/getp2pTransfers";
import { P2PTransactions } from "../../../components/p2pTransactions";

export default async function Transactions() {
  const p2pTransactions = await getP2PTransfers();

  return (
    <div className="w-screen p-4">
      <div className="p-4">
        <P2PTransactions transactions={p2pTransactions} />
      </div>
    </div>
  );
}
