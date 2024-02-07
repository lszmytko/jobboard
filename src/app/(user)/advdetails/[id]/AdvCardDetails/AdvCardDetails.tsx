"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { fetchSingleOffer } from "./fetchSingleOffer";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import AdvCardDetailsUI from "./AdvCardDetailsUI";

const AdvCardDetails = () => {
  const pathname = usePathname();

  const id = pathname.split("/").slice(-1)[0];

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getSingleOffer"],
    queryFn: () => fetchSingleOffer(id),
  });

  if (isError) return <div>Coś poszło nie tak...</div>;
  if (isLoading) return <FullPageLoader />;

  return <AdvCardDetailsUI data={data?.data?.offer || {}} />;
};

export default AdvCardDetails;
