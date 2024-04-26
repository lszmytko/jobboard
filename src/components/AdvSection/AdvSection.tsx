import AdvCard from "../AdvCard";
import { fetchAllOffers } from "./fetchAllOffers";
import CurrentCourse from "../CurrentCourse";
import React from "react";

export default async function AdvSection({
  params,
}: {
  params: any;
  page?: string;
}) {
  const response = await fetchAllOffers({ isActive: true, params });
  const offers = response?.data?.offers;

  if (!offers || offers.length === 0)
    return (
      <section className="flex justify-center p-2 mt-8 min-h-screen">
        <p>Brak ofert.</p>
      </section>
    );

  return (
    <section className="flex justify-center p-2">
      <div className="w-full">
        {offers?.map((ad, index) => {
          const {
            _id,
            post,
            company,
            city,
            address,
            experience,
            agreementType,
            workingTime,
            timeOfPosting,
          } = ad;

          return (
            <React.Fragment key={_id}>
              {index === 4 && <CurrentCourse />}
              <div className="card-wrapper mb-4 md:flex md:justify-center">
                <AdvCard
                  post={post}
                  company={company}
                  city={city}
                  address={address}
                  experience={experience}
                  agreementType={agreementType}
                  workingTime={workingTime}
                  timeOfPosting={timeOfPosting}
                  _id={_id}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
