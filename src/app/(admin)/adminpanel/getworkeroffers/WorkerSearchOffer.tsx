"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DevTool } from "@hookform/devtools";

type FormInputs = {
  email: string;
  city: string;
  offerID: string;
  minDate: Date;
  maxDate: Date;
};

const WorkerSearchOffer = ({
  setFilterCriteria,
}: {
  setFilterCriteria: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setFilterCriteria({ ...data });
    } catch (error) {
      console.log("*** error", error);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-center mb-4">Wyszukaj ofertę</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
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
                  className="p-1 w-full"
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
                  className="p-1 w-full"
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
    </div>
  );
};

export default WorkerSearchOffer;
