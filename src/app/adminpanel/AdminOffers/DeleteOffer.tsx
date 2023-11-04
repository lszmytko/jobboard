import { useMutation } from "@tanstack/react-query";
import React from "react";
import { handleDeleteOffer } from "./handleDeleteOffer";

type DeleteOfferPRops = {
  closeDeleteModal: () => void;
  offerID: string;
};

const DeleteOffer = ({ closeDeleteModal, offerID }: DeleteOfferPRops) => {
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: handleDeleteOffer,
    // onSuccess: () => {
    //   router.push(paths.adminpanel);
    // },
  });

  return (
    <>
      <div>
        <p>Czy na pewno chcesz usunąć tę ofertę?</p>
        <div className="flex justify-center">
          <button className="mr-2" onClick={() => mutateAsync(offerID)}>
            Tak
          </button>
          <button onClick={closeDeleteModal}>Nie</button>
        </div>
      </div>
      {isLoading ? <p>Ładowanie...</p> : null}
      {isError ? <p>Coś poszło nie tak...</p> : null}
    </>
  );
};

export default DeleteOffer;
