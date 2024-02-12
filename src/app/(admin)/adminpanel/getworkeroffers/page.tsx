"use client";

import React, { useRef, useState } from "react";
import WorkerOffers from "./WorkerOffers";
import WorkerSearchOffer from "./WorkerSearchOffer";
import Pagination from "./Pagination";

const WorkerOffersPage = () => {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [page, setPage] = useState(1);
  const pagesCount = useRef(1);

  return (
    <div>
      <div className="w-screen flex justify-center">
        <div className="md:w-1/2">
          <WorkerSearchOffer setFilterCriteria={setFilterCriteria} />
          <WorkerOffers
            filterCriteria={filterCriteria}
            page={page}
            pagesCount={pagesCount}
          />
        </div>
      </div>
      {pagesCount.current > 1 ? (
        <Pagination setPage={setPage} pagesCount={pagesCount} />
      ) : null}
    </div>
  );
};

export default WorkerOffersPage;
