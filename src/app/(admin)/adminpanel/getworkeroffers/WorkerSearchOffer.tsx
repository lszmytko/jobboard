"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Offer } from "@/common/types";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DevTool } from "@hookform/devtools";
import { fetchAdminWorkerOffers } from "./fetchAdminWorkeroffers";

type FormInputs = {
  email: string;
  city: string;
  offerID: string;
  minDate: Date;
  maxDate: Date;
};

const WorkerSearchOffer = () => {
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: fetchAdminWorkerOffers,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await mutateAsync({ ...data, page: 1 });
    } catch (error) {
      console.log("*** error", error);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-center mb-4">Wyszukaj ofertę</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="sm:w-1/2 px-2">
          <div className="flex gap-1 mb-2">
            <input
              placeholder="Email"
              {...register("email")}
              className="w-1/3 p-1"
            />
            <input
              placeholder="ID oferty"
              {...register("offerID")}
              className="w-1/3 p-1"
            />
            <input
              placeholder="Miasto"
              {...register("city")}
              className="w-1/3 p-1"
            />
          </div>
          <div className="flex justify-center gap-1 mb-2">
            <Controller
              name="minDate"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <DatePicker
                  placeholderText="Data od"
                  onBlur={onBlur}
                  selected={value}
                  onChange={(date) => onChange(date)}
                  className="p-1"
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            <Controller
              name="maxDate"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <DatePicker
                  placeholderText="Data do"
                  onBlur={onBlur}
                  selected={value}
                  onChange={(date) => onChange(date)}
                  className="p-1"
                  dateFormat="dd-MM-yyyy"
                />
              )}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Wyszukaj"
              className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
            />
          </div>
          {Object.keys(errors).length > 0 && (
            <span>Wpisz jakieś kryterium wyszukiwania</span>
          )}
        </form>
        <DevTool control={control} />
      </div>
      {isLoading ? <p className="mt-2 text-center">Ładowanie...</p> : null}
      {isError ? <p>Wystąpił błąd...</p> : null}
    </div>
  );
};

export default WorkerSearchOffer;