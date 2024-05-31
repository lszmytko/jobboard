import Modal, { Styles } from "react-modal";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import AdvCardDetailsUI from "@/app/(user)/advdetails/[jobTitle]/[id]/AdvCardDetails/AdvCardDetailsUI";
import InputLoader from "@/components/loaders/InputLoader";

import { accceptButtonStyles, customDeleteModalStyles } from "./styles";
import { addOffer } from "../addOffer";
import { OfferData } from "../AddOfferForm";

const Preview = ({
  isOpen,
  closeModal,
  offerData,
  reset,
  creator,
}: {
  isOpen: boolean;
  closeModal: () => void;
  offerData: OfferData;
  reset: () => void;
  creator: "admin" | "employer";
}) => {
  const router = useRouter();
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: addOffer,
    onSuccess: () => {
      reset();
      closeModal();
      toast.success("Oferta pomyślnie dodana");
      creator === "admin"
        ? router.push("/adminpanel")
        : router.push("/pracodawca/sukces");
    },
    onError: () => {
      toast.error("Nie udało się dodać oferty");
    },
  });

  const loadingStyles = isLoading ? "cursor-not-allowed opacity" : "";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customDeleteModalStyles as Styles}
      contentLabel="Delete Modal"
    >
      <div className="flex justify-center items-center">
        <div>
          <h1 className="text-center text-xl font-bold mb-4">
            Podgląd dodawanej oferty
          </h1>
          <AdvCardDetailsUI data={offerData} />
          <div className="mt-4 flex justify-center">
            {isLoading ? (
              <InputLoader />
            ) : (
              <button
                onClick={() => mutateAsync({ ...offerData, creator })}
                className={`${accceptButtonStyles} ${loadingStyles}`}
              >
                Dodaj ofertę
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Preview;
