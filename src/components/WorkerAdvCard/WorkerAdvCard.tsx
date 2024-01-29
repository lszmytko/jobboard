import Link from "next/link";

import { WorkerOffer } from "@/common/types";
import { paths } from "@/common/paths";
import { shortenString } from "@/utils/utils";

type WorkerCardProps = Pick<
  WorkerOffer,
  "city" | "offerText" | "_id" | "timeOfPosting"
>;

const WorkerAdvCard = ({
  offerText,
  city,
  timeOfPosting,
  _id,
}: WorkerCardProps) => {
  const parsedTime = new Date(timeOfPosting).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const shortenedOfferText = shortenString(offerText);

  return (
    <div className="max-w-2xl w-full border-orange-300 border-2 rounded-lg bg-orange-100 shadow-xl overflow-hidden">
      <Link href={`${paths.workeradvdetails}/${_id}`}>
        <div className="p-4">
          <div className="text-sm flex gap-2 mb-1 flex-wrap">
            <p className="font-semibold">Miasto: {city}</p>
          </div>
          <div className="md:flex flex-wrap text-xs gap-2 md:gap-4">
            <p className="mb-1 md:mb-0">{shortenedOfferText}</p>
          </div>
        </div>
        <div className="h-px bg-primary-light"></div>
        <div className="flex justify-between text-xs px-4 py-2">
          <p>{parsedTime}</p>
          <p>szczegóły</p>
        </div>
      </Link>
    </div>
  );
};

export default WorkerAdvCard;
