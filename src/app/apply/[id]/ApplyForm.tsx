"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { paths } from "@/common/paths";

type LoginFormInputs = {
  email: string;
  name: string;
  lastName: string;
};

const ApplyForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="mb-4">
          <label>
            <h1 className="mb-1 text-white">Email</h1>
            <input
              {...register("email", { required: true })}
              className="w-full py-2 px-1 rounded-lg"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            <h1 className="mb-1 text-white">Imię</h1>
            <input
              {...register("name", { required: true })}
              className="w-full py-2 px-1 rounded-lg"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            <h1 className="mb-1 text-white">Nazwisko</h1>
            <input
              {...register("lastName", { required: true })}
              className="w-full py-2 px-1 rounded-lg"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
