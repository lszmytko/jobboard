import Link from "next/link";

import { Offer } from "@/common/types";

type AdvCardProps = Omit<Offer, "offerText">;

const AdvCard = ({
  post,
  company,
  city,
  address,
  postLevel,
  experience,
  agreementType,
  workingTime,
  timeOfPosting,
}: AdvCardProps) => {
  return (
    <div className="max-w-2xl w-full  border-orange-300 border-2 rounded-lg bg-gray-100 shadow-xl overflow-hidden">
      <Link href="/">
        <div className="p-4">
          <p className="text-xl font-bold mb-4">{post}</p>
          <div className="text-xs flex gap-2 mb-4 flex-wrap">
            <p>{company}</p>
            <p className="font-semibold">{city}</p>
            <p>{address}</p>
          </div>
          <div className="md:flex flex-wrap text-xs gap-2 md:gap-4">
            <p className="mb-1 md:mb-0">{postLevel}</p>
            <p className="mb-1 md:mb-0 font-bold">{experience}</p>
            <p className="mb-1 md:mb-0">{agreementType}</p>
            <p className="mb-1 md:mb-0">{workingTime}</p>
          </div>
        </div>
        <div className="h-px bg-primary-light"></div>
        <div className="flex justify-between text-xs px-4 py-2">
          <p>{timeOfPosting}</p>
          <p>szczegóły</p>
        </div>
      </Link>
    </div>
  );
};

export default AdvCard;