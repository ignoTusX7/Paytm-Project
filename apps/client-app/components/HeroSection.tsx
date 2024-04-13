"use client";
import { Button } from "@ignotus/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  const session = useSession();
  return (
    <section className="hero bg-blue-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to PayTM Payment Clone
        </h1>
        <p className="text-lg mb-8">
          Experience seamless payments with our secure platform.
        </p>
        <Button className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
          <Link
            href={`${session.data?.user ? "/dashboard" : "/api/auth/signin"}`}
          >
            Get Started
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
