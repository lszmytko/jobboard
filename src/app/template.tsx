import Header from "@/components/Header";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("***Header rendered***");
  return (
    <div>
      <div className="sm:mt-4">
        <Header />
      </div>
      {children}
    </div>
  );
}
