"use client";

import React, { useState } from "react";
import WorkerOffers from "./WorkerOffers";
import WorkerSearchOffer from "./WorkerSearchOffer";

const WorkerOffersPage = () => {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="w-screen flex justify-center">
      <div className="md:w-1/2">
        <WorkerSearchOffer setFilterCriteria={setFilterCriteria} />
        <WorkerOffers filterCriteria={filterCriteria} page={page} />
      </div>
    </div>
  );
};

export default WorkerOffersPage;
