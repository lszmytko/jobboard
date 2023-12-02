import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
