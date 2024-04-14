import { Card } from "@ignotus/ui";
import React from "react";
import { TransactionItem } from "./TransactionItem";

interface ITransaction {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
}

interface ITransactionsProps {
  transactions: {
    sentTransfers: ITransaction[];
    receivedTransfers: ITransaction[];
  } | null;
}

const NoTransactionCard = ({ label }: { label: string }) => {
  return (
    <Card title={label}>
      <div className="text-center pb-8 pt-8">No Recent transactions</div>
    </Card>
  );
};
export const P2PTransactions = ({ transactions }: ITransactionsProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">P2P Transactions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="mb-4">
          {transactions?.receivedTransfers.length ? (
            <Card title="Received Transactions">
              <div className="h-96 overflow-y-auto">
                {transactions.receivedTransfers.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    id={transaction.fromUserId}
                    label="From"
                  />
                ))}
              </div>
            </Card>
          ) : (
            <NoTransactionCard label={"Received Transactions"} />
          )}
        </div>
        <div>
          {transactions?.sentTransfers.length ? (
            <Card title="Sent Transactions">
              <div className="h-96 overflow-y-auto">
                {transactions.sentTransfers.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    id={transaction.toUserId}
                    label="To"
                  />
                ))}
              </div>
            </Card>
          ) : (
            <NoTransactionCard label={"Sent Transactions"} />
          )}
        </div>
      </div>
    </div>
  );
};
