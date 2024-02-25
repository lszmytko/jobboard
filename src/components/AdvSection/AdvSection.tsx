import { MutableRefObject } from "react";

import AdvCard from "../AdvCard";
import { fetchAllOffers } from "./fetchAllOffers";

export default async function AdvSection({
  params,
  pages,
}: {
  params: any;
  pages: MutableRefObject<number>;
}) {
  const data = await fetchAllOffers({ isActive: true, params });
  const offers = data.data?.offers;

  pages.current = data.data?.pages ?? 1;

  if (!offers || offers.length === 0)
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
            email,
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
                email={email}
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
}
