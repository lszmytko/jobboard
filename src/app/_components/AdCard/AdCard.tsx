import Link from "next/link";

const AdCard = () => {
  return (
    <Link href="/">
      <div className="max-w-lg w-75 border-orange-300 border-2 rounded-lg text-sky-900 bg-gray-100 shadow-xl overflow-hidden">
        <div className="p-4">
          <p className="text-xl font-bold mb-4">Technik weterynarii</p>
          <div className="text-xs flex gap-2 mb-4 flex-wrap">
            <p>VetTech sp. z. o.o.</p>
            <p className="font-semibold">Warszawa</p>
            <p>u. Szlenkierów 6/1</p>
          </div>
          <div className="md:flex flex-wrap text-xs gap-2 md:gap-4">
            <p className="mb-1 md:mb-0">Kierownik</p>
            <p className="mb-1 md:mb-0 font-bold">1/3 lat doświadczenia</p>
            <p className="mb-1 md:mb-0">UoP</p>
            <p className="mb-1 md:mb-0">pełny etat</p>
          </div>
        </div>
        <div className="h-px bg-orange-300"></div>
        <div className="flex justify-between text-xs px-4 py-2">
          <p>1 godz.</p>
          <p>szczegóły</p>
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
