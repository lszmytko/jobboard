import Link from "next/link";
import { IoIosTime, IoMdInformationCircle } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

import { WorkerOffer } from "@/common/types";
import { paths } from "@/common/paths";
import { shortenString } from "@/utils/utils";
import { MdPlace } from "react-icons/md";

type WorkerCardProps = Pick<
  WorkerOffer,
  | "city"
  | "offerText"
  | "_id"
  | "timeOfPosting"
  | "workingTime"
  | "postTitle"
  | "availability"
>;

const iconStyles = "w-5 h-5 shrink-0";

const WorkerAdvCard = ({
  offerText,
  city,
  timeOfPosting,
  _id,
  postTitle,
  availability,
}: WorkerCardProps) => {
  const parsedTime = new Date(timeOfPosting).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const shortenedOfferText = shortenString(offerText);

  const postTitleAsSlug = postTitle.trim().split(" ").join("-").toLowerCase();

  return (
    <div className="max-w-2xl w-full rounded-lg bg-orange-50 shadow-xl overflow-hidden">
      <Link href={`${paths.workeradvdetails}/${postTitleAsSlug}/${_id}`}>
        <div className="p-4">
          <div className="flex text-sm gap-2 mb-2">
            <div>
              <IoPerson className={iconStyles} />
            </div>
            <span className="font-bold capitalize">{postTitle}</span>
          </div>
          <div className="flex text-sm gap-2 mb-2">
            <IoMdInformationCircle className={iconStyles} />
            <div>{shortenedOfferText}</div>
          </div>
          <div className="text-sm flex gap-2 mb-2">
            <MdPlace className={iconStyles} />
            <span>{city}</span>
          </div>
          <div className="flex text-sm gap-2 mb-2">
            <IoIosTime className={iconStyles} />
            <div>Dostępność: {availability}</div>
          </div>
        </div>
        <div className="h-px bg-primary-light"></div>
        <div className="flex justify-between text-xs px-4 py-2">
          <p>Data dodania: {parsedTime}</p>
          <p>szczegóły</p>
        </div>
      </Link>
    </div>
  );
};

export default WorkerAdvCard;
