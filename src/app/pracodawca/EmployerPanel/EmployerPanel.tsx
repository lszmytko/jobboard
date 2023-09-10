"use client";

import { useState } from "react";

import AddOfferForm from "../AddOfferForm";
import Menu from "./Menu";
import OfferList from "./OfferList";

const EmployerPanel = () => {
  const [showNewOffer, setShowNewOffer] = useState(true);

  return (
    <div className="mt-4 flex gap-12">
      <Menu handleToggle={setShowNewOffer} showNewOffer={showNewOffer} />
      <div className="grow">
        {showNewOffer ? <AddOfferForm /> : <OfferList />}
      </div>
    </div>
  );
};

export default EmployerPanel;
