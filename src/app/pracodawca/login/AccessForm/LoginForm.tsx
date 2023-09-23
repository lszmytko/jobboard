"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { loginUser } from "./loginUser";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
  });
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) =>
    mutation.mutate(data);

  mutation.isLoading && <div>loading...</div>;
  mutation.isError && <div>Something went wrong</div>;

  console.log(watch("email")); // watch input value by passing the
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
            <h1 className="mb-1 text-white">Hasło</h1>
            <input
              {...register("password", { required: true })}
              type="password"
              className="w-full py-2 px-1 rounded-lg"
            />
          </label>
        </div>
        {errors.password && <span>Puste pole</span>}
        <input
          type="submit"
          className="w-full py-2 px-1 mt-2 rounded-lg bg-primary-light font-semibold cursor-pointer"
          value="Zaloguj"
        />
      </form>
      <div className="flex justify-center">
        <button
          className="mt-4 text-center text-white cursor-pointer"
          onClick={() => setIsPasswordForgotten(true)}
        >
          Zapomniałeś hasła?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
