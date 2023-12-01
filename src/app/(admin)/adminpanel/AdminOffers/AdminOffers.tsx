"use client";

import { useState } from "react";
import React from "react";
import Modal from "react-modal";

import { Offer } from "@/common/types";

import OfferDetails from "./OfferDetails/OfferDetails";
import AdminOffer from "./AdminOffer";

const mockData = {
  id: Math.floor(Math.random() * 1000),
  post: "Technik weterynarii",
  company: "VetTech sp. z. o.o.",
  city: "Warszawa",
  address: "ul. Szlenkierów 6/1",
  postLevel: "Kierownik",
  experience: "1-3 lata",
  agreementType: ["UoP"],
  workingTime: ["pełen etat"],
  timeOfPosting: "1 godz.",
  isActive: true,
} as const;

const customStyles = {
  content: {},
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

const AdminOffers = ({ data }: { data: Offer[] }) => {
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

  return (
    <>
      <div className="mt-4">
        {data.map((item) => {
          return (
            <AdminOffer
              details={item}
              openDetailsModal={openDetailsModal}
              openDeleteModal={openDeleteModal}
              key={item._id}
            />
          );
        })}
      </div>
      <Modal
        isOpen={isDetailsModalOpen}
        onRequestClose={closeDetailsModal}
        style={customStyles}
        contentLabel="Details Modal"
      >
        <OfferDetails offerID={offerID} />
      </Modal>
    </>
  );
};

export default AdminOffers;
