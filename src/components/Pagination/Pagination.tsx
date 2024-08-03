"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

import { paths } from "@/common/paths";

import { fetchAllOffers } from "../AdvSection/fetchAllOffers";
import { Suspense } from "react";
import SmallLoader from "../loaders/SmallLoader";
import { cities } from "@/common/consts";

const activeStyle = "text-lg font-bold";

const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const slug = decodeURIComponent(
    pathname.split("/").slice(-1)[0] as unknown as string
  );
  const isCityPathname = cities.includes(slug);

  const page = searchParams.get("page") ?? "1";
  let city = searchParams.get("city") ?? "";
  city = isCityPathname ? slug : city;
  const postOrCompany = searchParams.get("postOrCompany") ?? "";

  const params = { page, city, postOrCompany };

  console.log({ params });

  const { data } = useQuery({
    queryKey: ["fetchAllOffers", params],
    queryFn: () => fetchAllOffers({ isActive: true, params }),
    retryOnMount: false,
  });

  const pagesCount = data?.data?.pages ?? 1;

  const handlePageClick = (data: { selected: number }) => {
    const postOrCompany = searchParams.get("postOrCompany") ?? "";
    const cityString = city ? `&city=${city}` : "";
    const postOrCompanyString = postOrCompany
      ? `&postOrCompany=${postOrCompany}`
      : "";

    const paramsString = `?page=${
      data.selected + 1
    }${cityString}${postOrCompanyString}`;

    router.push(`${paths.job}${paramsString}`);
  };

  if (pagesCount === 1) return null;

  return (
    <div className="flex justify-center mb-8">
      <ReactPaginate
        containerClassName="flex flex-row justify-center items-center gap-2 "
        pageLinkClassName="px-2 cursor-pointer"
        forcePage={parseInt(searchParams.get("page") ?? "1") - 1}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pagesCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeLinkClassName={activeStyle}
      />
    </div>
  );
};

export default Pagination;

export const PaginationWithSuspense = () => {
  return (
    <>
      <Suspense fallback={<SmallLoader />}>
        <Pagination />
      </Suspense>
    </>
  );
};
