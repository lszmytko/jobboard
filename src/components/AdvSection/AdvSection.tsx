import { Dispatch, SetStateAction, useEffect } from "react";

import AdvCard from "../AdvCard";
import { fetchAllOffers } from "./fetchAllOffers";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "../loaders/SmallLoader";
import CurrentCourse from "../CurrentCourse";

export default function AdvSection({
  params,
  setPages,
}: {
  params: any;
  page: string;
  setPages: Dispatch<SetStateAction<number>>;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchAllOffers", params],
    queryFn: () => fetchAllOffers({ isActive: true, params }),
    retryOnMount: false,
  });

  const pagesCount = data?.data?.pages ?? 1;

  useEffect(() => {
    setPages(pagesCount);
  }, [pagesCount]);

  if (isLoading)
    return (
      <div className="flex justify-center mt-4">
        <SmallLoader />
      </div>
    );

  const offers = data?.data?.offers;

  if (!offers || offers.length === 0)
    return (
      <section className="flex justify-center p-2 mt-8">
        <p>Brak ogłoszeń.</p>
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
            <>
              {index === 4 && <CurrentCourse />}
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
            </>
          );
        })}
      </div>
    </section>
  );
}
