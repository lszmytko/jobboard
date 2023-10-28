"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getUserFromLocalStorage } from "@/utils/utils";

import { fetchUserData, updateUserData } from "./utils";
import { UserInfo } from "./UserInfo.types";

const UserInfo = () => {
  const userID = getUserFromLocalStorage();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos", userID],
    queryFn: () => fetchUserData(userID || ""),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<UserInfo>();
  const onSubmit: SubmitHandler<UserInfo> = (data) => updateUserData(data);

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

      <div>
        <input type="submit" disabled={isValid} className="cursor-pointer" />
      </div>
      {Object.keys(errors).length > 0 && <p>Wypełnij wszystkie pola</p>}
    </form>
  );
};

export default UserInfo;
