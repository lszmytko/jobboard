import Link from "next/link";

const AdCard = () => {
  return (
    <Link href="/">
      <div className="max-w-sm w-1/2 lg:max-w-full border-orange-300 border-2 rounded-lg text-sky-900 bg-gray-100 shadow-xl">
        <div className="p-4">
          <p className="text-xl font-bold mb-4">Technik weterynarii</p>
          <div className="text-xs flex gap-2 mb-4">
            <p>VetTech sp. z. o.o.</p>
            <p className="font-semibold">Warszawa</p>
          </div>
          <div className="flex text-xs gap-2">
            <p>Kierownik</p>
            <p>1/3 lat doświadczenia</p>
            <p>UoP</p>
            <p>pełny etat</p>
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
