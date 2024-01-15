"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";
import { DevTool } from "@hookform/devtools";

import { getUserFromLocalStorage } from "@/utils/utils";

import { fetchUserData, updateUserData } from "./utils";
import { UserInfo } from "./UserInfo.types";
import { useEffect, useRef } from "react";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

const UserInfo = () => {
  const userID = getUserFromLocalStorage();

  const {
    isLoading: isQueryLoading,
    isError,
    data,
  } = useQuery({
    queryKey: ["todos", userID],
    queryFn: () => fetchUserData(userID || ""),
    refetchOnWindowFocus: true,
  });

  const {
    isLoading: isMutationLoading,
    isError: isMutationError,
    mutateAsync,
  } = useMutation({
    mutationFn: updateUserData,
  });

  const { companyName, city, street, flatNumber, phoneNumber } =
    data?.data.user || {};

  const defaultData = {
    companyName,
    city,
    street,
    flatNumber,
    phoneNumber,
  };

  const notify = () => toast.success("Dane zmienione poprawnie");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<UserInfo>({ defaultValues: defaultData });

  const onSubmit: SubmitHandler<UserInfo> = async (formData) => {
    try {
      await mutateAsync(formData);
      notify();
    } catch (error) {}
  };

  const wasDataFetched = useRef(false);

  useEffect(() => {
    if (!wasDataFetched.current && data) {
      reset(defaultData);
      wasDataFetched.current = true;
    }
  });

  if (isQueryLoading) return <FullPageLoader />;
  if (isError) return <p>Coś poszło nie tak...</p>;

  return (
    <div className="p-2">
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
            <h1 className="mb-1 text-primary-light">Numer lokalu</h1>
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
                name="phoneNumber"
                control={control}
                rules={{ required: true }}
                defaultCountry="PL"
                className="phoneInput"
              />
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            <h1 className="mb-1 text-primary-light">Kilka słów o firmie</h1>
            <div>
              <textarea
                {...register("description", { required: true })}
                maxLength={500}
                rows={4}
                className="w-full py-2 px-1 rounded-lg"
              />
            </div>
          </label>
        </div>

        {isMutationLoading ? (
          <div className="">
            <ThreeDots
              height="40"
              width="100"
              radius="9"
              color={"#4fa94d"}
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <input
            type="submit"
            className="py-2 px-4 mt-2 rounded-lg bg-primary-light font-semibold cursor-pointer text-white w-full hover:brightness-90"
            value="Uaktualnij dane"
          />
        )}
        {Object.keys(errors).length > 0 && <p>Wypełnij wszystkie pola</p>}
      </form>
      {isMutationError ? <p>Coś poszło nie tak...</p> : null}
      <DeleteAccount />
      <DevTool control={control} />
    </div>
  );
};

export default UserInfo;
