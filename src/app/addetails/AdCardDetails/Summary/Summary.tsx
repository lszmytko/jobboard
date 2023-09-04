import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrUserWorker } from "react-icons/gr";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { FaRegHandshake, FaBuilding } from "react-icons/fa";

import Detail from "./Detail";

const Summary = () => {
  return (
    <div className="max-w-3xl border-orange-300 border-2 text-sky-900 bg-gray-100 shadow-xl overflow-hidden">
      <div className="p-2">
        <p className="font-semibold mb-4">Technik weterynarii</p>
        <div className="flex gap-2 text-sm mb-4">
          <FaBuilding size={18} />
          <p className="text-sm">VetTech sp. z o.o.</p>
        </div>
        <div className="flex gap-2 text-sm mb-4">
          <div className="flex gap-2">
            <div className="flex justify-center">
              <HiOutlineLocationMarker size={18} />
            </div>
            <p>Warszawa</p>
          </div>
          <p>ul. Szlenkierów 6</p>
        </div>
      </div>
      <div className="sm:flex text-sm">
        <Detail info="1/3 lat doświadczenia">
          <GrUserWorker />
        </Detail>
        <Detail info="pełny etat">
          <PiSuitcaseSimpleFill />
        </Detail>
        <Detail info="umowa o pracę">
          <FaRegHandshake />
        </Detail>
      </div>
    </div>
  );
};

export default Summary;
