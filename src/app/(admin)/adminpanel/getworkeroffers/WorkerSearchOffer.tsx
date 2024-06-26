"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DevTool } from "@hookform/devtools";

type FormInputs = {
  email: string;
  city: string;
  minDate: Date;
  maxDate: Date;
};

const WorkerSearchOffer = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const params = new URLSearchParams();
      Object.keys(data).forEach((key) => {
        if (data[key as keyof FormInputs])
          params.append(key, data[key as keyof FormInputs].toString());
      });
      router.push(`${pathname}?${params}`);
    } catch (error) {}
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
              className="w-1/2   p-1"
            />

            <input
              placeholder="Miasto"
              {...register("city")}
              className="w-1/2 p-1"
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
