"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  handleOnClick?: () => void;
}

export const Button = ({ children, className, handleOnClick, disabled }: ButtonProps) => {
  return (
    <button
      className={`${className} bg-[#00baf2] rounded-full text-white p-3 hover:bg-[#00a1f2] duration-150 ${disabled ? "bg-[#00a1f2] cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
