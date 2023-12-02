export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header>Admin Header</header>
      {children}
    </section>
  );
}
