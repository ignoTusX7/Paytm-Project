import { Card } from "@ignotus/ui";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title={"Balance"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked balance</div>
        <div>{(amount / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Locked Balance</div>
        <div>{(locked / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div>{((locked + amount) / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
      </div>
    </Card>
  );
};
