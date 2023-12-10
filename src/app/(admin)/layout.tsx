import Link from "next/link";

const navCss = "pointer hover:bg-primary-light transition-all";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="my-2">
      <header className="flex justify-center mb-6">
        <nav className="flex bg-primary rounded p-4 gap-2 text-white">
          <Link href="/adminpanel" className={navCss}>
            Przeglądaj oferty
          </Link>
          <Link href="/adminpanel/addoffer" className={navCss}>
            Dodaj ofertę
          </Link>
          <Link href="/adminpanel" className={navCss}>
            Zarządzaj uzytkownikami
          </Link>
        </nav>
      </header>
      {children}
    </section>
  );
}
