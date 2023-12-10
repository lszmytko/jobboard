"use client";

import AddOfferForm from "@/app/(employer)/pracodawca/AddOfferForm";
import React, { useRef } from "react";
import SelectedEmployer from "./SelectedEmployer";

const AddAdminOffer = () => {
  const [selectedUser, setSelectedUser] = React.useState("");

  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5">
        <SelectedEmployer setSelectedUser={setSelectedUser} />
        <AddOfferForm creator="admin" selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default AddAdminOffer;
