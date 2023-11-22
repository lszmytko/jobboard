"use client";

import { useQuery } from "@tanstack/react-query";

import AdvCard from "../AdvCard";
import { fetchAllOffers } from "./fetchAllOffers";

//TODO: remove mock data
const mockData = {
  id: "65566d591bd665199b6cb8fd",
  post: "Technik weterynarii",
  company: "VetTech sp. z. o.o.",
  city: "Warszawa",
  address: "ul. Szlenkierów 6/1",
  postLevel: "Kierownik",
  experience: "1-3 lata",
  agreementType: "UoP",
  workingTime: "pełen etat",
  timeOfPosting: "1 godz.",
} as const;

//TODO: remove mock data
const mockArray = [mockData, mockData, mockData, mockData, mockData, mockData];

const AdvSection = () => {
  const {
    isLoading: isQueryLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["fetchAllOffers"],
    queryFn: () => fetchAllOffers(true),
  });

  console.log("*** data", data);
  const offers = data?.data?.offers;

  return (
    <section className="flex justify-center p-2">
      <div className="w-full">
        {offers?.map((ad) => {
          const {
            _id,
            post,
            company,
            city,
            address,
            postLevel,
            experience,
            agreementType,
            workingTime,
            timeOfPosting,
          } = ad;
          return (
            <div
              key={_id}
              className="card-wrapper mb-4 md:flex md:justify-center"
            >
              <AdvCard
                post={post}
                company={company}
                city={city}
                address={address}
                postLevel={postLevel}
                experience={experience}
                agreementType={agreementType}
                workingTime={workingTime}
                timeOfPosting={timeOfPosting}
                id={_id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdvSection;
