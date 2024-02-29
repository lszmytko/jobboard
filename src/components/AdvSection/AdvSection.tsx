import { MutableRefObject } from "react";

import AdvCard from "../AdvCard";
import { fetchAllOffers } from "./fetchAllOffers";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "../loaders/SmallLoader";

export default function AdvSection({
  params,
  pages,
  page,
}: {
  params: any;
  pages: MutableRefObject<number>;
  page: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchAllOffers", params],
    queryFn: () => fetchAllOffers({ isActive: true, params }),
    retryOnMount: false,
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-4">
        <SmallLoader />
      </div>
    );

  const offers = data?.data?.offers;

  pages.current = data?.data?.pages ?? 1;

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
