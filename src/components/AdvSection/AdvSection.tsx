import React from "react";

import AdvCard from "../AdvCard";
import CurrentCourse from "../CurrentCourse";
import { fetchAllOffers } from "./fetchAllOffers";

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
          return (
            <React.Fragment key={ad._id}>
              {index === 4 && <CurrentCourse />}
              <div className="card-wrapper mb-4 md:flex md:justify-center">
                <AdvCard
                  post={ad.post}
                  company={ad.company}
                  city={ad.city}
                  address={ad.address}
                  experience={ad.experience}
                  agreementType={ad.agreementType}
                  workingTime={ad.workingTime}
                  timeOfPosting={ad.timeOfPosting}
                  _id={ad._id}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
