"use client";

import { paths } from "@/common/paths";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

const activeStyle = "text-lg font-bold";

const Pagination = ({ pages, remove }: { pages: number; remove: any }) => {
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
    console.log("*** selected", data);
    const paramsString = `?page=${
      data.selected + 1
    }${cityString}${postOrCompanyString}`;

    router.push(paths.home + paramsString);
    remove();
  };

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
        // initialPage={parseInt(page) - 1}
      />
    </div>
  );
};

export default Pagination;
