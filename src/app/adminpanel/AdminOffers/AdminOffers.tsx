"use client";

import { useState } from "react";
import React from "react";
import Modal from "react-modal";

import AdvCard from "@/components/AdvCard";
import { Offer } from "@/common/types";

import DeleteOffer from "./DeleteOffer";
import OfferDetails from "./OfferDetails";

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
        {/* {data.map((item) => {
        const {
          post,
          company,
          city,
          address,
          postLevel,
          experience,
          agreementType,
          workingTime,
          timeOfPosting,
          tasks,
          requirements,
          isActive,
        } = item;
        return (
          <div className="">
            <p>Stanowisko: {post}</p>
            <p>Firma: {post}</p>
            <p>ID oferty: {id}</p>
            <p>Czy aktywne: {isActive ? "tak" : "nie"}</p>
          </div>
        );
      })} */}

        <div
          className="flex border-2 border-solid p-2 border-primary"
          key={Math.random()}
        >
          <div className="">
            <p>Stanowisko: {mockData.post}</p>
            <p>Firma: {mockData.post}</p>
            <p>ID oferty: {mockData.id}</p>
            <p>Czy aktywne: {mockData.isActive ? "tak" : "nie"}</p>
          </div>
          <div className="options flex flex-col p-1">
            <div className="option basis-2/4 flex justify-center align-center">
              <button
                className=" cursor-pointer"
                onClick={() => openDetailsModal(offerID)}
              >
                Edytuj
              </button>
            </div>
            <div
              className="option basis-2/4 flex justify-center align-center"
              onClick={() => openDeleteModal("654615b8d529d6cb5bee1cf4")}
            >
              <button className="option basis-2/4 cursor-pointer">Usuń</button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <DeleteOffer closeDeleteModal={closeDeleteModal} offerID={offerID} />
      </Modal>
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
