import Job from "./Job";
import CompanyDetails from "./CompanyDetails";
import List from "./List";
import { Offer } from "@/common/types";

const data = [
  "Przygotowywanie zwierząt do zabiegów",
  "Asystowanie przy zabiegach",
  "Przygotowywanie zwierząt do zabiegów",
  "Asystowanie przy zabiegach",
];

type PresentationProps = Pick<Offer, "requirements" | "tasks">;

const Presentation = ({ requirements, tasks }: PresentationProps) => {
  return (
    <div className="text-sm">
      <CompanyDetails />
      <Job />
      <List data={requirements} title="Zakres obowiązków" />
      <List data={tasks} title="Wymagania" />
    </div>
  );
};

export default Presentation;
