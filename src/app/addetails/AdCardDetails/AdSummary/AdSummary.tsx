import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrUserWorker } from "react-icons/gr";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";

import Detail from "./Detail";

const AdSummary = () => {
  return (
    <div className="max-w-lg w-75 border-orange-300 border-2 text-sky-900 bg-gray-100 shadow-xl overflow-hidden">
      <p className="font-semibold">Technik weterynarii</p>
      <p className="text-sm">VetTech sp. z o.o.</p>
      <div className="flex gap-2 text-sm">
        <div className="flex">
          <div className="flex justify-center">
            <HiOutlineLocationMarker size={24} />
          </div>
          <p>Warszawa</p>
        </div>
        <p>ul. Szlenkierów 6</p>
      </div>
      <div className="md:flex text-sm">
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

export default AdSummary;
