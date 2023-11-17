import { Offer } from "@/common/types";
import { useForm } from "react-hook-form";

const inputWrapperStyles = "border-2 border-solid border-primary-light mb-2";

const mockData = {
  id: Math.floor(Math.random() * 1000).toString(),
  post: "Technik weterynarii",
  company: "VetTech sp. z. o.o.",
  city: "Warszawa",
  address: "ul. Szlenkierów 6/1",
  postLevel: "Kierownik",
  agreementType: ["UoP"],
  experience: "1-3 lata",
  workingTime: ["pełen etat"],
  timeOfPosting: "1 godz.",
  offerText: "tekst oferty",
  tasks: [{ task: "task" }],
  requirements: ["requirement"],
  isActive: true,
} as Offer;

const OfferDetails = ({ offerID }: { offerID: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Offer>({
    mode: "onSubmit",
  });

  return (
    <div className="w-6/12">
      <h1 className="mb-4 text-center">Edytuj ogłoszenie</h1>
      <form>
        <div className={inputWrapperStyles}>
          <label>Nazwa stanowiska</label>
          <input
            placeholder="Nazwa stanowiska"
            {...register("post", { required: true })}
            className="py-2 "
            defaultValue={mockData.post}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Nazwa firmy</label>
          <input
            placeholder="Nazwa firmy"
            {...register("company", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.company}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Miasto</label>
          <input
            placeholder="Miasto"
            {...register("city", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.city}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Adres</label>
          <input
            placeholder="Adres"
            {...register("address", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.address}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Poziom stanowiska</label>
          <input
            placeholder="Poziom stanowiska"
            {...register("postLevel", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.postLevel}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Doświadczenie</label>
          <input
            placeholder="Doświadczenie"
            {...register("experience", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.experience}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Typ umowy</label>
          <input
            placeholder="Typ umowy"
            {...register("agreementType", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.agreementType}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Czas pracy</label>
          <input
            placeholder="Czas pracy"
            {...register("workingTime", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.workingTime}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Czas dodania</label>
          <input
            placeholder="Czas dodania"
            {...register("timeOfPosting", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.timeOfPosting}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Wymagania</label>
          <input
            placeholder="Wymagania"
            {...register("requirements", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.requirements}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Opis</label>
          <input
            placeholder="Opis"
            {...register("offerText", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.offerText}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Zadania</label>
          <input
            placeholder="Zadania"
            {...register("tasks", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.tasks}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Wymagania</label>
          <input
            placeholder="Wymagania"
            {...register("requirements", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.requirements}
          />
        </div>
        <div className={inputWrapperStyles}>
          <label>Czy aktywne</label>
          <input
            placeholder="Aktywne"
            {...register("isActive", { required: true })}
            className="block w-full mb-4 py-2"
            defaultValue={mockData.isActive.toString()}
          />
        </div>
      </form>
    </div>
  );
};

export default OfferDetails;
