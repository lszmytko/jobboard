"use client";

import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

import { Inputs } from "../AddOffer";

type TasksProps = {
  register: UseFormRegister<Inputs>;
};

const Tasks = ({ register }: { register: UseFormRegister<Inputs> }) => {
  const [tasksNumber, setTasksNumber] = useState(1);

  return (
    <div>
      <h1 className="mb-1">Zadania</h1>
      {Array.from({ length: tasksNumber }).map((task, index) => {
        return (
          <div className="flex gap-2 mb-2" key={index}>
            <input
              type="text"
              id="Część etatu"
              {...register("tasks", { required: true })}
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

export default Tasks;
