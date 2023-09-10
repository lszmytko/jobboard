import { Dispatch, SetStateAction } from "react";

const Menu = ({
  handleToggle,
  showNewOffer,
}: {
  handleToggle: Dispatch<SetStateAction<boolean>>;
  showNewOffer: boolean;
}) => {
  return (
    <aside className="pt-32 px-8 w-1/6">
      <div className="flex justify-end">
        <button
          className={`p-4 text-primary ${
            showNewOffer && "font-bold"
          } hover:scale-110`}
          onClick={() => handleToggle(true)}
        >
          Dodaj
          <br />
          ogłoszenie
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className={`p-4 text-primary ${
            !showNewOffer && "font-bold"
          } hover:scale-110`}
          onClick={() => handleToggle(false)}
        >
          Przeglądaj
          <br />
          ogłoszenia
        </button>
      </div>
    </aside>
  );
};

export default Menu;
