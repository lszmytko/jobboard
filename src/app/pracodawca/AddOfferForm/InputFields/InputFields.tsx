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
    <div>
      <h1 className="mb-1">{fieldID}</h1>
      {Array.from({ length: tasksNumber }).map((task, index) => {
        return (
          <div className="flex gap-2 mb-2" key={index}>
            <input
              type="text"
              id={fieldID}
              {...register(fieldName, { required: true })}
              className="text-2xl"
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
