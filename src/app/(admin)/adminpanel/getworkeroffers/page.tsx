import React from "react";
import WorkerSearchOffer from "./WorkerSearchOffer";
import { fetchAdminWorkerOffers } from "./fetchAdminWorkeroffers";
import AdminOffers from "../AdminOffers";
import Pagination from "./Pagination";

const WorkerOffersPage = async ({
  searchParams,
}: {
  searchParams: Record<
    "minDate" | "maxDate" | "page" | "offerID" | "city" | "email",
    string
  >;
}) => {
  const response = await fetchAdminWorkerOffers({
    ...searchParams,
    page: searchParams.page,
  });

  const pagesCount = response?.data?.pages ?? 1;
  const offers = response?.data?.offers;

  return (
    <div>
      <div className="w-screen flex justify-center">
        <div className="md:w-1/2">
          <WorkerSearchOffer />
          <AdminOffers data={offers} type="worker" />
        </div>
      </div>
      <Pagination pagesCount={pagesCount} />
    </div>
  );
};

export default WorkerOffersPage;
