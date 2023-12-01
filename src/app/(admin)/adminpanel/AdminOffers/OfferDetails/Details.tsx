import React from "react";
import { UseFormRegister } from "react-hook-form";

const inputClassName = "block w-full mb-4 p-2 border-2 border-gray-300 rounded";

const Details = ({
  placeholder,
  register,
  name,
}: {
  placeholder: string;
  register: any;
  name: string;
}) => {
  return (
    <div>
      <div>{placeholder}</div>
      <input
        placeholder={placeholder}
        {...register(name, { required: true })}
        className={inputClassName}
      />
    </div>
  );
};

export default Details;
