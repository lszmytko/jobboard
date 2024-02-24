"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { parseRequirements, parseTasks } from "@/utils/utils";
import { DevTool } from "@hookform/devtools";

import { Offer } from "@/common/types";

import { fetchSingleOffer } from "@/app/(user)/advdetails/[id]/AdvCardDetails/fetchSingleOffer";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import Experience from "@/app/(employer)/pracodawca/AddOfferForm/Elements/Experience";
import AgreementType from "@/app/(employer)/pracodawca/AddOfferForm/Elements/AgreementType";
import WorkingTime from "@/app/(employer)/pracodawca/AddOfferForm/Elements/WorkingTime";
import Details from "./Details";
import OfferDetailsGroup from "./OfferDetailsGroup";
import { editOffer } from "./editOffer";
import Salary from "@/app/(employer)/pracodawca/AddOfferForm/Salary/Salary";
import PhoneInput from "react-phone-number-input/input";

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
    onSuccess: () => {
      toast.success("Oferta zaktualizowana");
    },
    onError: () => {
      toast.error("Coś poszło nie tak");
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["offerDetails", offerID],
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
    email,
    experience,
    agreementType,
    workingTime,
    offerText,
    user,
    minSalary,
    maxSalary,
    phoneNumber,
    salaryOption,
    salaryGrossNet,
  } = data || {};

  const formattedTasks = tasks?.map((task) => ({ name: task })) || [];
  const formattedRequirements =
    requirements?.map((task) => ({ name: task })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
  } = useForm<OfferDetailsInputs>({
    defaultValues: {
      post,
      email,
      experience,
      agreementType,
      workingTime,
      company,
      city,
      address,
      offerText,
      tasks: formattedTasks,
      requirements: formattedRequirements,
      minSalary,
      maxSalary,
      phoneNumber,
      salaryOption,
      salaryGrossNet,
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
    <div className=" w-full p-2 pt-0 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="mb-4 text-center text-primary font-semibold text-2xl">
          Edytuj ofertę
        </h1>
        <form onSubmit={submitFn}>
          <Details
            register={register}
            placeholder="Nazwa stanowiska"
            name="post"
          />
          <Details
            register={register}
            placeholder="Nazwa firmy"
            name="company"
          />
          <Details register={register} placeholder="Miasto" name="city" />
          <Details
            register={register}
            placeholder="Adres placówki"
            name="address"
          />
          <div>
            <h1 className="mb-1 font-semibold capitalize text-primary text-center">
              Numer telefonu
            </h1>
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
          <Details
            register={register}
            placeholder="Stopień stanowiska"
            name="email"
          />
          <Experience register={register} />
          <AgreementType register={register} />
          <WorkingTime register={register} />
          <Salary register={register} getValues={getValues} errors={errors} />
          <OfferDetailsGroup
            control={control}
            name="tasks"
            register={register}
            title="Zakres obowiązków"
          />
          <OfferDetailsGroup
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
              className="block w-full p-2 rounded mb-2 outline-primary"
              maxLength={1000}
              rows={10}
            />
            {errors.offerText && (
              <p className="text-center text-sm text-red-500">
                Maksymalna liczba znaków to 1000
              </p>
            )}
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
        {Object.values(errors).length > 0 && (
          <div>Napraw błędy w formularzu</div>
        )}
        {isMuationError && <div className="text-red">Coś poszło nie tak</div>}
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default EditForm;
