import React from "react";

import { WorkerOffer } from "@/common/types";
import dayjs from "dayjs";

const spanStyles = "font-bold text-primary-light";
const paragraphStyles = "mb-2";

const WorkerAdvCardDetailsUI = ({ data }: { data: WorkerOffer }) => {
  const {
    email,
    phoneNumber,
    city,
    experience,
    workingTime,
    timeOfPosting,
    offerText,
    availability,
    postTitle,
  } = data;

  const parsedWorkingTime = workingTime.join(" / ");

  return (
    <div className="sm:w-1/2 max-w-5xl shadow-lg p-2 rounded  text-sm  border-primary-light bg-orange-50">
      <h1 className="text-xl font-bold text-center mb-4">Oferta kandydata</h1>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Nazwa stanowiska: </span>
        {postTitle}
      </p>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Opis oferty: </span>
        <span>{offerText}</span>
      </p>
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
        <span className={spanStyles}>Wymiar pracy:</span> {parsedWorkingTime}
      </p>
      <p className={paragraphStyles}>
        <span className={spanStyles}>Dostępność:</span> {availability}
      </p>
      <p className="mb-2">
        Jeżeli jesteście Państwo zainteresowani ofertą kandydata, prośba o
        kontakt uzywając podanego numeru telefonu lub maila
      </p>
      <p className="text-end text-sm">
        Data dodania oferty: {dayjs(timeOfPosting).format("YYYY-MM-DD")}
      </p>
    </div>
  );
};

export default WorkerAdvCardDetailsUI;
