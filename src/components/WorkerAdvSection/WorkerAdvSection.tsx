"use client";

import { useQuery } from "@tanstack/react-query";
import WorkerAdvCard from "../WorkerAdvCard/WorkerAdvCard";
import { fetchAllWorkerOffers } from "./fetchAllWorkerOffers";
import Search from "./Search";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "./Pagination";

const WorkerAdvSection = () => {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [page, setPage] = useState(1);

  const { isLoading, data, isError, remove } = useQuery({
    queryKey: ["fetchAllWorkerOffers", filterCriteria, page],
    queryFn: () => fetchAllWorkerOffers(filterCriteria, page),
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
  const offers = data.data.offers;
  const pages = data.data.pages;

  if (!offers.length)
    return (
      <>
        <div className="mt-6 text-center flex justify-center">
          <div className="max-w-2xl">
            <Search setFilterCriteria={setFilterCriteria} />
          </div>
        </div>
        <p className="text-center">Brak ofert...</p>
      </>
    );

  return (
    <>
      <div className="flex justify-center">
        <section className="max-w-2xl w-4/5">
          <Search setFilterCriteria={setFilterCriteria} />
          <div className="flex justify-center p-2">
            <div className="w-full">
              {offers?.map((offer) => {
                const { _id, city, offerText, timeOfPosting } = offer;
                return (
                  <div
                    key={_id}
                    className="card-wrapper mb-4 md:flex md:justify-center"
                  >
                    <WorkerAdvCard
                      offerText={offerText}
                      city={city}
                      timeOfPosting={timeOfPosting}
                      _id={_id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <Pagination page={page} setPage={setPage} pages={pages} />
    </>
  );
};

export default WorkerAdvSection;
