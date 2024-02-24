import React from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";

import { Inputs } from "../AddOfferForm";

const inputStyle = "block p-1 w-1/2";

const Salary = ({
  register,
  getValues,
  errors,
}: {
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<any>;
  errors: FieldErrors<Inputs>;
}) => {
  return (
    <div className="mb-4">
      <h1 className="mb-1 font-semibold capitalize text-primary text-center">
        Wynagrodzenie
      </h1>
      <div className="flex justify-center gap-2 mb-3">
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
      <div className="flex justify-center gap-2 mb-1">
        <input
          type="radio"
          id="hourly"
          value="gross"
          {...register("salaryGrossNet")}
        />
        <label htmlFor="perHour">Brutto</label>
        <input
          type="radio"
          id="net"
          value="net"
          {...register("salaryGrossNet")}
        />
        <label htmlFor="monthly">Netto</label>
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
      {errors.maxSalary && (
        <p className="text-center text-sm text-red-500">
          Maksymalne wynagrodzenie musi być większe od minimalnego
        </p>
      )}
    </div>
  );
};

export default Salary;
