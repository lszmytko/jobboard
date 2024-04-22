"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { fetchAllOffers } from "../AdvSection/fetchAllOffers";
import { Suspense } from "react";
import SmallLoader from "../loaders/SmallLoader";

const activeStyle = "text-lg font-bold";

const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const city = searchParams.get("city") ?? "";
  const postOrCompany = searchParams.get("postOrCompany") ?? "";

  const params = { page, city, postOrCompany };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchAllOffers", params],
    queryFn: () => fetchAllOffers({ isActive: true, params }),
    retryOnMount: false,
  });

  const pagesCount = data?.data?.pages ?? 1;

  const handlePageClick = (data: { selected: number }) => {
    const city = searchParams.get("city") ?? "";
    const postOrCompany = searchParams.get("postOrCompany") ?? "";
    const cityString = city ? `&city=${city}` : "";
    const postOrCompanyString = postOrCompany
      ? `&postOrCompany=${postOrCompany}`
      : "";

    const paramsString = `?page=${
      data.selected + 1
    }${cityString}${postOrCompanyString}`;

    router.push(paramsString);
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
