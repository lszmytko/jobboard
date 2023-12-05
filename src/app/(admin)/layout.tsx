import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="flex justify-center">
        <Link href="/adminpanel">Dodaj ofertę</Link>
      </header>
      {children}
    </section>
  );
}
