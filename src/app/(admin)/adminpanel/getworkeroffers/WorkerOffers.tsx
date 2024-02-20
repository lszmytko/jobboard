"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllWorkerOffers } from "@/components/WorkerAdvSection/fetchAllWorkerOffers";
import { ThreeDots } from "react-loader-spinner";
import AdminOffers from "../AdminOffers";
import { fetchAdminWorkerOffers } from "./fetchAdminWorkeroffers";

const WorkerOffers = ({ filterCriteria, page, pagesCount }: any) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetchAdminWorkerOffers", filterCriteria, page],
    queryFn: () => fetchAdminWorkerOffers({ ...filterCriteria, page }),
    retryOnMount: false,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <ThreeDots />
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-700 mt-6">Coś poszło nie tak...</div>
    );

  pagesCount.current = data?.data?.pages;

  const offers = data?.data?.offers;

  return <AdminOffers data={offers} type="worker" />;
};

export default WorkerOffers;
