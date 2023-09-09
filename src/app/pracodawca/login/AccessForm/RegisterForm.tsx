"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  emailConfirmation: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("email")); // watch input value by passing the name of it

  return (
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
        </label>
      </div>
      <div className="mb-4">
        <label>
          <h5 className="text-white mb-1">Hasło</h5>
          <input
            className="w-full py-2 px-1 rounded-lg"
            {...register("password")}
          />
        </label>
      </div>
      <input
        type="submit"
        className="w-full py-2 px-1 rounded-lg bg-primary-light font-semibold mt-2"
      />
    </form>
  );
};

export default RegisterForm;
