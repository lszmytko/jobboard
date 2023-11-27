"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const activeStyle = "text-lg font-bold";

const Pagination = ({ pages }: { pages: number }) => {
  const router = useRouter();
  const params = useSearchParams();
  const city = params.get("city") ?? "";
  const postOrCompany = params.get("postOrCompany") ?? "";

  const cityString = city ? `&city=${city}` : "";
  const postOrCompanyString = postOrCompany
    ? `&postOrCompany=${postOrCompany}`
    : "";

  const paramsString = `?page=${pages}${cityString}${postOrCompanyString}`;

  const handlePageClick = (event: any) => {
    router.push(paramsString);
  };

  if (pages === 1) return null;

  return (
    <div className="flex justify-center">
      <ReactPaginate
        containerClassName="flex flex-row justify-center items-center gap-2 cursor-pointer"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName={activeStyle}
      />
    </div>
  );
};

export default Pagination;
