"use client";

import { useState } from "react";

import AddOfferForm from "../AddOfferForm";
import Menu from "./Menu";
import OfferList from "./OfferList";
import { checkIfUserIsLoggedIn } from "@/utils/utils";
import { redirect } from "next/navigation";

export type EmployerPanelOptions = "offerForm" | "userData" | "userOffers";

const EmployerPanel = () => {
  const isUserLoggedIn = checkIfUserIsLoggedIn();
  if (!isUserLoggedIn) redirect("/pracodawca/login");

  const [option, setOption] = useState<EmployerPanelOptions>("offerForm");

  return (
    <div className="mt-4 flex max-md:flex-col gap-4 md:gap-12">
      <Menu handleToggle={setOption} option={option} />
      <div className="grow">
        {option === "offerForm" && <AddOfferForm />}
        {option === "userOffers" && <OfferList />}
        {option === "userData" && null}
      </div>
    </div>
  );
};

export default EmployerPanel;
