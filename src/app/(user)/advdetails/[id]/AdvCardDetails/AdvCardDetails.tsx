"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import ApplyButton from "./ApplyButton";
import Presentation from "./Presentation";
import EmailData from "./EmailData";
import Summary from "./Summary";
import { fetchSingleOffer } from "./fetchSingleOffer";
import FullPageLoader from "@/components/loaders/FullPageLoader";

const AdvCardDetails = () => {
  const pathname = usePathname();

  const id = pathname.split("/").slice(-1)[0];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getSingleOffer"],
    queryFn: () => fetchSingleOffer(id),
  });

  if (isError) return <div>Coś poszło nie tak...</div>;
  if (isLoading) return <FullPageLoader />;

  const {
    post,
    company,
    city,
    address,
    tasks,
    requirements,
    experience,
    _id: offerID,
    workingTime,
  } = data?.data?.offer || {};

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
          <Presentation tasks={tasks} requirements={requirements} />
          <div className="mb-2 mt-4 flex justify-center">
            <ApplyButton
              offerID={offerID}
              post={post}
              mail={"lszmytko@gmail.com"}
            />
          </div>
          <p className="text-center py-1 text-xl">lub</p>
          <div className="mb-2 flex justify-center">
            <EmailData post={post} mail={"lszmytko@gmail.com"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvCardDetails;
