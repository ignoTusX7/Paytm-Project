"use client";
import { Button, Card, Center, TextInput } from "@ignotus/ui";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { fetchUser } from "../app/lib/actions/fetchUser";

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
        alert("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Error fetching user");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      const res = await p2pTransfer(number, Number(amount) * 100);
      if (res.status && res.status === "Success") {
        alert("Payment Done");
        setAmount("");
        setNumber("");
        setUser({ email: "", mobileNumber: "", name: "" });
      }
    } catch (error) {
      console.error("Error sending payment:", error);
      alert("Error sending payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex gap-4">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <div className="mb-4 flex items-center">
              <TextInput
                label="Number"
                handleOnChange={(e) => setNumber(e.target.value)}
              />
              <div className="ms-auto" onClick={handleFetchUser}>
                {loading ? "Loading..." : "Fetch"}
              </div>
            </div>
            <div>
              <TextInput
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
          {user.name && (
            <Card title="User">
              <div className="text-lg mb-4">Name: {user.name}</div>
              <div className="text-lg mb-4">Email: {user.email}</div>
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
