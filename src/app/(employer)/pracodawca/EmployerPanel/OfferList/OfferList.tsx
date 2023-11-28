import { useQuery } from "@tanstack/react-query";

import { getUserFromLocalStorage } from "@/utils/utils";

import Item from "./Item";
import { fetchUserOffers } from "./utils";
import FullPageLoader from "@/components/loaders/FullPageLoader";

//TODO: remove when there is real data
const mockData = [
  { date: "12.01.2023", post: "Technik weterynarii", isActive: true },
  { date: "12.01.2023", post: "Technik weterynarii", isActive: true },
  { date: "12.01.2023", post: "Technik weterynarii", isActive: true },
  { date: "12.01.2023", post: "Technik weterynarii", isActive: true },
  { date: "12.01.2023", post: "Technik weterynarii", isActive: true },
  { date: "12.01.2023", post: "Technik weterynarii", isActive: true },
  { date: "12.01.2023", post: "Technik weterynarii", isActive: false },
  { date: "12.01.2023", post: "Technik weterynarii", isActive: true },
];

const OfferList = () => {
  const user = getUserFromLocalStorage();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userOffers"],
    queryFn: () => fetchUserOffers(user || ""),
  });

  if (isLoading) return <FullPageLoader />;
  if (isError) return <div>Coś poszło nie tak...</div>;

  const offers = data.data.userOffers;
  const areOffers = offers?.length > 0;

  return (
    <div>
      <h1 className="text-center font-bold mb-6 text-2xl text-primary">
        Twoje ogłoszenia
      </h1>
      {!areOffers ? (
        <div>Brak ogłoszeń.</div>
      ) : (
        <div>
          {offers.map((item) => {
            return (
              <Item
                date={item.timeOfPosting}
                post={item.post}
                isActive={item.isActive}
                key={Math.random()}
                id={item._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfferList;
