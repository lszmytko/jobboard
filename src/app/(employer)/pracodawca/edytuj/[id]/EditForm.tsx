"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "@/utils/utils";
import { DevTool } from "@hookform/devtools";
import { usePathname } from "next/navigation";

import { Offer } from "@/common/types";

import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { addOffer } from "../../AddOfferForm/addOffer";
import Experience from "../../AddOfferForm/Elements/Experience";
import AgreementType from "../../AddOfferForm/Elements/AgreementType";
import WorkingTime from "../../AddOfferForm/Elements/WorkingTime";
import { fetchSingleOffer } from "@/app/(user)/advdetails/[id]/AdvCardDetails/fetchSingleOffer";
import FullPageLoader from "@/components/loaders/FullPageLoader";

export type Inputs = Omit<Offer, "timeOfPosting" | "requirements" | "tasks"> & {
  tasks: { name: string }[];
} & {
  requirements: { name: string }[];
};

const EditForm = () => {
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: addOffer,
    onSuccess: () => {},
  });

  const pathname = usePathname();

  const offerID = pathname.split("/").slice(-1)[0];

  const {
    isLoading: isQueryLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["offerDetails"],
    queryFn: () => fetchSingleOffer(offerID || ""),
  });

  if (isQueryLoading) return <FullPageLoader />;

  return <EditFormUI mutate={mutateAsync} data={data?.data.offer} />;
};

const EditFormUI = ({
  mutate,
  data,
}: {
  mutate: any;
  data: Offer | undefined;
}) => {
  const pathname = usePathname();
  const offerID = pathname.split("/").slice(-1)[0];

  const { company, city, address } = data || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    control,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      company,
      city,
      address,
      tasks: [{ name: "" }],
      requirements: [{ name: "" }],
    },
  });

  const {
    fields: taskFields,
    append: taskAppend,
    remove: taskRemove,
  } = useFieldArray({
    control,
    name: "tasks",
    rules: { required: true, minLength: 1 },
  });

  const {
    fields: requirementFields,
    append: requirementAppend,
    remove: requirementRemove,
  } = useFieldArray({
    control,
    name: "requirements",
    rules: { required: true, minLength: 1 },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData, event) => {
    event?.preventDefault();

    const parsedRequirements = formData.requirements.map(
      (requirement) => requirement.name
    );
    const parsedTasks = formData.tasks.map((task) => task.name);

    const user = getUserFromLocalStorage();
    const payload = {
      ...(data ?? {}),
      ...formData,
      tasks: parsedTasks,
      requirements: parsedRequirements,
      user,
    };

    mutate(payload);
    reset();
    toast.success("Oferta pomyślnie zedytowana");
  };

  const submitFn = handleSubmit(onSubmit);

  return (
    <div className="max-w-3xl w-full p-2 pt-0">
      <h1 className="mb-4 text-center text-primary font-semibold text-2xl">
        Edytuj ofertę
      </h1>
      <form onSubmit={submitFn}>
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

        <div className="mb-4">
          <h1 className="mb-1 font-semibold capitalize text-primary text-center">
            Zadania
          </h1>
          {taskFields.map((field, index) => (
            <div className="flex gap-2 mb-4" key={field.id}>
              <input
                type="text"
                {...register(`tasks.${index}.name`, { required: true })}
                className="text-xl grow px-2"
                defaultValue={field.name}
              />
              <IoIosAddCircle
                className="cursor-pointer"
                size={38}
                onClick={() => {
                  taskAppend({ name: "" });
                }}
              />
              <IoIosRemoveCircle
                className="cursor-pointer"
                size={38}
                onClick={() => {
                  taskRemove(index);
                }}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h1 className="mb-1 font-semibold capitalize text-primary text-center">
            Wymagania
          </h1>
          {requirementFields.map((field, index) => (
            <div className="flex gap-2 mb-4" key={field.id}>
              <input
                type="text"
                {...register(`requirements.${index}.name`, {
                  required: true,
                })}
                className="text-xl grow px-2"
                defaultValue={field.name}
              />
              <IoIosAddCircle
                className="cursor-pointer"
                size={38}
                onClick={() => {
                  requirementAppend({ name: "" });
                }}
              />
              <IoIosRemoveCircle
                className="cursor-pointer"
                size={38}
                onClick={() => {
                  requirementRemove(index);
                }}
              />
            </div>
          ))}
        </div>

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
      {Object.values(errors).length > 0 && <div>Napraw błędy w formularzu</div>}
      <DevTool control={control} />
    </div>
  );
};

export default EditForm;
