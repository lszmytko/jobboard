import React from "react";

import AddWorkerOfferForm from "@/app/(worker)/pracownik/AddWorkerOfferForm/AddWorkerOfferForm";

const AddAdminOfferlPage = () => {
  return (
    <div className="w-screen">
      <div className="flex justify-center">
        <AddWorkerOfferForm creator="admin" />
      </div>
    </div>
  );
};

export default AddAdminOfferlPage;
