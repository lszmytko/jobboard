// "use client";

import { useRouter, useSearchParams } from "next/navigation";

import { paths } from "@/common/paths";
import WorkerAdvSection from "@/components/WorkerAdvSection/WorkerAdvSection";
import Pagination from "@/components/Pagination";
import AdvSection from "@/components/AdvSection";
import HomeButtons from "@/components/homepage/HomeButtons";

import Search from "../components/Search";
import { SearchOption } from "@/common/types";

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
  const params = { page, city, postOrCompany };

  return (
    <>
      <HomeButtons option={option} />
      {option === "pracodawcy" && (
        <>
          <Search />
          <>
            <AdvSection params={params} page={page} />
            <Pagination />
          </>
        </>
      )}
      {option === "pracownicy" && <WorkerAdvSection />}
    </>
  );
}
