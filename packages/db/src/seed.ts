import db from "./index";
import bcrypt from "bcrypt";

async function main() {
  const bob = await db.user.upsert({
    where: {
      mobileNumber: "9876543210",
    },
    create: {
      name: "Bob",
      mobileNumber: "9876543210",
      email: "bob@example.com",
      password: await bcrypt.hash("123456", 10),
      OnRampTransaction: {
        create: {
          token: "thisissecrettoken",
          status: "Success",
          provider: "HDFC",
          amount: 20000,
        },
      },
      Balance: {
        create: {
          amount: 100000,
          locked: 0,
        },
      },
    },
    update: {},
  });
  const alice = await db.user.upsert({
    where: {
      mobileNumber: "1234567890",
    },
    create: {
      name: "Alice",
      mobileNumber: "1234567890",
      email: "alice@example.com",
      password: await bcrypt.hash("123456", 10),
      OnRampTransaction: {
        create: {
          token: "thisissecret2",
          status: "Processing",
          provider: "HDFC",
          amount: 20000,
        },
      },
      Balance: {
        create: {
          amount: 100000,
          locked: 0,
        },
      },
    },
    update: {},
  });
  console.log({ bob, alice });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
