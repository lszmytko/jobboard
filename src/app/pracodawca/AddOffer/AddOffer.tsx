"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { Offer } from "@/common/types";

import InputFields from "./InputFields";
import CheckboxField from "./CheckBoxGroup/CheckboxField";
import Experience from "./Experience";

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
      {/* agreement Type */}
      <div className="mb-2">
        <h1 className="mb-1">Rodzaj umowy</h1>
        <CheckboxField
          fieldGroup="agreementType"
          polishName="UoP"
          register={register}
        />
        <CheckboxField
          fieldGroup="agreementType"
          polishName="Umowa o dzieło"
          register={register}
        />
        <CheckboxField
          fieldGroup="agreementType"
          polishName="Umowa zlecenie"
          register={register}
        />
        <CheckboxField
          fieldGroup="agreementType"
          polishName="B2B"
          register={register}
        />
      </div>

      {/* working Time */}
      <div className="mb-2">
        <h1 className="mb-1">Wymiar Pracy</h1>
        <CheckboxField
          fieldGroup="workingTime"
          polishName="Pełen etat"
          register={register}
        />
        <CheckboxField
          fieldGroup="workingTime"
          polishName="Część etatu"
          register={register}
        />
      </div>

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
