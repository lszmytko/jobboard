"use client";

import { useQuery } from "@tanstack/react-query";

import ApplyButton from "./ApplyButton";
import Presentation from "./Presentation";
import RevealPhone from "./RevealPhone";
import Summary from "./Summary";
import { fetchSingleOffer } from "./fetchSingleOffer";
import { usePathname, useSearchParams } from "next/navigation";

const AdvCardDetails = () => {
  const pathname = usePathname();

  const id = pathname.split("/").slice(-1)[0];

  console.log("*** id", id);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getSingleOffer"],
    queryFn: () => fetchSingleOffer(id),
  });

  console.log("*** data", data);

  if (isError || !data) return <div>Coś poszło nie tak...</div>;

  const { post, company, city, address, tasks, requirements } =
    data?.data.offer;

  return (
    <div className="flex justify-center max-w-5xl border-orange-300 border-2">
      <div>
        <Summary post={post} company={company} city={city} address={address} />
        <div className="p-2 bg-gray-100">
          <Presentation tasks={tasks} requirements={requirements} />
          <div className="mb-2 mt-4 flex justify-center">
            <ApplyButton />
          </div>
          <div className="mb-2 flex justify-center">
            <RevealPhone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvCardDetails;
