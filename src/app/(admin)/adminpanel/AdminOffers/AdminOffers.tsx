"use client";

import { useState } from "react";
import React from "react";
import Modal, { Styles } from "react-modal";

import { Offer, WorkerOffer as WorkerOfferType } from "@/common/types";

import OfferDetails from "./OfferDetails/OfferDetails";
import DeleteOffer from "./DeleteOffer";
import AdminOffer from "./AdminOffer";
import WorkerOffer from "../getworkeroffers/WorkerOffer/WorkerOffer";
import EditWorkerOffer from "../getworkeroffers/WorkerOffer/EditWorkerOffer";

const customEditModalStyles = {
  content: { padding: "2px", backgroundColor: "#f1f5f9" },
  overlay: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto",
  },
};

const customDeleteModalStyles = {
  content: {
    width: "75%",
    maxWidth: "500px",
    maxHeight: "200px",
    display: "flex",
    alignItems: "center",
    // height: "75%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto",
  },
};

const AdminOffers = ({
  data,
  type,
}: {
  data: Offer[] | WorkerOfferType[];
  type: "worker" | "employer";
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [offerID, setOfferID] = useState("");

  const openDeleteModal = (offerID: string) => {
    setOfferID(offerID);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setOfferID("");
    setIsDeleteModalOpen(false);
  };

  const openDetailsModal = (offerID: string) => {
    setOfferID(offerID);
    setIsDetailsModalOpen(true);
  };
  const closeDetailsModal = () => {
    setOfferID("");
    setIsDetailsModalOpen(false);
  };

  if (data.length === 0)
    return <div className="mt-2 text-center">Brak ofert...</div>;

  return (
    <>
      <div className="mt-4 flex justify-center">
        <div className="">
          {data.map((item) => {
            if (type === "employer") {
              return (
                <AdminOffer
                  details={item as Offer}
                  openDetailsModal={openDetailsModal}
                  openDeleteModal={openDeleteModal}
                  key={item._id}
                />
              );
            }
            return (
              <WorkerOffer
                details={item as WorkerOfferType}
                key={item._id}
                openDetailsModal={openDetailsModal}
                openDeleteModal={openDeleteModal}
              />
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={isDetailsModalOpen}
        onRequestClose={closeDetailsModal}
        style={customEditModalStyles as Styles}
        contentLabel="Details Modal"
      >
        {type === "employer" ? (
          <OfferDetails offerID={offerID} />
        ) : (
          <EditWorkerOffer offerID={offerID} />
        )}
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={customDeleteModalStyles as Styles}
        contentLabel="Delete Modal"
      >
        <DeleteOffer
          closeDeleteModal={closeDeleteModal}
          offerID={offerID}
          type={type}
        />
      </Modal>
    </>
  );
};

export default AdminOffers;
