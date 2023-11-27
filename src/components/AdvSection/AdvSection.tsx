"use client";

import AdvCard from "../AdvCard";
import { Offer } from "@/common/types";

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

const AdvSection = ({
  offers,
  isLoading,
}: {
  offers: Offer[] | undefined;
  isLoading: boolean;
}) => {
  console.log("*** offers", offers);
  if (isLoading) return <div>Chwilka...</div>;
  if (offers?.length === 0)
    return (
      <section className="flex justify-center p-2 mt-8">
        <p>Brak ogłoszeń.</p>
      </section>
    );

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
