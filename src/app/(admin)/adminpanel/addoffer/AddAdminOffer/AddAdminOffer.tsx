import AddOfferForm from "@/app/(employer)/pracodawca/AddOfferForm";
import React from "react";
import EmployerSelector from "./EmployerSelector";

const AddAdminOffer = () => {
  return (
    <div className="flex justify-center">
      <EmployerSelector />
      <AddOfferForm creator="admin" selectedUser="655ba7bb87ceb3cf14f1af03" />
    </div>
  );
};

export default AddAdminOffer;
