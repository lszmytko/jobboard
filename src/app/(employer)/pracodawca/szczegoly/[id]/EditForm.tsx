"use client";

import { fetchSingleOffer } from "@/app/(user)/advdetails/[id]/AdvCardDetails/fetchSingleOffer";
import { Offer } from "@/common/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

type FormInputs = Offer;

const EditForm = () => {
  const pathname = usePathname();

  const offerID = pathname.split("/").slice(-1)[0];

  const {
    isLoading: isQueryLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["taskDetail"],
    queryFn: () => fetchSingleOffer(offerID || ""),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  console.log(data);
  return <form>EditForm</form>;
};

export default EditForm;
