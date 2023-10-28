"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "./registerUser";

type FormFields = {
  email: string;
  emailConfirmation: string;
  password: string;
};

const schema = z
  .object({
    email: z.string().email(),
    emailConfirmation: z.string().email(),
    password: z.string().min(5),
  })
  .refine((data) => data.email === data.emailConfirmation, {
    message: "Emaile muszą być takie same",
    path: ["emailConfirmation"],
  });

const RegisterForm = ({
  setIsLogin,
}: {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const notify = () => toast("Rejestracja powiodła się!");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await registerUser(data);
      notify();
      setIsLogin(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>
            <h5 className="text-white mb-1">Email</h5>
            <input
              className="w-full py-2 px-1 rounded-lg"
              {...register("email")}
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            <h5 className="text-white mb-1">Potwierdź email</h5>
            <input
              className="w-full py-2 px-1 rounded-lg"
              {...register("emailConfirmation")}
            />
            {errors.emailConfirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailConfirmation.message}
              </p>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label>
            <h5 className="text-white mb-1">Hasło</h5>
            <input
              type="password"
              className="w-full py-2 px-1 rounded-lg"
              {...register("password")}
            />
          </label>
        </div>
        <input
          type="submit"
          className="w-full py-2 px-1 rounded-lg bg-primary-light font-semibold mt-2 cursor-pointer"
        />
      </form>
      {error && (
        <div className="font-semibold mt-2 text-red-400 text-center">
          Rejestracja nie powiodła się
        </div>
      )}
      <ToastContainer progressClassName="bg-black" />
    </>
  );
};

export default RegisterForm;
