"use client";

import { HTMLInputTypeAttribute } from "react";

interface ITextInputProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  handleOnChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  className?: string;
  // placeholder?: string;
}

export const TextInput = ({
  label,
  name,
  handleOnChange,
  className,
  type,
  // placeholder
}: ITextInputProps) => {
  return (
    <div>
      <div className={`${className} relative`}>
        <input
          type={type}
          id={`${name}`}
          name={name}
          className={`block py-2.5 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#00baf2] peer [&::-webkit-inner-spin-button]:appearance-none`}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          onChange={handleOnChange}
          placeholder=" "
        />
        <label
          htmlFor={name}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-1 peer-focus:start-0 peer-focus:text-[#00baf2] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
