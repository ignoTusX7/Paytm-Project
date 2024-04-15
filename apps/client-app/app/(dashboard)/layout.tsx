import { getServerSession } from "next-auth";
import { Sidebar } from "../../components/Sidebar";
import {  authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/api/auth/signin");
  }
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
