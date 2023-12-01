"use client";

import { useState } from "react";
import AdminOffers from "./AdminOffers";
import AdminSearchOffer from "./AdminSearchOffer";
import { Offer } from "@/common/types";
import { useQuery } from "@tanstack/react-query";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import { fetchAllOffers } from "@/components/AdvSection/fetchAllOffers";

const AdminPanel = () => {
  const [offerData, setOfferData] = useState<Offer[]>([]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["adminUserOffers"],
    queryFn: () => fetchAllOffers(),
    onSuccess: (data) => {
      setOfferData(data.data.offers);
    },
  });

  console.log("*** data", data);

  if (isLoading) return <FullPageLoader />;
  if (isError) return <div>Coś poszło nie tak...</div>;

  const offers = data.data.offers;
  const areOffers = offers?.length > 0;

  return (
    <div>
      <AdminSearchOffer setOfferData={setOfferData} />
      <AdminOffers data={offerData} />
    </div>
  );
};

export default AdminPanel;
