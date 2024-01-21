const CompanyDetails = ({ info }: { info: string }) => {
  console.log(info);
  return (
    <div className="mb-2">
      <p className="font-semibold mb-2">O firmie</p>
      STRABAG jest europejskim koncernem w branży technologii budowlanych.
      Dzięki zaangażowaniu kompetentnych pracowników oraz wykorzystaniu
      nowoczesnych maszyn i własnych surowców realizuje z sukcesem inwestycje na
      całym świecie. Nie byłoby to możliwe bez pracy zespołowej – łączącej ze
      sobą różne kraje i gałęzie budownictwa. Zostań częścią naszego zespołu!
    </div>
  );
};

export default CompanyDetails;
