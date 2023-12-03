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
    <section className="flex text-sm justify-center gap-4">
      <div className="flex justify-center">
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
      <div className="flex justify-center">
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
      <div className="flex justify-center">
        <button
          className={`p-4 text-primary ${
            option === "userData" && activeOptionStyles
          } hover:scale-125`}
          onClick={() => handleToggle("userData")}
        >
          Twoje
          <br />
          konto
        </button>
      </div>
    </section>
  );
};

export default Menu;
