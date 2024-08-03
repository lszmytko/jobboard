import Search from "../components/Search";
import HomeAds from "../components/homepage/HomeAds";

import HomeButtons from "@/components/homepage/HomeButtons";
import { PaginationWithSuspense } from "@/components/Pagination/Pagination";
import { CityButtons } from "@/components/homepage/CityButtons";

export default function HomeTemplate() {
  return (
    <>
      <div className="mb-4">
        <CityButtons />
      </div>
      <HomeButtons />
      <Search />
      <>
        <HomeAds />
        <PaginationWithSuspense />
      </>
    </>
  );
}

export const revalidate = 600;
