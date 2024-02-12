"use client";

import ReactPaginate from "react-paginate";

const activeStyle = "text-lg font-bold";

const Pagination = ({
  setPage,
  pagesCount,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagesCount: React.MutableRefObject<number>;
}) => {
  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="flex justify-center">
      <ReactPaginate
        containerClassName="flex flex-row justify-center items-center gap-2 cursor-pointer"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pagesCount.current}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName={activeStyle}
        initialPage={1}
      />
    </div>
  );
};

export default Pagination;
