import React from "react";

import Summary from "./Summary";
import Presentation from "./Presentation";
import ApplyButton from "./ApplyButton";
import EmailData from "./EmailData";
import { Offer } from "@/common/types";

type Props = Pick<
  Offer,
  | "post"
  | "company"
  | "city"
  | "address"
  | "experience"
  | "workingTime"
  | "tasks"
  | "requirements"
  | "_id"
  | "email"
>;

const AdvCardDetailsUI = ({
  post,
  company,
  city,
  address,
  experience,
  workingTime,
  tasks,
  requirements,
  email,
  _id,
}: Props) => {
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
        />
        <div className="p-2 bg-gray-100">
          <Presentation tasks={tasks} requirements={requirements} post={post} />
          <div className="mb-2 mt-4 flex justify-center">
            <ApplyButton
              offerID={_id}
              post={post}
              mail={"lszmytko@gmail.com"}
            />
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
