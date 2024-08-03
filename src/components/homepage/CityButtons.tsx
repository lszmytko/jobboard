import Link from "next/link";

import { cities } from "@/common/consts";

export const CityButtons = () => {
  return (
    <div className="flex justify-center mt-4 gap-4 flex-wrap">
      {cities.map((city) => {
        return (
          <Link
            href={`/praca/${city}`}
            key={city}
            className="py-2 px-4 bg-dark-blue capitalize rounded-lg text-white font-semibold text-xs sm:text-sm"
          >
            {city}
          </Link>
        );
      })}
    </div>
  );
};
