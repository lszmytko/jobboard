"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Offer } from "@/common/types";

import Experience from "./Elements/Experience";
import AgreementType from "./Elements/AgreementType";
import WorkingTime from "./Elements/WorkingTime";
import Input from "./Input/Input";
import InputGroup from "./InputGroup/InputGroup";
import Preview from "./Preview/Preview";

export type Inputs = Omit<Offer, "requirements" | "tasks"> & {
  tasks: { name: string }[];
} & {
  requirements: { name: string }[];
};

export type OfferData = Offer;

const AddOfferForm = ({ creator }: { creator: "admin" | "employer" }) => {
  return <AddOfferFormUI creator={creator} />;
};

const AddOfferFormUI = ({ creator }: { creator: "employer" | "admin" }) => {
  const [shouldShowPreview, setShouldShowPreview] = useState(false);
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      tasks: [{ name: "" }],
      requirements: [{ name: "" }],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const parsedRequirements = data.requirements.map(
      (requirement) => requirement.name
    );
    const parsedTasks = data.tasks.map((task) => task.name);

    const payload: OfferData = {
      ...data,
      tasks: parsedTasks,
      requirements: parsedRequirements,
    };

    setShouldShowPreview(true);
    setOfferData(payload);
  };

  const submitFn = handleSubmit(onSubmit);

  if (shouldShowPreview) {
    const closeModal = () => setShouldShowPreview(false);
    return (
      <Preview
        isOpen={shouldShowPreview}
        closeModal={closeModal}
        offerData={offerData as OfferData}
        reset={reset}
        creator={creator}
      />
    );
  }

  return (
    <div className="max-w-3xl w-full p-2">
      <h1 className="mb-2 text-lg font-bold text-center">
        Wypełnij formularz by dodać ogłoszenie.
      </h1>
      <form onSubmit={submitFn}>
        <Input
          register={register}
          placeholder="Nazwa stanowiska"
          inputName="post"
        />
        <Input
          register={register}
          placeholder="Nazwa firmy"
          inputName="company"
        />
        <Input register={register} placeholder="Miasto" inputName="city" />
        <Input
          register={register}
          placeholder="Adres placówki"
          inputName="address"
        />
        <Input register={register} placeholder="Email" inputName="email" />
        <Experience register={register} />
        <AgreementType register={register} />
        <WorkingTime register={register} />
        <InputGroup
          control={control}
          name="tasks"
          register={register}
          title="Zakres obowiązków"
        />
        <InputGroup
          control={control}
          name="requirements"
          register={register}
          title="Wymagania"
        />
        <div>
          <h1 className="text-primary text-center font-semibold mb-2">
            O firmie
          </h1>
          <textarea
            {...register("aboutCompany", { required: true })}
            className="block w-full p-2 rounded mb-2"
            maxLength={400}
            rows={10}
          />
        </div>
        <div>
          <h1 className="text-primary text-center font-semibold mb-2">
            Dodatkowa treść ogłoszenia
          </h1>
          <textarea
            {...register("offerText", { required: true })}
            className="block w-full p-2 rounded mb-2"
            maxLength={400}
            rows={10}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            className="p-2 text-white bg-primary rounded text-xl cursor-pointer disabled:opacity-50 disabled:cursor-auto"
            disabled={!isValid}
          />
        </div>
        {Object.values(errors).length > 0 && (
          <div>Napraw błędy w formularzu</div>
        )}
      </form>
      {Object.values(errors).length > 0 && <div>Napraw błędy w formularzu</div>}
      <DevTool control={control} />
    </div>
  );
};

export default AddOfferForm;
