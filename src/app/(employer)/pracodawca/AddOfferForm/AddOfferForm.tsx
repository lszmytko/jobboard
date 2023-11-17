"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Offer } from "@/common/types";

import InputFields from "./InputFields";
import Experience from "./Elements/Experience";
import AgreementType from "./Elements/AgreementType";
import WorkingTime from "./Elements/WorkingTime";
import { addOffer } from "./addOffer";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

export type Inputs = Omit<Offer, "timeOfPosting">;

const AddOfferForm = () => {
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: addOffer,
    onSuccess: () => {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<Inputs>({
    mode: "onSubmit",
    defaultValues: {
      tasks: [{ task: "" }], // initialize with one empty task
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    event?.preventDefault();

    const timeOfPosting = new Date().toISOString();
    const payload = { ...data, timeOfPosting };
    mutateAsync(payload);
  };

  if (isLoading) return <div>Loading...</div>;

  console.log(fields);

  return (
    <div className="max-w-3xl w-full p-2 pt-0">
      <h1 className="mb-4 text-center text-primary font-semibold text-2xl">
        Nowe ogłoszenie
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {fields.map((field, index) => (
            <div className="flex gap-2 mb-4" key={field.id}>
              <input
                type="text"
                {...register(`tasks.${index}.task` as const)}
                className="text-xl grow px-2"
              />
              <IoIosAddCircle
                className="cursor-pointer"
                size={38}
                onClick={() => {
                  append({ task: "" });
                }}
              />
              <IoIosRemoveCircle
                className="cursor-pointer"
                size={38}
                onClick={() => {
                  remove(index);
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
            className="block w-full p-2 rounded mb-2"
            maxLength={400}
            rows={10}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            className="p-2 bg-primary-light rounded text-xl cursor-pointer disabled:opacity-75"
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;
