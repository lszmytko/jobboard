import Header from "@/components/Header";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sm:mt-4">
        <Header />
      </div>
      {children}
    </div>
  );
}
