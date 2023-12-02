import { Offer } from "@/common/types";
import React from "react";

const paragraphStyle = "text-xs 0 mb-2";
const activeStyle = "text-green-500";
const inActiveStyle = "text-red-500";

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
      className="flex justify-between max-w-sm p-4 gap-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4"
      key={Math.random()}
    >
      <div>
        <p className={paragraphStyle}>Stanowisko: {post}</p>
        <p className={paragraphStyle}>Firma: {company}</p>
        <p className={paragraphStyle}>ID oferty: {_id}</p>
        <p className={paragraphStyle}>
          Status:{" "}
          <span className={`${isActive ? activeStyle : inActiveStyle}`}>
            {" "}
            {isActive ? "Aktywne" : "Niekatywne"}
          </span>
        </p>
      </div>
      <div className="options flex flex-col">
        <div className="option basis-2/4 flex justify-start">
          <button
            className="flex cursor-pointer align-start"
            onClick={() => openDetailsModal(_id)}
          >
            Edytuj
          </button>
        </div>
        <div
          className="option basis-2/4 flex justify-end"
          onClick={() => openDeleteModal(_id)}
        >
          <button className="flex cursor-pointer align-start">Usuń</button>
        </div>
      </div>
    </div>
  );
};

export default AdminOffer;
