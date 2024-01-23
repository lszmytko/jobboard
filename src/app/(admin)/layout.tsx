import Link from "next/link";

const navCss =
  "pointer hover:bg-primary-light transition-all p-2 rounded bg-white";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="my-2">
      <header className="flex justify-center mb-6">
        <nav className="flex bg-primary-light rounded p-4 gap-2 text-light-blue">
          <Link href="/adminpanel" className={navCss}>
            Przeglądaj oferty
          </Link>
          <Link href="/adminpanel/addoffer" className={navCss}>
            Dodaj ofertę pracodawcy
          </Link>
          <Link href="/adminpanel/addworkeroffer" className={navCss}>
            Dodaj ofertę pracownika
          </Link>
        </nav>
      </header>
      {children}
    </section>
  );
}
