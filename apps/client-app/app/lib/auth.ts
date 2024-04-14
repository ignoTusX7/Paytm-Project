import type { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@ignotus/db/client";
import bcrypt from "bcrypt";
import type { JWT } from "next-auth/jwt";

export interface INewSession extends Session {
  user: {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
  };
}

export const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "John",
        },
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
      async authorize(
        credentials: Record<"mobileNumber" | "password", string> | undefined
      ) {
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
        try {
          const hashedPass = await bcrypt.hash(credentials.password, 10);
          const newUser = await db.user.create({
            data: {
              mobileNumber: credentials.mobileNumber,
              password: hashedPass,
              Balance: {
                create: {
                  amount: 0,
                  locked: 0,
                },
              },
            },
          });

          return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          };
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({
      token,
      session,
    }: {
      token: JWT;
      session: INewSession;
    }): Promise<Session> {
      session.user.id = token.sub;
      return session;
    },
  },
};
