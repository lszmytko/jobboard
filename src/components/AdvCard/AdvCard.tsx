import Link from "next/link";

import { Offer } from "@/common/types";
import { paths } from "@/common/paths";

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

  return (
    <div className="max-w-2xl w-full  border-orange-300 border-2 rounded-lg bg-gray-100 shadow-xl overflow-hidden">
      <Link href={`${paths.advdetails}/${_id}`}>
        <div className="p-4">
          <p className="text-xl font-bold mb-4">{post}</p>
          <div className="text-xs flex gap-2 mb-4 flex-wrap">
            <p>{company}</p>
            <p className="font-semibold">{city}</p>
            <p>{address}</p>
          </div>
          <div className="md:flex flex-wrap text-xs gap-2 md:gap-4">
            <p className="mb-1 md:mb-0">{email}</p>
            <p className="mb-1 md:mb-0 font-bold">{experience}</p>
            <p className="mb-1 md:mb-0">{agreementType}</p>
            <p className="mb-1 md:mb-0">{workingTime}</p>
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

export default AdvCard;
