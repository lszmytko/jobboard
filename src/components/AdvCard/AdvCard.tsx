import Link from "next/link";

import { Offer } from "@/common/types";
import { paths } from "@/common/paths";
import { IoPerson } from "react-icons/io5";
import { FaBuilding, FaRegHandshake } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiSuitcaseSimpleFill } from "react-icons/pi";

const flexStyles = "flex gap-2 mb-2";
const iconStyles = "w-4 h-4 sm:w-5 sm:h-5";

type AdvCardProps = Pick<
  Offer,
  | "post"
  | "company"
  | "city"
  | "address"
  | "experience"
  | "agreementType"
  | "workingTime"
  | "timeOfPosting"
  | "_id"
>;

const AdvCard = ({
  post,
  company,
  city,
  address,
  experience,
  agreementType,
  workingTime,
  timeOfPosting,
  _id,
}: AdvCardProps) => {
  const parsedTime = new Date(timeOfPosting).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const parsedAgreement = agreementType.join(" / ");
  const parsedWorkingTime = workingTime.join(" / ");
  const parsedJobTitle = post.split(" ").join("-").toLowerCase();
  const linkToOfferDetails = `${paths.advdetails}/${parsedJobTitle}/${_id}`;

  return (
    <div className="max-w-2xl w-full border-primary border-2 rounded-lg bg-white shadow-xl overflow-hidden">
      <Link href={linkToOfferDetails}>
        <div className="p-4 text-xs sm:text-sm">
          <h3 className="text-sm font-bold mb-2 text-center sm:text-lg capitalize">
            {post}
          </h3>
          <p className={flexStyles}>
            <FaBuilding className={iconStyles} />
            {company}
          </p>
          <p className={flexStyles}>
            <HiOutlineLocationMarker className={iconStyles} />
            <span>
              {city}, {address}
            </span>
          </p>
          <p className={flexStyles}>
            <IoPerson className={iconStyles} />
            <span>{experience}</span>
          </p>
          <p className={flexStyles}>
            <FaRegHandshake className={iconStyles} />
            <span>{parsedAgreement}</span>
          </p>
          <p className={flexStyles}>
            <PiSuitcaseSimpleFill className={iconStyles} />
            <span>{parsedWorkingTime}</span>
          </p>
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

export default AdvCard;
