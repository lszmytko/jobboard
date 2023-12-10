"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getUserFromLocalStorage } from "@/utils/utils";
import { DevTool } from "@hookform/devtools";

import { Offer, User } from "@/common/types";

import Experience from "./Elements/Experience";
import AgreementType from "./Elements/AgreementType";
import WorkingTime from "./Elements/WorkingTime";
import { fetchUserData } from "../EmployerPanel/UserInfo/utils";
import Input from "./Input/Input";
import InputGroup from "./InputGroup/InputGroup";
import Preview from "./Preview/Preview";

export type Inputs = Omit<Offer, "requirements" | "tasks"> & {
  tasks: { name: string }[];
} & {
  requirements: { name: string }[];
};

export type OfferData = Offer & { user: string | null };

const AddOfferForm = ({
  creator,
  selectedUser,
}: {
  creator: "employer" | "admin";
  selectedUser?: string;
}) => {
  const userID =
    creator === "employer" ? getUserFromLocalStorage() : selectedUser;

  const { isLoading, data, error } = useQuery({
    queryKey: ["userDetails", userID],
    queryFn: () => fetchUserData(userID || ""),
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <div>Ładowanie...</div>;
  if (error) return <div>Wystąpił błąd</div>;
  const { companyName, city, street, flatNumber } = data?.data?.user as User;

  return (
    <AddOfferFormUI
      companyName={companyName}
      city={city}
      street={street}
      flatNumber={flatNumber}
    />
  );
};

const AddOfferFormUI = ({
  companyName,
  city,
  street,
  flatNumber,
}: {
  companyName: string;
  city: string;
  street: string;
  flatNumber: string;
}) => {
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
      company: companyName,
      city,
      address: `${street} ${flatNumber}`,
      tasks: [{ name: "" }],
      requirements: [{ name: "" }],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    const parsedRequirements = data.requirements.map(
      (requirement) => requirement.name
    );
    const parsedTasks = data.tasks.map((task) => task.name);

    const user = getUserFromLocalStorage() ?? "";
    const payload: OfferData = {
      ...data,
      tasks: parsedTasks,
      requirements: parsedRequirements,
      user,
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
      />
    );
  }

  return (
    <div className="max-w-3xl w-full p-2">
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
          placeholder="Ulica i numer mieszkania"
          inputName="address"
        />
        <Input
          register={register}
          placeholder="Stopień stanowiska"
          inputName="postLevel"
        />
        <Experience register={register} />
        <AgreementType register={register} />
        <WorkingTime register={register} />
        <InputGroup
          control={control}
          name="tasks"
          register={register}
          title="Zadania"
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
            {...register("offerText")}
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
