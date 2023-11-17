"use client";

import { useState } from "react";
import AdminOffers from "./AdminOffers";
import AdminSearchOffer from "./AdminSearchOffer";
import { Offer } from "@/common/types";

const AdminPanel = () => {
  const [offerData, setOfferData] = useState<Offer[]>([]);

  return (
    <div>
      <AdminSearchOffer setOfferData={setOfferData} />
      <AdminOffers data={offerData} />
    </div>
  );
};

export default AdminPanel;
