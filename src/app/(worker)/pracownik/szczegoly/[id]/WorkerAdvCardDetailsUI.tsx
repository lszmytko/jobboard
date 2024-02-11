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
  } = data;

  const parsedWorkingTime = workingTime.join(" / ");

  return (
    <div className="sm:w-1/2 max-w-5xl  border-2 shadow-lg p-2 rounded  text-sm  border-primary-light bg-orange-50">
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
        <span className={spanStyles}>Wymiar pracy:</span> {parsedWorkingTime}
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
