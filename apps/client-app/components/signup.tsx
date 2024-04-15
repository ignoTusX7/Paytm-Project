"use client";
import { Card, TextInput } from "@ignotus/ui";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { createUser } from "../app/lib/actions/createUser";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Check if any field is empty

    if (!name || !email || !mobileNumber || !password) {
      setLoading(false);

      return toast.error("Please fill all fields", {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => toast.dismiss("close"),
        },
      });
    }
    if (mobileNumber.length > 10) {
      setLoading(false);

      return toast.error("Invalid Mobile Number", {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => toast.dismiss("close"),
        },
      });
    }
    if (password.length < 6) {
      setLoading(false);
      return toast.error("Password must be longer than six character", {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => toast.dismiss("close"),
        },
      });
    }

    try {
      const res = await createUser({ name, email, mobileNumber, password });

      // Check the status of the response
      if (res?.status === "Success") {
        console.log("Account created successfully");
        const tryLogin = await signIn("credentials", {
          name,
          email,
          mobileNumber,
          password,
          redirect: false,
        });

        if (tryLogin?.ok) {
          setLoading(false);

          return router.push("/dashboard");
        }
        setLoading(false);

        return router.push("/login");
        // Perform any action after successful account creation
      } else if (res.status === "Failure") {
        // Handle failure case
        setLoading(false);

        return toast.error(res.message, {
          duration: 3000,
          action: {
            label: "Close",
            onClick: () => toast.dismiss("close"),
          },
        });
      }
    } catch (error: any) {
      // Handle any unexpected errors
      console.error("Failed to create account:", error);
      toast.error(error.message || "Failed to Signup", {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => toast.dismiss("close"),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-2/4">
        <Toaster />
        <Card title="Signup">
          <form method="POST" className="mt-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput
                label="Name"
                type="text"
                name="name"
                value={name}
                handleOnChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Email"
                type="email"
                name="email"
                value={email}
                handleOnChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
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
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {loading ? "Loading ..." : "Signup"}
              </button>
              <Link
                href="/login"
                className="text-sm text-blue-500 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
