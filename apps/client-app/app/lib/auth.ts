import type { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@ignotus/db/client";
import bcrypt from "bcrypt";

export interface INewSession extends Session {
  user: {
    id: string | null | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
  };
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobileNumber: {
          label: "Mobile Number",
          type: "text",
          placeholder: "9876543210",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*****",
          required: true,
        },
      },
      async authorize(credentials) {
        const existingUser = await db.user.findUnique({
          where: {
            mobileNumber: credentials?.mobileNumber,
          },
        });
        if (existingUser) {
          const comparePassword = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (comparePassword) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET!,
  callbacks: {
    async session({ token, session }) {
      if (session && token) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};
