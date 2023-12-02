"use client";

import AdvCard from "../AdvCard";
import { Offer } from "@/common/types";

const AdvSection = ({
  offers,
  isLoading,
}: {
  offers: Offer[] | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) return <div className="text-center">Chwilka...</div>;
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
                _id={_id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdvSection;
