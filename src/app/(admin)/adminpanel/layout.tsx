import Link from "next/link";

const navCss =
  "pointer hover:bg-primary-light transition-all p-2 rounded w-1/2 text-sm text-center font-bold hover:text-white";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="my-2">
      <header className="flex justify-center mb-6">
        <nav className=" bg-primary-light rounded p-4 == text-light-blue">
          <div className="flex gap-2 mb-2">
            <Link href="/adminpanel" className={`${navCss} bg-red-100`}>
              Przeglądaj oferty pracodawców
            </Link>
            <Link
              href="/adminpanel/addoffer"
              className={`${navCss} bg-red-100`}
            >
              Dodaj ofertę pracodawcy
            </Link>
          </div>
          <div className="flex justify-between gap-2">
            <Link
              href="/adminpanel/getworkeroffers"
              className={`${navCss} bg-sky-100`}
            >
              Przeglądaj oferty pracowników
            </Link>
            <Link
              href="/adminpanel/addworkeroffer"
              className={`${navCss} bg-sky-100`}
            >
              Dodaj ofertę pracownika
            </Link>
          </div>
        </nav>
      </header>
      {children}
    </section>
  );
}
