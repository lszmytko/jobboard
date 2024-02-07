import { AgreementType, OfferWorkingTime } from "@/common/types";

const Detail = ({
  children,
  info,
  isLast,
}: {
  children: React.ReactNode;
  info: string | AgreementType | OfferWorkingTime;
  isLast?: boolean;
}) => {
  const border = !isLast
    ? "border-b-2 sm:border-b-0 border-r-0 sm:border-r-2"
    : "";

  const parsedInfo = typeof info === "string" ? info : info.join(" / ");

  return (
    <div className={`${border} px-3 py-1 grow`}>
      <div className="flex justify-center">{children}</div>
      <p className="text-center">{parsedInfo}</p>
    </div>
  );
};

export default Detail;
