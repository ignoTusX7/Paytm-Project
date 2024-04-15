"use server";
import db from "@ignotus/db/client";
import { fetchUser } from "./fetchUser";
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
}

export const createUser = async (user: IUser) => {
  try {
    // Input validation
    if (!validateUser(user)) {
      throw new Error("Invalid user data");
    }

    // Check if email already exists
    const emailAlreadyExists = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (emailAlreadyExists) {
      return { status: "Failure", message: "Email Already Exists" };
    }

    // Check if mobile number already exists
    const mobileNumberAlreadyExists = await fetchUser(user.mobileNumber);

    if (mobileNumberAlreadyExists) {
      return { status: "Failure", message: "Mobile Number Already Exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create new user
    const newUser = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        password: hashedPassword,
        Balance: {
          create: {
            amount: 0,
            locked: 0,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        mobileNumber: true,
        createdAt: true,
      },
    });
    return { status: "Success", newUser };
  } catch (error) {
    return { status: "Failure", message: error.message };
  }
};

// Validate user input
const validateUser = (user: IUser) => {
  // Add your validation logic here
  return (
    user.name.trim() !== "" &&
    user.email.trim() !== "" &&
    user.mobileNumber.trim() !== "" &&
    user.password.trim() !== ""
  );
};
