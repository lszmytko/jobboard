import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { OfferDetailsInputs } from "./OfferDetails";

const OfferDetailsGroup = ({
  control,
  name,
  register,
  title,
}: {
  control: Control<OfferDetailsInputs> | undefined;
  name: "tasks" | "requirements";
  register: any;
  title: string;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { required: true, minLength: 1 },
  });

  return (
    <div className="mb-4">
      <h1 className="mb-1 font-semibold capitalize text-primary text-center">
        {title}
      </h1>
      {fields.map((field, index) => (
        <div className="flex gap-2 mb-4" key={field.id}>
          <input
            type="text"
            {...register(`tasks.${index}.name`, { required: true })}
            className="text-xl grow px-2"
            defaultValue={field.name}
          />
          <IoIosAddCircle
            className="cursor-pointer"
            size={38}
            onClick={() => {
              append({ name: "" });
            }}
          />
          <IoIosRemoveCircle
            className="cursor-pointer"
            size={38}
            onClick={() => {
              remove(index);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default OfferDetailsGroup;
