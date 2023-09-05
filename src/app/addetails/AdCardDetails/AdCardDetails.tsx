import ApplyButton from "./ApplyButton";
import Presentation from "./Presentation";
import RevealPhone from "./RevealPhone";
import Summary from "./Summary";

const AdCardDetails = () => {
  return (
    <div className="flex justify-center max-w-5xl bg-red-200">
      <div>
        <Summary />
        <Presentation />
        <ApplyButton />
        <RevealPhone />
      </div>
    </div>
  );
};

export default AdCardDetails;
