"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { fetchSingleOffer } from "./fetchSingleOffer";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import AdvCardDetailsUI from "./AdvCardDetailsUI";

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
    <AdvCardDetailsUI
      post={post}
      company={company}
      city={city}
      address={address}
      experience={experience}
      workingTime={workingTime}
      tasks={tasks}
      requirements={requirements}
      _id={offerID}
    />
  );
};

export default AdvCardDetails;
