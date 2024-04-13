import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-6 rounded-xl shadow-md">
      <h2 className="text-2xl border-b pb-2 font-bold mb-2">{title}</h2>
      <div className="">{children}</div>
    </div>
  );
}
