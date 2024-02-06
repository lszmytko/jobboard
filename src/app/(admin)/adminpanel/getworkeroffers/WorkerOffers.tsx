"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllWorkerOffers } from "@/components/WorkerAdvSection/fetchAllWorkerOffers";
import { ThreeDots } from "react-loader-spinner";
import AdminOffers from "../AdminOffers";

const WorkerOffers = () => {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [page, setPage] = useState(1);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetchAllWorkerOffers", filterCriteria, page],
    queryFn: () => fetchAllWorkerOffers(filterCriteria, page, false),
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
      <div className="text-center text-red-700 mt-6">
        Something went wrong...
      </div>
    );

  const offers = data?.data?.offers;

  return <AdminOffers data={offers} type="worker" />;
};

export default WorkerOffers;
