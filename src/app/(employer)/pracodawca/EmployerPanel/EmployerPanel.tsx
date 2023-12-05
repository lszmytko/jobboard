"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import { checkIfUserIsLoggedIn } from "@/utils/utils";

import AddOfferForm from "../AddOfferForm";
import Menu from "./Menu";
import OfferList from "./OfferList";
import Info from "./UserInfo";

export type EmployerPanelOptions = "offerForm" | "userData" | "userOffers";

const EmployerPanel = () => {
  const isUserLoggedIn = checkIfUserIsLoggedIn();
  if (!isUserLoggedIn) redirect("/pracodawca/login");

  const [option, setOption] = useState<EmployerPanelOptions>("userData");

  return (
    <div className="flex justify-center mt-8">
      <div className="w-96 sm:w-3/4 max-w-[700px]">
        <Menu handleToggle={setOption} option={option} />
        <div className="w-full mt-8">
          {option === "offerForm" && <AddOfferForm creator="employer" />}
          {option === "userOffers" && <OfferList />}
          {option === "userData" && <Info />}
        </div>
      </div>
    </div>
  );
};

export default EmployerPanel;
