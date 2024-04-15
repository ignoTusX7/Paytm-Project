"use client";
import { Card, TextInput } from "@ignotus/ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

export const LoginCard = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      mobileNumber,
      password,
      redirect: false,
    });
    console.log(res);
    if (res?.ok || res?.status == 200) {
      console.log("Successfully Loggedin");
      router.push("/dashboard");
    } else {
      console.error("Invalid Credentials");
      toast.error("Invalid Credentials", {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => toast.dismiss("close"),
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-2/4">
        <Toaster />
        <Card title="Login">
          <form
            method="POST"
            className="mt-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4">
              <TextInput
                label="Mobile Number"
                type="tel"
                name="mobileNumber"
                value={mobileNumber}
                handleOnChange={(e) => {
                  setMobileNumber(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <TextInput
                label="Password"
                type="password"
                name="password"
                value={password}
                handleOnChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
