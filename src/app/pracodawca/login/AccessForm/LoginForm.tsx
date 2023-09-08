"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log(data);

  console.log(watch("email")); // watch input value by passing the
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="mb-4">
        <label>
          <h1 className="pl-2 mb-1 text-white">Email</h1>
          <input
            {...register("email", { required: true })}
            className="w-full py-2 px-1 rounded-lg"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          <h1 className="pl-2 mb-1 text-white">Hasło</h1>
          <input
            {...register("password", { required: true })}
            className="w-full py-2 px-1 rounded-lg"
          />
        </label>
      </div>
      {errors.password && <span>Puste pole</span>}
      <input
        type="submit"
        className="w-full py-2 px-1 rounded-lg bg-primary-light font-semibold"
        value="Zaloguj"
      />
    </form>
  );
};

export default LoginForm;
