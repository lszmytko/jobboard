import Item from "./Item";

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
  return (
    <div>
      <h1 className="text-center font-bold mb-6 text-2xl text-primary">
        Twoje ogłoszenia
      </h1>
      <div>
        {mockData.map((item) => {
          return (
            <Item
              date={item.date}
              post={item.post}
              isActive={item.isActive}
              key={Math.random()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OfferList;
