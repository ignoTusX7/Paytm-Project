import { getServerSession } from "next-auth";
import { Sidebar } from "../../components/Sidebar";
import { authOption } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {

  const session = await getServerSession(authOption);
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
