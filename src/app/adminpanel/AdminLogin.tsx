"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  name: string;
  password: string;
};

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);
  return (
    <div className="mt-4">
      <h1 className="text-center mb-4">Zaloguj się jako Admin</h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 mb-2 flex flex-col gap-4 w-1/2 max-w-2xl justify-center"
        >
          <div className="md:grow">
            <input
              placeholder="Admin"
              {...register("name")}
              className="w-full text-center max-sm:border-b-2 p-2 border-primary-extra-light focus:outline-none md:border-r-2"
            />
          </div>
          <div className="md:grow">
            <input
              placeholder="Hasło"
              {...register("password", { required: true })}
              className="w-full text-center max-sm:border-b-2 p-2 border-primary-extra-light mb-2 focus:outline-none"
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}
          <div>
            <input
              type="submit"
              value="Zaloguj"
              className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
