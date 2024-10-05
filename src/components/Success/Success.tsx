import Link from "next/link";

import { paths } from "@/common/paths";

export const Success = () => {
  return (
    <div className="w-full flex justify-center min-h-screen">
      <div className="p-2 text-center mt-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Gratulacje!
        </h1>
        <p className="text-lg font-bold text-primary">
          Ogłoszenie zostało wysłane. Teraz, gdy zostanie zaakceptowane przez
          administratora, pojawi się na liście ogłoszeń.
        </p>
        <div className="mt-6">
          <Link
            href={paths.job}
            className="text-center rounded py-2 px-4 mt-6 bg-primary-light cursor-pointer text-white"
          >
            Przejdź do ogłoszeń
          </Link>
        </div>
      </div>
    </div>
  );
};
