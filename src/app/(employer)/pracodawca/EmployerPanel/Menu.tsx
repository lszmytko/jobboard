import { Dispatch, SetStateAction } from "react";
import { EmployerPanelOptions } from "./EmployerPanel";

const activeOptionStyles = "font-extrabold text-lg";

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
            option === "offerForm" && activeOptionStyles
          } hover:scale-125`}
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
            option === "userOffers" && activeOptionStyles
          } hover:scale-125`}
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
            option === "userData" && activeOptionStyles
          } hover:scale-125`}
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
