import React from "react";

import { WorkerOffer } from "@/common/types";
import dayjs from "dayjs";

const spanStyles = "font-bold text-primary-light";
const paragraphStyles = "mb-2";

const WorkerAdvCardDetailsUI = ({
  data,
}: {
  data: WorkerOffer & { timeOfPosting: string };
}) => {
  const {
    email,
    phoneNumber,
    city,
    experience,
    availability,
    timeOfPosting,
    offerText,
  } = data;
  return (
    <div className="w-1/2 max-w-5xl border-orange-300 border-4 shadow-lg rounded mt-4 p-4 text-sm">
      <h1 className="text-xl font-bold text-center mb-4">Oferta kandydata</h1>
      <p className={paragraphStyles}>{offerText}</p>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Email:</span> {email}
      </p>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Numer telefonu:</span> {phoneNumber}
      </p>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Miasto: </span> {city}
      </p>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Doświadczenie:</span> {experience}
      </p>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Dostępność:</span> {availability}
      </p>
      <p className="mb-2">
        Jeeli jesteście Państwo zainteresowani ofertą kandydata, prośba o
        kontakt uzywając podanego numeru telefonu lub maila
      </p>
      <p className="text-end text-sm">
        Data dodania oferty: {dayjs(timeOfPosting).format("YYYY-MM-DD")}
      </p>
    </div>
  );
};

export default WorkerAdvCardDetailsUI;