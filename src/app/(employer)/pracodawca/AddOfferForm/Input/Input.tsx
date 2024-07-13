import React from "react";

const Input = ({
  register,
  placeholder,
  inputName,
}: {
  register: any;
  placeholder: string;
  inputName: string;
}) => {
  return (
    <div>
      <h2 className="mb-1 font-semibold capitalize text-primary text-center">
        {placeholder}
      </h2>
      <input
        {...register(inputName, { required: true })}
        placeholder={placeholder}
        className="block w-full mb-4 p-2"
      />
    </div>
  );
};

export default Input;
