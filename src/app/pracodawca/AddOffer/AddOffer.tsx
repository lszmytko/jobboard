"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { Offer } from "@/common/types";

import Tasks from "./Tasks";

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

      {/* Experience */}
      <div className="mb-2">
        <h1 className="mb-1">Doświadczenie</h1>
        <label className="inline-block mr-1">
          <span className="inline-block mr-1">&lt;1 rok</span>
          <input
            type="checkbox"
            value="<1 rok"
            id="<1 rok"
            {...register("experience", { required: true })}
          />
        </label>
        <label className="inline-block mr-1">
          <span className="inline-block mr-1">1-3 lata</span>
          <input
            type="checkbox"
            value="1-3 lata"
            id="1-3 lata"
            {...register("experience", { required: true })}
          />
        </label>
        <label className="inline-block mr-1 mb-2">
          <span className="inline-block mr-1">3-5 lat</span>
          <input
            type="checkbox"
            value="3-5 lat"
            id="3-5 lat"
            {...register("experience", { required: true })}
          />
        </label>
        <label className="inline-block mr-1">
          <span className="inline-block mr-1">5-10 lat</span>
          <input
            type="checkbox"
            value="5-10 lat"
            id="5-10 lat"
            {...register("experience", { required: true })}
          />
        </label>
        <label className="inline-block mr-1">
          <span className="inline-block mr-1">&gt;10 lat</span>
          <input
            type="checkbox"
            value=">10 lat"
            id=">10 lat"
            {...register("experience", { required: true })}
          />
        </label>
      </div>

      {/* agreement Type */}
      <div className="mb-2">
        <h1 className="mb-1">Rodzaj umowy</h1>
        <label className="inline-block mr-1">
          <span className="inline-block mr-1">UoP</span>
          <input
            type="checkbox"
            value="UoP"
            id="UoP"
            {...register("agreementType", { required: true })}
          />
        </label>
        <label className="inline-block mr-1">
          <span className="inline-block mr-1">Umowa o dzieło</span>
          <input
            type="checkbox"
            value="Umowa o dzieło"
            id="Umowa o dzieło"
            {...register("agreementType", { required: true })}
          />
        </label>
        <label className="inline-block mr-4">
          <span className="inline-block mr-1">Umowa zlecenie</span>
          <input
            type="checkbox"
            value="Umowa zlecenie"
            id="Umowa zlecenie"
            {...register("agreementType", { required: true })}
          />
        </label>
        <label className="inline-block mr-4">
          <span className="inline-block mr-1">B2B</span>
          <input
            type="checkbox"
            value="B2B"
            id="B2B"
            {...register("agreementType", { required: true })}
          />
        </label>
      </div>

      {/* working Time */}
      <div className="mb-2">
        <h1 className="mb-1">Wymiar Pracy</h1>
        <label className="inline-block mr-4">
          <span className="inline-block mr-1">Pełen etat</span>
          <input
            type="checkbox"
            value="Pełen etat"
            id="Pełen etat"
            {...register("workingTime", { required: true })}
          />
        </label>
        <label className="inline-block">
          <span className="inline-block mr-1"> Część etatu</span>
          <input
            type="checkbox"
            value="Część etatu"
            id="Część etatu"
            {...register("workingTime", { required: true })}
            className="text-2xl"
          />
        </label>
      </div>

      <Tasks register={register} />

      <div className="flex justify-center">
        <input type="submit" className="p-2 bg-primary-light rounded text-xl" />
      </div>
    </form>
  );
};

export default AddOffer;
