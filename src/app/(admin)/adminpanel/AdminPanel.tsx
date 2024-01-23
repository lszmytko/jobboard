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

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["adminUserOffers"],
    queryFn: () => fetchAllOffers({ params: { page, company, offerID } }),
    onSuccess: (data) => {
      setOfferData(data.data.offers);
    },
  });

  if (isLoading) return <FullPageLoader />;
  if (isError) return <div>Coś poszło nie tak...</div>;

  console.log("*** data", data);

  const pages = data.data.pages;

  return (
    <div>
      <AdminSearchOffer setOfferData={setOfferData} />
      <AdminOffers data={offerData} />
      <Pagination pages={pages} />
    </div>
  );
};

export default AdminPanel;
