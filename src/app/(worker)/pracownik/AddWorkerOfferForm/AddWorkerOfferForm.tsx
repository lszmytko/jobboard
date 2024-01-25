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

import { Availability, creator as creatorType } from "@/common/types";

import { addWorkerOffer } from "./addWorkerOffer";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

const availabilityOptions = [
  "cały etat",
  "pół etatu",
  "dorywczo",
  "weekendy",
  "praca w nocy",
] as const;

type FormInputs = {
  email: string;
  phoneNumber: string;
  education: string;
  experience: string;
  city: string;
  offerText: string;
  availability: { name: Availability }[];
};

const inputStyles = "block w-full p-1 mb-2";
const headingStyles = "text-center text-primary text-sm font-bold mb-1";

const AddWorkerOfferForm = ({ creator }: { creator: creatorType }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>();

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
    name: "availability",
    rules: { required: true },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("availability", data.availability);
    const parsedAvailability = data.availability
      .filter((item) => item.name)
      .map((item) => item.name);
    try {
      await mutateAsync({
        ...data,
        availability: parsedAvailability,
        creator,
      });
    } catch (error) {}
  };

  return (
    <div className="mb-1 p-2">
      <h1 className="mb-2 text-lg font-bold text-center">
        Wypełnij formularz by dodać ogłoszenie.
      </h1>
      {Object.values(errors).length > 0 && (
        <p className="text-center text-red-600 text-sm font-bold">
          Popraw dane w formularzu!
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className={headingStyles}>Twój email</h1>
          <input
            {...register("email")}
            placeholder="Email"
            className={inputStyles}
          />
        </div>
        <div>
          <h1 className={headingStyles}>Miasto</h1>
          <input
            {...register("city")}
            placeholder="Miasto"
            className={inputStyles}
          />
        </div>
        <div>
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
        <div>
          <h1 className={headingStyles}>Twoje Wykształcenie</h1>
          <textarea
            {...register("education")}
            maxLength={300}
            rows={3}
            placeholder="Wykształcenie"
            className={inputStyles}
          />
        </div>
        <div>
          <h1 className={headingStyles}>Twoje Doświadczenie</h1>
          <textarea
            {...register("experience")}
            maxLength={300}
            rows={3}
            className={inputStyles}
          />
        </div>
        <div className="mb-4">
          <h1 className={headingStyles}>Dostępność</h1>
          <div className="flex gap-2">
            {availabilityOptions.map((option, index) => (
              <div key={option}>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="text-center"
                    {...register(`availability.${index}.name`)}
                    value={option}
                    defaultChecked={fields.some(
                      (field) => field.name === option
                    )}
                  />
                </div>
                <label className="block text-sm text-center">{option}</label>
              </div>
            ))}
          </div>
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
        {isLoading ? (
          <div className="flex justify-center">
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
            value="Dodaj"
            className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
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
