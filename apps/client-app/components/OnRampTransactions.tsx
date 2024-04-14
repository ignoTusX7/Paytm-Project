import { Card } from "@ignotus/ui";
import { getDateTime } from "../app/lib/getDateTime";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {

  


  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2 h-56 overflow-y-auto">
        {transactions.map((t, i) => (
          <div key={i} className="flex justify-between items-center mb-4 pe-2">
            <div>
              <div className="text-sm font-semibold">Received INR</div>
              <div className="text-slate-600 text-xs">
                {getDateTime(t.time)}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-end ms-auto">
                +{" "}
                {(t.amount / 100).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
              <div>
                <p className="font-semibold">
                  Status:
                  <span
                    className={`${t.status === "Failure" ? "text-red-500" : "text-black"} ${t.status === "Success" ? "text-green-500" : "text-black"}`}
                  >
                    {t.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
