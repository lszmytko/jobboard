import { AgreementType, Offer, OfferWorkingTime } from "@/common/types";
import { GiMoneyStack } from "react-icons/gi";

const bottomBorderStyles = "border-b-2 sm:border-b-0 border-r-0 sm:border-r-2";

export const Detail = ({
  children,
  info,
  isLast,
}: {
  children: React.ReactNode;
  info: string | AgreementType | OfferWorkingTime;
  isLast?: boolean;
}) => {
  const border = !isLast ? bottomBorderStyles : "";

  const parsedInfo = typeof info === "string" ? info : info.join(" / ");

  return (
    <div className={`${border} px-3 py-1 grow`}>
      <div className="flex justify-center">{children}</div>
      <p className="text-center">{parsedInfo}</p>
    </div>
  );
};

type Props = Pick<
  Offer,
  "minSalary" | "maxSalary" | "salaryOption" | "salaryGrossNet"
>;

export const SalaryDetail = ({
  minSalary,
  maxSalary,
  salaryOption,
  salaryGrossNet,
}: Props) => {
  const parsedSalaryOption =
    salaryOption === "hourly" ? "za godzinę" : "miesięcznie";

  const parsedGrossNet = salaryGrossNet === "net" ? "netto" : "brutto";

  return (
    <div className="px-3 py-1 grow">
      <div className="flex justify-center">
        <GiMoneyStack />
      </div>
      <p className="text-center">
        {minSalary}zł - {maxSalary}zł {parsedGrossNet} {parsedSalaryOption}
      </p>
    </div>
  );
};
