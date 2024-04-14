import express from "express";
const PORT = 3003 || process.env.PORT;
const app = express();
import db from "@ignotus/db/client";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is Healthy" });
});

app.post("/hdfc", async (req, res) => {

  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            // You can also get this from your DB
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(PORT, () =>
  console.log(`Bank Webhook handler Started on http://localhost:${PORT}`)
);
