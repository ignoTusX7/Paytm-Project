import express, { json } from "express";
const PORT = 3003 || process.env.PORT;
const app = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";

const paymentInfoBody = z.object({
  token: z.string(),
  userId: z.number(),
  amount: z.number(),
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is Healthy" });
});

app.post("/hdfc", async (req, res) => {
  const paymentInformation = paymentInfoBody.safeParse(req.body);

  if (!paymentInformation.success) {
    return res.json({ message: "Invalid Body" });
  }

  try {
    const alreadyDone = await prisma.onRampTransaction.findFirst({
      where: {
        token: paymentInformation.data.token,
        userId: Number(paymentInformation.data.userId),
        status: "Success",
      },
    });

    if (alreadyDone) {
      return res.json({ message: "Already Captured" });
    }

    await prisma.$transaction([
      prisma.balance.updateMany({
        where: {
          userId: Number(paymentInformation.data.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.data.amount),
          },
        },
      }),
      prisma.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.data.token,
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
