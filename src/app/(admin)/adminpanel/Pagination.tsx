"use client";

import { paths } from "@/common/paths";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const activeStyle = "text-lg font-bold";

const Pagination = ({ pages }: { pages: number }) => {
  const router = useRouter();
  const params = useSearchParams();
  const company = params.get("company") ?? "";
  const offerID = params.get("offerID") ?? "";
  const page = params.get("page") ?? "1";

  const companyString = company ? `&city=${company}` : "";
  const offerIDString = offerID ? `&postOrCompany=${offerID}` : "";

  const handlePageClick = (data: { selected: number }) => {
    const paramsString = `?page=${
      data.selected + 1
    }${companyString}${offerIDString}`;

    router.push(paths.adminpanel + paramsString);
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
        initialPage={parseInt(page) - 1}
      />
    </div>
  );
};

export default Pagination;
