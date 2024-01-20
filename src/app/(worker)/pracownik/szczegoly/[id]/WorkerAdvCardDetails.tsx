"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import FullPageLoader from "@/components/loaders/FullPageLoader";
import { fetchSingleWorkerOffer } from "./fetchSingleWorkerOffer";
import WorkerAdvCardDetailsUI from "./WorkerAdvCardDetailsUI";

const WorkerAdvCardDetails = () => {
  const pathname = usePathname();

  const id = pathname.split("/").slice(-1)[0];

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getSingleWorkerOffer"],
    queryFn: () => fetchSingleWorkerOffer(id),
  });

  if (isError) return <div>Coś poszło nie tak...</div>;
  if (isLoading) return <FullPageLoader />;

  return <WorkerAdvCardDetailsUI data={data?.data?.offer || {}} />;
};

export default WorkerAdvCardDetails;
