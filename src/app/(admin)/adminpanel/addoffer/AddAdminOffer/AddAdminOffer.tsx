"use client";

import React from "react";

import AddOfferForm from "@/app/(employer)/pracodawca/AddOfferForm";

const AddAdminOffer = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="md:w-3/5">
        <AddOfferForm creator="admin" />
      </div>
    </div>
  );
};

export default AddAdminOffer;
