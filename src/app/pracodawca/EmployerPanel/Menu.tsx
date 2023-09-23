import { Dispatch, SetStateAction } from "react";
import { EmployerPanelOptions } from "./EmployerPanel";

const Menu = ({
  handleToggle,
  option,
}: {
  handleToggle: Dispatch<SetStateAction<EmployerPanelOptions>>;
  option: EmployerPanelOptions;
}) => {
  return (
    <aside className="md:pt-32 md:px-8 md:w-1/6 flex md:block text-sm">
      <div className="flex justify-center grow">
        <button
          className={`p-4 text-primary ${
            option === "offerForm" && "font-bold"
          } hover:scale-110`}
          onClick={() => handleToggle("offerForm")}
        >
          Dodaj
          <br />
          ogłoszenie
        </button>
      </div>
      <div className="flex justify-center grow">
        <button
          className={`p-4 text-primary ${
            option === "userOffers" && "font-bold"
          } hover:scale-110`}
          onClick={() => handleToggle("userOffers")}
        >
          Przeglądaj
          <br />
          ogłoszenia
        </button>
      </div>
      <div className="flex justify-center grow">
        <button
          className={`p-4 text-primary ${
            option === "userData" && "font-bold"
          } hover:scale-110`}
          onClick={() => handleToggle("userData")}
        >
          Twoje
          <br />
          dane
        </button>
      </div>
    </aside>
  );
};

export default Menu;
