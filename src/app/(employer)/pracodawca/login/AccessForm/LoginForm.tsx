"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { paths } from "@/common/paths";

import { loginUser } from "./loginUser";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [_, setIsPasswordForgotten] = useState(false);

  const router = useRouter();
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push(paths.employer);
    },
  });

  const notify = () => {
    toast.success("Logowanie się powiodło!");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await mutateAsync(data);
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              <h1 className="mb-1 text-white">Hasło</h1>
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full py-2 px-1 rounded-lg"
              />
            </label>
          </div>
          {errors.password && <span>Puste pole</span>}
          {isLoading ? (
            <div className="flex justify-center">
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color={"#4fa94d"}
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            <input
              type="submit"
              className="w-full py-2 px-1 mt-2 rounded-lg bg-primary-light font-semibold cursor-pointer"
              value="Zaloguj"
            />
          )}
        </form>
        {isError && (
          <div className="text-red-300 mt-4 text-center">Wystąpił błąd</div>
        )}
        <div className="flex justify-center">
          <button
            className="mt-4 text-center text-white cursor-pointer"
            onClick={() => setIsPasswordForgotten(true)}
          >
            Zapomniałeś hasła?
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
