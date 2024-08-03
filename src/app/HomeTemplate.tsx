import WorkerAdvSection from "@/components/WorkerAdvSection/WorkerAdvSection";
import Pagination from "@/components/Pagination";
import AdvSection from "@/components/AdvSection";
import HomeButtons from "@/components/homepage/HomeButtons";

import Search from "../components/Search";
import { SearchOption } from "@/common/types";
import { CityButtons } from "@/components/homepage/CityButtons";

export default function HomeTemplate({
  page,
  city,
  postOrCompany,
  option,
}: {
  page?: string;
  city?: string;
  postOrCompany?: string;
  option?: SearchOption;
}) {
  const params = { page, city: decodeURIComponent(city || ""), postOrCompany };

  return (
    <>
      <HomeButtons option={option} />
      {option === "pracodawcy" && (
        <>
          <CityButtons />
          <Search />
          <AdvSection params={params} page={page} />
          <Pagination />
        </>
      )}
      {option === "pracownicy" && <WorkerAdvSection />}
    </>
  );
}
