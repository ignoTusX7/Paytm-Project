"use client";
import { Button, Card, Center, TextInput } from "@ignotus/ui";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { fetchUser } from "../app/lib/actions/fetchUser";
import { Toaster, toast } from "sonner";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState({
    email: "",
    mobileNumber: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetchUser(number);
      if (res) setUser(res);
      else {
        setUser({ email: "", mobileNumber: "", name: "" });
        setAmount("");
        setNumber("");
        return toast.error("User not found", {
          duration: 3000,
          action: {
            label: "Close",
            onClick: () => toast.dismiss("close"),
          },
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return toast.error("Error while fetching user", {
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
  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await p2pTransfer(number, Number(amount) * 100);
      if (res.status === "Success") {
        return toast.success("Payment Done", {
          duration: 3000,
          action: {
            label: "Close",
            onClick: () => toast.dismiss("close"),
          },
        });
      } else {
        throw new Error(res.message || "Unknown error occurred");
      }
    } catch (error: any) {
      // console.error("Error sending payment:", error);

      if (error.message) {
        console.error(error.message);
        return toast.error(error.message, {
          duration: 3000,
          action: {
            label: "Close",
            onClick: () => toast.dismiss("close"),
          },
        });
      }
      return toast.error("Error while Sending", {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => toast.dismiss("close"),
        },
      });
    } finally {
      setAmount("");
      setNumber("");
      setUser({ email: "", mobileNumber: "", name: "" });
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex flex-col md:flex-row gap-4 mx-auto md:mx-0">
      <Toaster />
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <div className="mb-4 flex items-center">
              <TextInput
                label="Number"
                value={number}
                handleOnChange={(e) => setNumber(e.target.value)}
              />
              <div className="ms-auto" onClick={handleFetchUser}>
                {loading ? "Loading..." : "Fetch"}
              </div>
            </div>
            <div>
              <TextInput
                value={amount}
                label="Amount"
                handleOnChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="pt-4 flex justify-center">
              <Button handleOnClick={handleSend} disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </Card>
      </Center>
      <Center>
        <div>
          {user.mobileNumber && (
            <Card title="User">
              <div className="text-lg mb-4">
                Name: {user.name != null ? user.name : "Unknown"}
              </div>
              <div className="text-lg mb-4">
                Email: {user.email != null ? user.email : "Unknown"}
              </div>
              <div className="text-lg mb-4">
                Mobile Number: {user.mobileNumber}
              </div>
            </Card>
          )}
        </div>
      </Center>
    </div>
  );
}
