"use client";
import { Button, Card, Center, TextInput } from "@ignotus/ui";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <div className="mb-4">
              <TextInput
                label="Number"
                handleOnChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
            </div>
            <div>
              <TextInput
                label="Amount"
                handleOnChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                handleOnClick={async () => {
                  const res = await p2pTransfer(number, Number(amount) * 100)
                  if(res.status && res.status === "Success"){
                    alert("Payment Done")
                  }
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
