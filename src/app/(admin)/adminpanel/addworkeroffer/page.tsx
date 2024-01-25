import AddWorkerOfferForm from "@/app/(worker)/pracownik/AddWorkerOfferForm/AddWorkerOfferForm";
import React from "react";

const AddAdminOfferlPage = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="md:w-1/2">
        <AddWorkerOfferForm creator="admin" />
      </div>
    </div>
  );
};

export default AddAdminOfferlPage;
