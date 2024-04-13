"use client";
import { AppBarCommon, Button } from "@ignotus/ui";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const Header = () => {
  const session = useSession();
  return (
    <AppBarCommon label="PayTM">
      <li className="text-black">
        <Link href={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        <Button
          className=""
          handleOnClick={() => {
            session.data?.user ? signOut() : signIn();
          }}
        >
          {session.data?.user ? "Logout" : "Signin"}
        </Button>
      </li>
    </AppBarCommon>
  );
};
