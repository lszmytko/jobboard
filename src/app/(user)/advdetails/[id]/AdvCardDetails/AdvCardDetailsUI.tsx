import React from "react";

import Summary from "./Summary";
import Presentation from "./Presentation";
import ApplyButton from "./ApplyButton";
import EmailData from "./EmailData";
import { Offer } from "@/common/types";
import { MdOutlineTextSnippet } from "react-icons/md";

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
  } = data;

  return (
    <div className="flex justify-center max-w-5xl border-orange-300 border-2 shadow-lg rounded mt-4 ">
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
          <p className="text-sm mb-2">
            <h4 className="font-semibold mb-1">Opis oferty:</h4>
            <span>{offerText}</span>
          </p>
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
