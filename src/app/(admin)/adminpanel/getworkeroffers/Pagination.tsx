"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const activeStyle = "text-lg font-bold";

const Pagination = ({ pagesCount }: { pagesCount: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pagesCount === 1) return;

  const params = new URLSearchParams(searchParams);

  const handlePageClick = ({ selected }: { selected: number }) => {
    params.delete("page");
    params.append("page", (selected + 1).toString());
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className="flex justify-center">
      <ReactPaginate
        containerClassName="flex flex-row justify-center items-center gap-2 cursor-pointer"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pagesCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName={activeStyle}
        initialPage={0}
        disableInitialCallback={true}
      />
    </div>
  );
};

export default Pagination;
