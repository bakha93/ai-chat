import React, { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  onEnterPress?: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const InputField = ({
  value,
  onChange,
  type,
  placeholder,
  onEnterPress,
}: Props) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
          onEnterPress?.(e);
        }
      }}
      className="block w-full rounded-full text-[#787878] px-4 py-3 font-normal text-base bg-[#F7F8FB] border-0 outline-0"
    />
  );
};
