import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { handleDeleteOffer } from "./handleDeleteOffer";

type DeleteOfferPRops = {
  closeDeleteModal: () => void;
  offerID: string;
};

const DeleteOffer = ({ closeDeleteModal, offerID }: DeleteOfferPRops) => {
  const queryClient = useQueryClient();

  const notify = () => {
    toast.success("Usunięto ofertę!");
  };

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: handleDeleteOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUserOffers"] });
      closeDeleteModal();
      notify();
    },
  });

  return (
    <>
      <div>
        <p className="text-center mb-4">
          Czy na pewno chcesz usunąć tę ofertę?
        </p>
        <div className="flex justify-center">
          <button
            className="mr-6 text-green-700"
            onClick={() => mutateAsync(offerID)}
          >
            Tak
          </button>
          <button className="text-red-700" onClick={closeDeleteModal}>
            Nie
          </button>
        </div>
      </div>
      {isLoading ? <p>Ładowanie...</p> : null}
      {isError ? <p>Coś poszło nie tak...</p> : null}
    </>
  );
};

export default DeleteOffer;
