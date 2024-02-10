import React from "react";
import WorkerOffers from "./WorkerOffers";
import WorkerSearchOffer from "./WorkerSearchOffer";

const WorkerOffersPage = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="md:w-1/2">
        <WorkerSearchOffer />
        <WorkerOffers />
      </div>
    </div>
  );
};

export default WorkerOffersPage;
