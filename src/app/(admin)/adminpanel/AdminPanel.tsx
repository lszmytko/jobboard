"use client";

import { useEffect, useState } from "react";
import AdminOffers from "./AdminOffers";
import AdminSearchOffer from "./AdminSearchOffer";
import { Offer } from "@/common/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import { fetchAllOffers } from "@/components/AdvSection/fetchAllOffers";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";

const AdminPanel = () => {
  const [offerData, setOfferData] = useState<Offer[]>([]);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const company = searchParams.get("company") ?? "";
  const offerID = searchParams.get("offerID") ?? "";
  const minDate = searchParams.get("minDate") ?? "";
  const maxDate = searchParams.get("minDate") ?? "";

  console.log("redeploy");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["adminUserOffers"],
    queryFn: () =>
      fetchAllOffers({ params: { page, company, offerID, minDate, maxDate } }),
    onSuccess: (data) => {
      setOfferData(data.data.offers);
    },
  });

  if (isLoading) return <FullPageLoader />;
  if (isError) return <div>Coś poszło nie tak...</div>;

  const pages = data.data.pages;

  return (
    <div>
      <AdminSearchOffer setOfferData={setOfferData} />
      <AdminOffers data={offerData} type="employer" />
      {pages > 1 ? <Pagination pages={pages} /> : null}
    </div>
  );
};

export default AdminPanel;
