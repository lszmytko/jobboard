import Job from "./Job";
import CompanyDetails from "./CompanyDetails";
import List from "./List";

const data = [
  "Przygotowywanie zwierząt do zabiegów",
  "Asystowanie przy zabiegach",
  "Przygotowywanie zwierząt do zabiegów",
  "Asystowanie przy zabiegach",
];

const Presentation = () => {
  return (
    <div className="text-sm">
      <CompanyDetails />
      <Job />
      <List data={data} title="Zakres obowiązków" />
      <List data={data} title="Wymagania" />
      <List data={data} title="Nasza oferta" />
    </div>
  );
};

export default Presentation;
