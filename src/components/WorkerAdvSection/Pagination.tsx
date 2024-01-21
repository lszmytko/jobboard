"use client";

import { paths } from "@/common/paths";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import ReactPaginate from "react-paginate";

const activeStyle = "text-lg font-bold";

const Pagination = ({
  page,
  pages,
  setPage,
}: {
  pages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  if (pages === 1) return null;

  return (
    <div className="flex justify-center mb-8">
      <ReactPaginate
        containerClassName="flex flex-row justify-center items-center gap-2 "
        pageLinkClassName="px-2 cursor-pointer"
        forcePage={0}
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
