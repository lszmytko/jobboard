"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "@/utils/utils";
import { DevTool } from "@hookform/devtools";

import { Offer, User } from "@/common/types";

import Experience from "./Elements/Experience";
import AgreementType from "./Elements/AgreementType";
import WorkingTime from "./Elements/WorkingTime";
import { addOffer } from "./addOffer";
import { fetchUserData } from "../EmployerPanel/UserInfo/utils";
import InputLoader from "@/components/loaders/InputLoader";
import Input from "./Input/Input";
import InputGroup from "./InputGroup/InputGroup";

export type Inputs = Omit<Offer, "requirements" | "tasks"> & {
  tasks: { name: string }[];
} & {
  requirements: { name: string }[];
};

const AddOfferForm = () => {
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: addOffer,
    onSuccess: () => {},
  });

  const userID = getUserFromLocalStorage();

  const {
    isLoading: isQueryLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["todos", userID],
    queryFn: () => fetchUserData(userID || ""),
  });

  const { companyName, city, street, flatNumber } = data?.data?.user as User;

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

    const user = getUserFromLocalStorage();
    const payload = {
      ...data,
      tasks: parsedTasks,
      requirements: parsedRequirements,
      user,
    };

    try {
      mutateAsync(payload);
      reset();
      toast.success("Oferta pomyślnie dodana");
    } catch (error) {
      toast.error("Coś poszło nie tak");
    }
  };

  const submitFn = handleSubmit(onSubmit);

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
          {isLoading ? (
            <p>Ładowanie...</p>
          ) : (
            <input
              type="submit"
              className="p-2 text-white bg-primary rounded text-xl cursor-pointer disabled:opacity-50 disabled:cursor-auto"
              disabled={!isValid}
            />
          )}
        </div>
        {Object.values(errors).length > 0 && (
          <div>Napraw błędy w formularzu</div>
        )}
      </form>
      {isLoading ? <InputLoader /> : null}
      {Object.values(errors).length > 0 && <div>Napraw błędy w formularzu</div>}
      <DevTool control={control} />
    </div>
  );
};

export default AddOfferForm;
