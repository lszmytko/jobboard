"use client";

import { useQuery } from "@tanstack/react-query";

import ApplyButton from "./ApplyButton";
import Presentation from "./Presentation";
import EmailData from "./EmailData";
import Summary from "./Summary";
import { fetchSingleOffer } from "./fetchSingleOffer";
import { usePathname } from "next/navigation";
import UserNames from "./UserNames";

const AdvCardDetails = () => {
  const pathname = usePathname();

  const id = pathname.split("/").slice(-1)[0];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getSingleOffer"],
    queryFn: () => fetchSingleOffer(id),
  });

  if (isError || !data) return <div>Coś poszło nie tak...</div>;

  const {
    post,
    company,
    city,
    address,
    tasks,
    requirements,
    _id: offerID,
  } = data?.data.offer;

  return (
    <div className="flex justify-center max-w-5xl border-orange-300 border-2">
      <div>
        <Summary post={post} company={company} city={city} address={address} />
        <div className="p-2 bg-gray-100">
          <Presentation tasks={tasks} requirements={requirements} />
          <UserNames />
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
