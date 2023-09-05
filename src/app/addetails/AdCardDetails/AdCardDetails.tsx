import Presentation from "./Presentation";
import Summary from "./Summary";

const AdCardDetails = () => {
  return (
    <div className="flex justify-center max-w-5xl bg-red-200">
      <div>
        <Summary />
        <Presentation />
      </div>
    </div>
  );
};

export default AdCardDetails;
