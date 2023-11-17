"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { searchOffer } from "./searchOffer";
import { Dispatch, SetStateAction } from "react";
import { Offer } from "@/common/types";

type FormInputs = {
  company: string;
  offerID: string;
};

const AdminSearchOffer = ({
  setOfferData,
}: {
  setOfferData: Dispatch<SetStateAction<Offer[]>>;
}) => {
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: searchOffer,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const responseData = await mutateAsync(data);

    console.log("responseData", responseData.data.offers);

    if (responseData.data.offers) {
      setOfferData(responseData.data.offers);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-center mb-4">Wyszukaj ofertę</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
          <div className="flex gap-1 mb-2">
            <input
              placeholder="Nazwa firmy"
              {...register("company")}
              className="w-1/2 p-1"
            />
            <input
              placeholder="ID oferty"
              {...register("offerID")}
              className="w-1/2 p-1"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Zaloguj"
              className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
            />
          </div>
          {Object.keys(errors).length > 0 && (
            <span>Wpisz jakieś kryterium wyszukiwania</span>
          )}
        </form>
      </div>
      {isLoading ? <p>Ładowanie...</p> : null}
      {isError ? <p>Wystąpił błąd...</p> : null}
    </div>
  );
};

export default AdminSearchOffer;
