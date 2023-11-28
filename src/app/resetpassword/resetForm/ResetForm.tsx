"use client";

import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
};

const ResetForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  return (
    <form>
      <div className="">
        <div className="mb-2 text-primary-light text-center">
          <label>Email</label>
        </div>
        <input placeholder="Email" {...register("email")} className="p-1" />
      </div>
    </form>
  );
};

export default ResetForm;
