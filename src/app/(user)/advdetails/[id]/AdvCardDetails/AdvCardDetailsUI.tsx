import React from "react";

import Summary from "./Summary";
import Presentation from "./Presentation";
import ApplyButton from "./ApplyButton";
import EmailData from "./EmailData";
import { Offer } from "@/common/types";
import PhoneButton from "./PhoneButton/PhoneButton";

const AdvCardDetailsUI = ({ data }: { data: Offer }) => {
  const {
    post,
    company,
    city,
    address,
    experience,
    workingTime,
    agreementType,
    tasks,
    requirements,
    email,
    minSalary,
    maxSalary,
    salaryOption,
    offerText,
    salaryGrossNet,
    phoneNumber,
  } = data;

  return (
    <div className="w-full max-w-5xl shadow-xl rounded mt-4">
      <div>
        <Summary
          post={post}
          company={company}
          city={city}
          address={address}
          experience={experience}
          workingTime={workingTime}
          agreementType={agreementType}
          minSalary={minSalary}
          maxSalary={maxSalary}
          salaryOption={salaryOption}
          salaryGrossNet={salaryGrossNet}
        />
        <div className="p-2 bg-gray-100">
          <Presentation tasks={tasks} requirements={requirements} post={post} />
          <div className="text-sm mb-2">
            <h4 className="font-semibold mb-1">Opis oferty:</h4>
            <span className="whitespace-pre-line leading-relaxed">
              {offerText}
            </span>
          </div>
          <div className="mb-2 mt-4 flex justify-center">
            <PhoneButton phoneNumber={phoneNumber} />
          </div>
          <div className="mb-2 mt-4 flex justify-center">
            <ApplyButton post={post} mail={email} />
          </div>
          <p className="text-center py-1 text-xl">lub</p>
          <div className="mb-2 flex justify-center">
            <EmailData post={post} mail={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvCardDetailsUI;
