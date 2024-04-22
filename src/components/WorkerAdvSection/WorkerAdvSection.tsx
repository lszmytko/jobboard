"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import WorkerAdvCard from "../WorkerAdvCard/WorkerAdvCard";
import { fetchAllWorkerOffers } from "./fetchAllWorkerOffers";
import Search from "./Search";
import Pagination from "./Pagination";
import SmallLoader from "../loaders/SmallLoader";
import CurrentCourse from "../CurrentCourse";

const WorkerAdvSection = () => {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [page, setPage] = useState(1);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetchAllWorkerOffers", filterCriteria, page],
    queryFn: () => fetchAllWorkerOffers(filterCriteria, page, true),
    retryOnMount: false,
  });

  if (isLoading)
    return (
      <div className="flex justify-center min-h-screen">
        <SmallLoader />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-700 mt-6 min-h-screen">
        Coś poszło nie tak...
      </div>
    );
  const offers = data.data.offers;
  const pages = data.data.pages;

  if (!offers.length)
    return (
      <>
        <div className="text-center flex justify-center">
          <div className="max-w-2xl w-4/5">
            <Search setFilterCriteria={setFilterCriteria} />
          </div>
        </div>
        <p className="text-center">Brak ofert...</p>
      </>
    );

  return (
    <>
      <div className="flex justify-center mt-6">
        <section className="max-w-2xl w-full sm:w-4/5">
          <Search setFilterCriteria={setFilterCriteria} />
          <div className="flex justify-center p-2">
            <div className="w-full">
              {offers?.map((offer, index) => {
                const {
                  _id,
                  city,
                  offerText,
                  timeOfPosting,
                  workingTime,
                  postTitle,
                  availability,
                } = offer;
                return (
                  <React.Fragment key={_id}>
                    {index === 4 && <CurrentCourse />}
                    <div className="card-wrapper mb-4 md:flex md:justify-center">
                      <WorkerAdvCard
                        workingTime={workingTime}
                        offerText={offerText}
                        city={city}
                        timeOfPosting={timeOfPosting}
                        _id={_id}
                        postTitle={postTitle}
                        availability={availability}
                      />
                    </div>
                  </React.Fragment>
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
