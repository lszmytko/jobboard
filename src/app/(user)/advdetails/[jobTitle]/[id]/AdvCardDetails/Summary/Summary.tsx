import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrUserWorker } from "react-icons/gr";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { FaRegHandshake, FaBuilding } from "react-icons/fa";

import { Detail, SalaryDetail } from "./Details";
import { Offer } from "@/common/types";

type SummaryProps = Pick<
  Offer,
  | "post"
  | "company"
  | "city"
  | "address"
  | "experience"
  | "workingTime"
  | "agreementType"
  | "minSalary"
  | "maxSalary"
  | "salaryOption"
  | "salaryGrossNet"
>;

const Summary = ({
  post,
  company,
  city,
  address,
  experience,
  workingTime,
  agreementType,
  minSalary,
  maxSalary,
  salaryOption,
  salaryGrossNet,
}: SummaryProps) => {
  return (
    <div className="text-sky-900 overflow-hidden">
      <div className="p-2">
        <p className="font-semibold mb-4">{post}</p>
        <div className="flex gap-2 text-sm mb-4">
          <FaBuilding size={18} />
          <p className="text-sm">{company}</p>
        </div>
        <div className="text-sm mb-4">
          <div className="flex gap-2">
            <div className="flex justify-center">
              <HiOutlineLocationMarker size={18} />
            </div>
            <p>
              {city}, {address}
            </p>
          </div>
        </div>
      </div>
      <div className="sm:flex text-sm border-y-2">
        <Detail info={experience}>
          <GrUserWorker />
        </Detail>
        <Detail info={workingTime}>
          <PiSuitcaseSimpleFill />
        </Detail>
        <Detail info={agreementType}>
          <FaRegHandshake />
        </Detail>
        <SalaryDetail
          minSalary={minSalary}
          maxSalary={maxSalary}
          salaryOption={salaryOption}
          salaryGrossNet={salaryGrossNet}
        />
      </div>
    </div>
  );
};

export default Summary;
