import { fetchSingleOffer } from "./fetchSingleOffer";
import AdvCardDetailsUI from "./AdvCardDetailsUI";

const AdvCardDetails = async ({ id }: { id: string }) => {
  const data = await fetchSingleOffer(id);

  return <AdvCardDetailsUI data={data?.data?.offer || {}} />;
};

export default AdvCardDetails;
