"use client";

import { useState } from "react";
import React from "react";
import Modal from "react-modal";

import AdvCard from "@/app/_components/AdvCard";
import { Offer } from "@/common/types";

import DeleteOffer from "./DeleteOffer";

const mockData = {
  id: Math.floor(Math.random() * 1000),
  post: "Technik weterynarii",
  company: "VetTech sp. z. o.o.",
  city: "Warszawa",
  address: "ul. Szlenkierów 6/1",
  postLevel: "Kierownik",
  experience: "1-3 lata",
  agreementType: "UoP",
  workingTime: "pełen etat",
  timeOfPosting: "1 godz.",
} as const;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AdminOffers = ({ data }: { data: Offer[] }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [offerID, setOfferID] = useState("");

  const openDeleteModal = (offerID: string) => {
    setOfferID(offerID);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setOfferID("");
    setIsDeleteModalOpen(false);
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
          <div className="flex" key={Math.random()}>
            <AdvCard
              post={post}
              company={company}
              city={city}
              address={address}
              postLevel={postLevel}
              experience={experience}
              agreementType={agreementType}
              workingTime={workingTime}
              timeOfPosting={timeOfPosting}
              tasks={tasks}
              requirements={requirements}
              isActive={isActive}
            />
          </div>
        );
      })} */}

        <div className="flex" key={Math.random()}>
          <AdvCard
            post={mockData.post}
            company={mockData.company}
            city={mockData.city}
            address={mockData.address}
            postLevel={mockData.postLevel}
            experience={mockData.experience}
            agreementType={mockData.agreementType}
            workingTime={mockData.workingTime}
            timeOfPosting={mockData.timeOfPosting}
            // tasks={mockData.tasks}
            // requirements={mockData.requirements}
            // isActive={mockData.isActive}
          />
          <div className="options flex flex-col p-1">
            <div className="option basis-2/4 flex justify-center align-center">
              <button className=" cursor-pointer">Edytuj</button>
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
        contentLabel="Example Modal"
      >
        <DeleteOffer closeDeleteModal={closeDeleteModal} offerID={offerID} />
      </Modal>
    </>
  );
};

export default AdminOffers;
