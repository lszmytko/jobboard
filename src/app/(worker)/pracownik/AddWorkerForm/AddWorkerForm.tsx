"use client";

import React from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { DevTool } from "@hookform/devtools";

type FormInputs = {
  email: string;
};

const inputStyles = "w-full p-1 mb-2 md:w-1/2";

const AddWorkerForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInputs>();
  return (
    <div className="mb-1 p-2">
      <h1 className="mb-2 text-lg font-bold text-center">
        Wypełnij formularz by dodać ogłoszenie.
      </h1>
      <form>
        <input
          {...register("email")}
          placeholder="Email"
          className={inputStyles}
        />
        <PhoneInput
          country="PL"
          name="phoneNumber"
          placeholder="Numer telefonu"
          control={control}
          rules={{ required: true }}
          onChange={() => {}}
          className={inputStyles}
        />
        <input
          {...register("email")}
          placeholder="Email"
          className={inputStyles}
        />
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default AddWorkerForm;
