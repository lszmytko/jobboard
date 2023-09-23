"use client";

import { useState } from "react";

import AddOfferForm from "../AddOfferForm";
import Menu from "./Menu";
import OfferList from "./OfferList";
import { checkIfUserIsLoggedIn } from "@/utils/utils";
import { redirect } from "next/navigation";

const EmployerPanel = () => {
  const isUserLoggedIn = checkIfUserIsLoggedIn();
  if (!isUserLoggedIn) redirect("/pracodawca/login");

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
