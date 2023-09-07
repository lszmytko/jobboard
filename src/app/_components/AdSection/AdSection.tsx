import AdCard from "../AdCard";

//TODO: remove mock data
const mockData = {
  id: Math.floor(Math.random() * 1000),
  post: "Technik weterynarii",
  company: "VetTech sp. z. o.o.",
  city: "Warszawa",
  address: "ul. Szlenkierów 6/1",
  postLevel: "Kierownik",
  experience: "1-3 lata",
  agreementType: "UoP",
  workingTime: "pełen etat",
  timeOfPosting: "1 godz.",
} as const;

//TODO: remove mock data
const mockArray = [mockData, mockData, mockData, mockData, mockData, mockData];

const AdSection = () => {
  return (
    <section className="flex justify-center p-2">
      <div className="w-full">
        {mockArray.map((ad) => {
          const {
            id,
            post,
            company,
            city,
            address,
            postLevel,
            experience,
            agreementType,
            workingTime,
            timeOfPosting,
          } = ad;
          return (
            <div
              key={id}
              className="card-wrapper mb-4 md:flex md:justify-center"
            >
              <AdCard
                post={post}
                company={company}
                city={city}
                address={address}
                postLevel={postLevel}
                experience={experience}
                agreementType={agreementType}
                workingTime={workingTime}
                timeOfPosting={timeOfPosting}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdSection;
