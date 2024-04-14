import { getUserById } from "../app/lib/actions/getUser";
import { getDateTime } from "../app/lib/getDateTime";

interface ITransactions {
  fromUserId: number;
  amount: number;
  timestamp: Date;
  toUserId: number;
}

export const TransactionItem = async ({
  transaction,
  id,
  label,
}: {
  transaction: ITransactions;
  id: number;
  label: string;
}) => {
  const { amount, timestamp } = transaction;

  const fromUser = await getUserById(Number(id));

  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4 pe-2">
      <div className="flex flex-col">
        <span className="text-gray-800">
          <span className="font-semibold">{label} :</span>
          {fromUser?.name}
        </span>
        <span className="text-gray-600 text-sm">Using P2P Transfer</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-gray-800">{`${(amount / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" })}`}</span>
        <span className="text-sm text-gray-600">{getDateTime(timestamp)}</span>
      </div>
    </div>
  );
};
