import { Offer, WorkerOffer as WorkerOfferType } from "@/common/types";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleWorkerOfferActivation } from "./handleWorkerOfferActivation";
import dayjs from "dayjs";

const paragraphStyle = "text-xs 0 mb-2";
const activeStyle = "text-green-500";
const inActiveStyle = "text-red-500";

const btnTextStyle = "flex cursor-pointer align-start text-xs w-full";

const WorkerOffer = ({
  details,
  openDetailsModal,
  openDeleteModal,
}: {
  details: WorkerOfferType;
  openDetailsModal: any;
  openDeleteModal: any;
}) => {
  const { email, timeOfPosting, city, status, _id } = details;
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: handleWorkerOfferActivation,
    onSuccess: () => {
      toast.success("Zmieniono status oferty");
      queryClient.invalidateQueries({ queryKey: ["fetchAllWorkerOffers"] });
    },
    onError: () => {
      toast.error("Nie udało się zmienić statusu oferty");
    },
  });

  const isActive = status === "active";
  const parsedDate = dayjs(timeOfPosting).format("DD-MM-YYYY HH:mm");

  const activateBtnCopy = isLoading ? "..." : isActive ? "Zakończ" : "Aktywuj";

  return (
    <div
      className="flex justify-between max-w-sm p-4 gap-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4"
      key={Math.random()}
    >
      <div>
        <p className={paragraphStyle}>Email: {email}</p>
        <p className={paragraphStyle}>ID oferty: {_id}</p>
        <p className={paragraphStyle}>Miasto: {city}</p>
        <p className={paragraphStyle}>
          Status:{" "}
          <span className={`${isActive ? activeStyle : inActiveStyle}`}>
            {" "}
            {isActive ? "Aktywne" : "Nieaktywne"}
          </span>
        </p>
        <p className={paragraphStyle}>Data dodania: {parsedDate}</p>
      </div>
      <div className="options flex flex-col text-end">
        <div className="option basis-2/4 flex">
          <button
            className={btnTextStyle}
            onClick={() => openDetailsModal(_id)}
          >
            Edytuj
          </button>
        </div>
        <div
          className="option basis-2/4 flex justify-end"
          onClick={() => openDeleteModal(_id)}
        >
          <button className={btnTextStyle}>Usuń</button>
        </div>
        <div className="option basis-2/4 flex justify-end">
          <button
            className={btnTextStyle}
            onClick={() =>
              mutateAsync({
                id: _id,
                option: isActive ? "deactivate" : "activate",
              })
            }
          >
            {activateBtnCopy}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerOffer;
