import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(authOption);

  if (session?.user) {
    return Response.json(session);
  }
  return Response.json({ message: "You are not logged-in" });
};
