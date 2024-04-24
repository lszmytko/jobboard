import Search from "../components/Search";
import HomeAds from "../components/homepage/HomeAds";

import HomeButtons from "@/components/homepage/HomeButtons";
import { PaginationWithSuspense } from "@/components/Pagination/Pagination";

export default function HomeTemplate() {
  return (
    <>
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
