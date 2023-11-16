import ApplyButton from "./ApplyButton";
import Presentation from "./Presentation";
import RevealPhone from "./RevealPhone";
import Summary from "./Summary";

const AdvCardDetails = () => {
  return (
    <div className="flex justify-center max-w-5xl border-orange-300 border-2">
      <div>
        <Summary />
        <div className="p-2 bg-gray-100">
          <Presentation />
          <div className="mb-2 mt-4 flex justify-center">
            <ApplyButton />
          </div>
          <div className="mb-2 flex justify-center">
            <RevealPhone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvCardDetails;
