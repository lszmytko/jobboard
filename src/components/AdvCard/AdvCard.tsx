import Link from "next/link";
import { MdEmail } from "react-icons/md";

import { Offer } from "@/common/types";
import { paths } from "@/common/paths";
import { GrUserWorker } from "react-icons/gr";
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
  | "email"
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
  email,
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

  const agreement = agreementType.join(" / ");

  return (
    <div className="max-w-2xl w-full border-orange-300 border-2 rounded-lg bg-gray-100 shadow-xl overflow-hidden">
      <Link href={`${paths.advdetails}/${_id}`}>
        <div className="p-4 text-xs sm:text-sm">
          <p className="text-sm font-bold mb-2 text-center sm:text-lg">
            {post}
          </p>
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
            <MdEmail className={iconStyles} /> <span>{email}</span>
          </p>
          <p className={flexStyles}>
            <GrUserWorker className={iconStyles} />
            <span>{experience}</span>
          </p>
          <p className={flexStyles}>
            <FaRegHandshake className={iconStyles} />
            <span>{agreement}</span>
          </p>
          <p className={flexStyles}>
            <PiSuitcaseSimpleFill className={iconStyles} />
            <span>{workingTime}</span>
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
