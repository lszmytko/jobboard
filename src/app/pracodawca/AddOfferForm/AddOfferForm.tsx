"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Offer } from "@/common/types";

import InputFields from "./InputFields";
import Experience from "./Elements/Experience";
import AgreementType from "./Elements/AgreementType";
import WorkingTime from "./Elements/WorkingTime";
import { addOffer } from "./addOffer";

export type Inputs = Omit<Offer, "timeOfPosting">;

const AddOfferForm = () => {
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: addOffer,
    onSuccess: () => {
      console.log("success");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onSubmit" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const timeOfPosting = new Date().toISOString();
    const payload = { ...data, timeOfPosting };
    console.log({ payload });
    mutateAsync(payload);
  };

  if (isLoading) return <div>Loading...</div>;

  console.log({ isValid });

  console.log(watch("workingTime")); // watch input value by passing the name of it

  return (
    <div className="max-w-3xl w-full p-2 pt-0">
      <h1 className="mb-4 text-center text-primary font-semibold text-2xl">
        Nowe ogłoszenie
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Nazwa stanowiska"
          {...register("post", { required: true })}
          className="block w-full mb-4 p-2"
        />
        <input
          {...register("company", { required: true })}
          placeholder="Nazwa firmy"
          className="block w-full mb-4 p-2"
        />
        <input
          {...register("city", { required: true })}
          placeholder="Miasto"
          className="block w-full mb-4 p-2"
        />
        <input
          {...register("address", { required: true })}
          placeholder="Ulica i numer mieszkania"
          className="block w-full mb-4 p-2"
        />
        <input
          {...register("postLevel", { required: true })}
          placeholder="Stopień stanowiska"
          className="block w-full mb-4 p-2"
        />
        <Experience register={register} />
        <AgreementType register={register} />
        <WorkingTime register={register} />
        <InputFields register={register} fieldID="zadania" fieldName="tasks" />
        <InputFields
          register={register}
          fieldID="wymagania"
          fieldName="requirements"
        />
        <div>
          <h1 className="text-primary text-center font-semibold mb-2">
            Dodatkowa treść ogłoszenia
          </h1>
          <textarea
            className="block w-full p-2 rounded mb-2"
            maxLength={400}
            rows={10}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            className="p-2 bg-primary-light rounded text-xl cursor-pointer disabled:opacity-75"
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;
