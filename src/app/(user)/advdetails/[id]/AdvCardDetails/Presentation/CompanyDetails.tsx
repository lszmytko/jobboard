const CompanyDetails = ({ aboutCompany }: { aboutCompany: string }) => {
  console.log(aboutCompany);
  return (
    <div className="mb-2">
      <p className="font-semibold mb-2 text-base">
        O firmie: <span className="font-normal">{aboutCompany}</span>
      </p>
    </div>
  );
};

export default CompanyDetails;
