"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import PhoneInput from "react-phone-number-input/input";

import { Offer } from "@/common/types";
import Statute from "@/components/Statute/Statute";

import Experience from "./Elements/Experience";
import AgreementType from "./Elements/AgreementType";
import WorkingTime from "./Elements/WorkingTime";
import Input from "./Input/Input";
import InputGroup from "./InputGroup/InputGroup";
import Preview from "./Preview/Preview";
import Salary from "./Salary/Salary";
import { headingStyles } from "./consts";

export type Inputs = Omit<Offer, "requirements" | "tasks"> & {
  tasks: { name: string }[];
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
    getValues,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      tasks: [{ name: "" }],
      requirements: [{ name: "" }],
      salaryOption: "monthly",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isValid) return;
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

  console.log({ errors });

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
        <div>
          <h1 className={headingStyles}>Numer telefonu</h1>
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
                className="block w-full mb-4 p-2"
              />
            )}
          />
        </div>
        <Input register={register} placeholder="Email" inputName="email" />
        <Experience register={register} />
        <AgreementType register={register} />
        <WorkingTime register={register} />
        <Salary register={register} getValues={getValues} errors={errors} />
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
            Dodatkowa treść ogłoszenia
          </h1>
          <textarea
            {...register("offerText", { required: true, maxLength: 1000 })}
            className="block w-full p-2 rounded mb-2"
            rows={10}
          />
          {errors.offerText && (
            <p className="text-center text-sm text-red-500">
              Maksymalna liczba znaków to 1000
            </p>
          )}
        </div>
        <Statute />
        <div className="flex justify-center">
          <input
            type="submit"
            value="Prześlij"
            className="p-2 w-full text-cente text-white bg-primary rounded text-xl cursor-pointer disabled:opacity-50 disabled:cursor-auto"
          />
        </div>
        {Object.values(errors).length > 0 && (
          <p className="mt-2 text-center text-red-500 font-semibold">
            Napraw błędy w formularzu
          </p>
        )}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default AddOfferForm;
