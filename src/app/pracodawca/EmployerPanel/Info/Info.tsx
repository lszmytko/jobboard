"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { useQuery } from "react-query";

export type InfoInputs = {
  companyName: string;
  city: string;
  street: string;
  flatNumber: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
};

const Info = () => {
  const info = useQuery({ queryKey: ["todos"], queryFn: fetchUserData });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label>
          <h1 className="mb-1 text-primary-light">Nazwa firmy</h1>
          <input
            {...register("companyName", { required: true })}
            className="w-full py-2 px-1 rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label>
          <h1 className="mb-1 text-primary-light">Miasto</h1>
          <input
            {...register("city", { required: true })}
            className="w-full py-2 px-1 rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label>
          <h1 className="mb-1 text-primary-light">Ulica</h1>
          <input
            {...register("street", { required: true })}
            className="w-full py-2 px-1 rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label>
          <h1 className="mb-1 text-primary">Numer lokalu</h1>
          <input
            {...register("flatNumber", { required: true })}
            className="w-full py-2 px-1 rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label>
          <h1 className="mb-1 text-primary-light">Numer telefonu</h1>
          <div>
            <PhoneInputWithCountry
              name="phoneInputWithCountrySelect"
              control={control}
              rules={{ required: true }}
              className="w-full py-2 px-1 rounded-lg"
            />
          </div>
        </label>
      </div>

      <div className="mb-4">
        <label>
          <h1 className="mb-1 text-primary">Aktualne hasło</h1>
          <input
            {...register("currentPassword", { required: true })}
            className="w-full py-2 px-1 rounded-lg"
            type="password"
          />
        </label>
      </div>

      <div className="mb-4">
        <label>
          <h1 className="mb-1 text-primary">Nowe hasło</h1>
          <input
            {...register("newPassword", {
              required: "Za krótkie hasło",
              minLength: 8,
            })}
            className="w-full py-2 px-1 rounded-lg"
            type="password"
          />
        </label>
      </div>

      <div>
        <input type="submit" disabled={isValid} className="cursor-pointer" />
      </div>
    </form>
  );
};

export default Info;
