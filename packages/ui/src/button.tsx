"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  handleOnClick?: () => void;
}

export const Button = ({ children, className, handleOnClick }: ButtonProps) => {
  return (
    <button
      className={`${className} bg-[#00baf2] rounded-full text-white p-3 hover:bg-[#00a1f2] duration-150`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
