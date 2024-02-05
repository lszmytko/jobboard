"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Offer } from "@/common/types";
import { useRouter } from "next/navigation";
import { fetchAllOffers } from "@/components/AdvSection/fetchAllOffers";

type FormInputs = {
  company: string;
  offerID: string;
};

const AdminSearchOffer = ({
  setOfferData,
}: {
  setOfferData: Dispatch<SetStateAction<Offer[]>>;
}) => {
  const router = useRouter();

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: fetchAllOffers,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let params = "?page=1";
    if (data.company) params = params + `&company=${data.company}`;
    if (data.offerID) params = params + `&offerID=${data.offerID}`;

    try {
      const response = await mutateAsync({
        params: { page: "1", company: data.company, offerID: data.offerID },
      });
      setOfferData(response.data.offers);
      router.push(params);
    } catch (error) {}
  };

  return (
    <div className="mt-4">
      <h1 className="text-center mb-4">Wyszukaj ofertę</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="sm:w-1/2 px-2">
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
              value="Wyszukaj"
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
