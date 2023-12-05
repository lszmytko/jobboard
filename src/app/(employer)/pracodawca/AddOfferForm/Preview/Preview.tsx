import Modal from "react-modal";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { accceptButtonStyles, customDeleteModalStyles } from "./styles";
import { useRouter } from "next/navigation";
import { addOffer } from "../addOffer";
import AdvCardDetailsUI from "@/app/(user)/advdetails/[id]/AdvCardDetails/AdvCardDetailsUI";
import { OfferData } from "../AddOfferForm";

const Preview = ({
  isOpen,
  closeModal,
  offerData,
  reset,
}: {
  isOpen: boolean;
  closeModal: () => void;
  offerData: OfferData;
  reset: () => void;
}) => {
  const router = useRouter();
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: addOffer,
    onSuccess: () => {
      reset();
      closeModal();
      toast.success("Oferta pomyślnie dodana");
    },
    onError: () => {
      toast.success("Nie udało się dodać oferty");
    },
  });

  const {
    post,
    company,
    city,
    address,
    experience,
    workingTime,
    tasks,
    requirements,
    _id,
  } = offerData;

  const loadingStyles = isLoading ? "cursor-not-allowed opacity" : "";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customDeleteModalStyles}
      contentLabel="Delete Modal"
    >
      <div className="flex justify-center items-center">
        <div>
          <h1 className="text-center text-xl font-bold mb-4">
            Podgląd dodawanej oferty
          </h1>
          <AdvCardDetailsUI
            post={post}
            company={company}
            city={city}
            address={address}
            experience={experience}
            workingTime={workingTime}
            tasks={tasks}
            requirements={requirements}
            _id={_id}
          />
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => mutateAsync(offerData)}
              className={`${accceptButtonStyles} ${loadingStyles}`}
            >
              Dodaj ofertę
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Preview;
