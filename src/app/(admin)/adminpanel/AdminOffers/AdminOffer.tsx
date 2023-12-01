import { Offer } from "@/common/types";
import React from "react";

const AdminOffer = ({
  details,
  openDetailsModal,
  openDeleteModal,
}: {
  details: Offer;
  openDetailsModal: any;
  openDeleteModal: any;
}) => {
  const { post, city, company, _id, isActive } = details;
  return (
    <div
      className="flex border-2 border-solid p-2 border-primary mb-2"
      key={Math.random()}
    >
      <div className="">
        <p>Stanowisko: {post}</p>
        <p>Firma: {company}</p>
        <p>ID oferty: {_id}</p>
        <p>Czy aktywne: {isActive ? "tak" : "nie"}</p>
      </div>
      <div className="options flex flex-col p-1">
        <div className="option basis-2/4 flex justify-center align-center">
          <button
            className=" cursor-pointer"
            onClick={() => openDetailsModal(_id)}
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
  );
};

export default AdminOffer;
