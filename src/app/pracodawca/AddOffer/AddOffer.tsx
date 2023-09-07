"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { Offer } from "@/common/types";

import InputFields from "./InputFields";
import Experience from "./Elements/Experience";
import AgreementType from "./Elements/AgreementType";
import WorkingTime from "./Elements/WorkingTime";

export type Inputs = Omit<Offer, "offerText" | "timeOfPosting">;

const AddOffer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("workingTime")); // watch input value by passing the name of it
  console.log(watch("agreementType")); // watch input value by passing the name of it
  console.log(watch("experience"));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="stanowisko" {...register("post")} className="block" />
      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("company", { required: true })}
        placeholder="company"
        className="block"
      />
      <input
        {...register("city", { required: true })}
        placeholder="miasto"
        className="block"
      />
      <input
        {...register("address", { required: true })}
        placeholder="adres"
        className="block"
      />
      <input
        {...register("postLevel", { required: true })}
        placeholder="stopień stanowiska"
        className="block"
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
      <div className="flex justify-center">
        <input type="submit" className="p-2 bg-primary-light rounded text-xl" />
      </div>
    </form>
  );
};

export default AddOffer;
