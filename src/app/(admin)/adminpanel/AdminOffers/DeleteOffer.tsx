import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { handleDeleteOffer } from "./handleDeleteOffer";

type DeleteOfferPRops = {
  closeDeleteModal: () => void;
  offerID: string;
  type: "worker" | "employer";
};

const DeleteOffer = ({ closeDeleteModal, offerID, type }: DeleteOfferPRops) => {
  const queryClient = useQueryClient();

  const notify = () => {
    toast.success("Usunięto ofertę!");
  };

  const queryKey =
    type === "worker" ? ["fetchAllWorkerOffers"] : ["adminUserOffers"];

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: handleDeleteOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      closeDeleteModal();
      notify();
    },
    onError: () => {
      toast.error("Usuwanie oferty się nie powiodło...");
    },
  });

  return (
    <div className="w-full h-full flex items-center">
      <div className="basis-full">
        <div>
          <p className="text-center mb-4 font-bold">
            Czy na pewno chcesz usunąć tę ofertę?
          </p>
          <div className="flex justify-center">
            <button
              className="mr-6 text-green-700 font-semibold"
              onClick={() => mutateAsync({ offerID, type })}
            >
              Tak
            </button>
            <button
              className="text-red-700 font-semibold"
              onClick={closeDeleteModal}
            >
              Nie
            </button>
          </div>
        </div>
        {isLoading ? <p>Ładowanie...</p> : null}
        {isError ? <p>Coś poszło nie tak...</p> : null}
      </div>
    </div>
  );
};

export default DeleteOffer;
