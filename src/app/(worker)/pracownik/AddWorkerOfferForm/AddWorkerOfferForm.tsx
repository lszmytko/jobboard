"use client";

import React from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  Controller,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";

import { WorkerOfferCreator, WorkerOfferFormInputs } from "@/common/types";

import { addWorkerOffer } from "./addWorkerOffer";
import { useRouter } from "next/navigation";
import { availability, workingTimeOptions } from "@/common/consts";
import InputLoader from "@/components/loaders/InputLoader";
import Statute from "@/components/Statute/Statute";

const inputStyles = "block w-full p-2";
const headingStyles = "text-center text-primary font-bold mb-2";

const AddWorkerOfferForm = ({ creator }: { creator: WorkerOfferCreator }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WorkerOfferFormInputs>();

  const router = useRouter();

  const onSuccessPath =
    creator === "worker" ? "/pracownik/sukces" : "/adminpanel";

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: addWorkerOffer,
    onSuccess: () => {
      router.push(onSuccessPath);
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "workingTime",
    rules: { required: true },
  });

  const onSubmit: SubmitHandler<WorkerOfferFormInputs> = async (data) => {
    const parsedWorkingTime = data.workingTime
      .filter((item) => item.name)
      .map((item) => item.name);
    try {
      await mutateAsync({
        ...data,
        workingTime: parsedWorkingTime,
        creator,
      });
    } catch (error) {}
  };

  return (
    <div className="mb-1 p-2 sm:w-1/2">
      <h1 className="mb-2 text-lg font-bold text-center">
        Wypełnij formularz by dodać ogłoszenie.
      </h1>
      {Object.values(errors).length > 0 && (
        <p className="text-center text-red-600 text-sm font-bold">
          Popraw dane w formularzu!
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <h1 className={headingStyles}>Twój email</h1>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className={inputStyles}
          />
        </div>
        <div className="mb-2">
          <h1 className={headingStyles}>Miasto</h1>
          <input
            {...register("city", { required: true })}
            placeholder="Miasto"
            className={inputStyles}
          />
        </div>
        <div className="mb-2">
          <h1 className={headingStyles}>Twój numer telefonu</h1>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country="PL"
                value={value}
                onChange={onChange}
                placeholder="Numer telefonu"
                className={inputStyles}
              />
            )}
          />
        </div>
        <div className="mb-2">
          <h1 className={headingStyles}>Twoje Wykształcenie</h1>
          <textarea
            {...register("education", { required: true })}
            maxLength={1000}
            rows={3}
            placeholder="Wykształcenie"
            className={inputStyles}
          />
        </div>
        <div className="mb-2">
          <h1 className={headingStyles}>Twoje Doświadczenie</h1>
          <textarea
            {...register("experience", { required: true })}
            maxLength={1000}
            rows={3}
            className={inputStyles}
          />
        </div>
        <div className="mb-2">
          <h1 className={headingStyles}>Wymiar pracy</h1>
          <div className="flex gap-2">
            {workingTimeOptions.map((option, index) => (
              <div key={option} className="grow">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="text-center"
                    {...register(`workingTime.${index}.name`)}
                    value={option}
                  />
                </div>
                <label className="block text-sm text-center">{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <h1 className={headingStyles}>Dostępność</h1>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-dark-blue text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("availability", { required: true })}
          >
            <option value="">Wybierz dostępność</option>
            {availability.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h1 className={headingStyles}>Opis ogłoszenia</h1>
          <textarea
            maxLength={500}
            rows={5}
            className="block w-full p-1 mb-4"
            {...register("offerText", { required: true })}
          />
        </div>
        <Statute />
        {isLoading ? (
          <InputLoader />
        ) : (
          <input
            type="submit"
            value="Prześlij"
            className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer disabled:opacity-50"
            disabled={!isValid}
          />
        )}
        {isError && (
          <p className="text-center text-red-600 text-sm font-bold">
            Coś poszło nie tak...
          </p>
        )}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default AddWorkerOfferForm;
