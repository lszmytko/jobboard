"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  parseRequirements,
  parseTasks,
} from "@/utils/utils";
import { DevTool } from "@hookform/devtools";

import { Offer } from "@/common/types";

import { fetchSingleOffer } from "@/app/(user)/advdetails/[id]/AdvCardDetails/fetchSingleOffer";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import Experience from "@/app/(employer)/pracodawca/AddOfferForm/Elements/Experience";
import AgreementType from "@/app/(employer)/pracodawca/AddOfferForm/Elements/AgreementType";
import WorkingTime from "@/app/(employer)/pracodawca/AddOfferForm/Elements/WorkingTime";
import { editOffer } from "@/app/(employer)/pracodawca/edytuj/[id]/editOffer";
import Details from "./Details";
import OfferDetailsGroup from "./OfferDetailsGroup";

export type OfferDetailsInputs = Omit<
  Offer,
  "timeOfPosting" | "requirements" | "tasks"
> & {
  tasks: { name: string }[];
} & {
  requirements: { name: string }[];
};

const EditForm = ({ offerID }: { offerID: string }) => {
  const {
    mutateAsync,
    isError: isMuationError,
    isLoading: isMutationLoading,
  } = useMutation({
    mutationFn: editOffer,
    onSuccess: () => {},
    onError: () => {
      toast.error("Coś poszło nie tak");
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["offerDetails"],
    queryFn: () => fetchSingleOffer(offerID || ""),
  });

  if (isLoading) return <FullPageLoader />;

  return (
    <EditFormUI
      mutate={mutateAsync}
      data={data?.data.offer}
      isMutationLoading={isMutationLoading}
      isMuationError={isMuationError}
    />
  );
};

const EditFormUI = ({
  mutate,
  data,
  isMutationLoading,
  isMuationError,
}: {
  mutate: any;
  data: Offer | undefined;
  isMutationLoading: boolean;
  isMuationError: boolean;
}) => {
  const {
    company,
    city,
    address,
    tasks,
    requirements,
    post,
    postLevel,
    experience,
    agreementType,
    workingTime,
    offerText,
    user,
  } = data || {};

  const formattedTasks = tasks?.map((task) => ({ name: task })) || [];
  const formattedRequirements =
    requirements?.map((task) => ({ name: task })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<OfferDetailsInputs>({
    defaultValues: {
      post,
      postLevel,
      experience,
      agreementType,
      workingTime,
      company,
      city,
      address,
      offerText,
      tasks: formattedTasks,
      requirements: formattedRequirements,
    },
  });

  const onSubmit: SubmitHandler<OfferDetailsInputs> = (formData) => {
    const parsedRequirements = parseRequirements(formData.requirements);
    const parsedTasks = parseTasks(formData.tasks);

    const payload = {
      ...(data ?? {}),
      ...formData,
      tasks: parsedTasks,
      requirements: parsedRequirements,
      user,
    };

    mutate(payload, false);
  };

  const submitFn = handleSubmit(onSubmit);

  return (
    <div className="max-w-3xl w-full p-2 pt-0">
      <h1 className="mb-4 text-center text-primary font-semibold text-2xl">
        Edytuj ofertę
      </h1>
      <form onSubmit={submitFn}>
        <Details
          register={register}
          placeholder="Nazwa stanowiska"
          name="post"
        />
        <Details register={register} placeholder="Nazwa firmy" name="company" />
        <Details register={register} placeholder="Miasto" name="city" />
        <Details
          register={register}
          placeholder="Ulica i numer mieszkania"
          name="address"
        />
        <Details
          register={register}
          placeholder="Stopień stanowiska"
          name="postLevel"
        />
        <Experience register={register} />
        <AgreementType register={register} />
        <WorkingTime register={register} />
        <OfferDetailsGroup
          control={control}
          name="tasks"
          register={register}
          title="Zadania"
        />
        <OfferDetailsGroup
          control={control}
          name="tasks"
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
          {isMutationLoading ? (
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
      {Object.values(errors).length > 0 && <div>Napraw błędy w formularzu</div>}
      {isMuationError && <div className="text-red">Coś poszło nie tak</div>}
      <DevTool control={control} />
    </div>
  );
};

export default EditForm;
