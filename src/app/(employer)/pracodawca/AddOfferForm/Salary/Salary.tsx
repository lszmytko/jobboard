import React from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

const inputStyle = "block p-1 w-1/2";

const Salary = ({
  register,
  getValues,
}: {
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<any>;
}) => {
  return (
    <div>
      <h1 className="mb-1 font-semibold capitalize text-primary text-center">
        Wynagrodzenie
      </h1>
      <div className="flex justify-center gap-2 mb-1">
        <input
          type="radio"
          id="hourly"
          value="hourly"
          {...register("salaryOption")}
        />
        <label htmlFor="perHour">Godzinowe</label>
        <input
          type="radio"
          id="monthly"
          value="monthly"
          {...register("salaryOption")}
        />
        <label htmlFor="monthly">Miesięczne</label>
      </div>
      <div className="flex gap-2 mb-2 justify-between">
        <input
          placeholder="Min"
          type="number"
          className={inputStyle}
          {...register("minSalary", { required: true })}
        />
        <input
          placeholder="Max"
          type="number"
          className={inputStyle}
          {...register("maxSalary", {
            required: true,
            validate: (value) => Number(value) > Number(getValues("minSalary")),
          })}
        />
      </div>
    </div>
  );
};

export default Salary;
