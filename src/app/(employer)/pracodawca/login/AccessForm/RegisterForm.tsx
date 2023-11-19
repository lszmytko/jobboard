"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreeDots } from "react-loader-spinner";
import { useMutation } from "@tanstack/react-query";

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

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const notify = () => toast.success("Rejestracja powiodła się!");

  const { isLoading, isError, error, mutateAsync } = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = async (data: FormFields) => {
    try {
      await mutateAsync(data);
      notify();
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log({ error });

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
        {isLoading ? (
          <div>
            <ThreeDots
              height="40"
              width="100"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <input
            type="submit"
            className="w-full py-2 px-1 rounded-lg bg-primary-light font-semibold mt-2 cursor-pointer"
          />
        )}
      </form>
      {isError && (
        <div className="font-semibold mt-2 text-red-400 text-center">
          Rejestracja nie powiodła się
        </div>
      )}
    </>
  );
};

export default RegisterForm;
