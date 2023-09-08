"use client";

import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

import { Inputs } from "../AddOfferForm";

type InputFieldsProps = {
  register: UseFormRegister<Inputs>;
  fieldID: string;
  fieldName: "tasks" | "requirements";
};

const InputFields = ({ register, fieldID, fieldName }: InputFieldsProps) => {
  const [tasksNumber, setTasksNumber] = useState(1);

  return (
    <div className="mb-4">
      <h1 className="mb-1 font-semibold capitalize text-primary text-center">
        {fieldID}
      </h1>
      {Array.from({ length: tasksNumber }).map((task, index) => {
        return (
          <div className="flex gap-2 mb-4" key={index}>
            <input
              type="text"
              id={fieldID}
              {...register(fieldName, { required: true })}
              className="text-xl grow px-2"
            />
            <IoIosAddCircle
              className="cursor-pointer"
              size={38}
              onClick={() => {
                setTasksNumber((prev) => prev + 1);
              }}
            />
            <IoIosRemoveCircle
              className="cursor-pointer"
              size={38}
              onClick={() => {
                setTasksNumber((prev) => (prev === 1 ? prev : prev - 1));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default InputFields;
