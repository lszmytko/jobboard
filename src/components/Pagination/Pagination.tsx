"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const activeStyle = "text-lg font-bold";

const Pagination = ({ pages }: { pages: number }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handlePageClick = (data: { selected: number }) => {
    const city = params.get("city") ?? "";
    const page = params.get("page") ?? "1";
    const postOrCompany = params.get("postOrCompany") ?? "";
    const cityString = city ? `&city=${city}` : "";
    const postOrCompanyString = postOrCompany
      ? `&postOrCompany=${postOrCompany}`
      : "";

    const paramsString = `?page=${
      data.selected + 1
    }${cityString}${postOrCompanyString}`;

    router.push(paramsString);
  };

  console.log("**pages", pages);

  if (pages === 1) return null;

  return (
    <div className="flex justify-center mb-8">
      <ReactPaginate
        containerClassName="flex flex-row justify-center items-center gap-2 "
        pageLinkClassName="px-2 cursor-pointer"
        forcePage={parseInt(params.get("page") ?? "1") - 1}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeLinkClassName={activeStyle}
      />
    </div>
  );
};

export default Pagination;
