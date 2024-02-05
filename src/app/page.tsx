"use client";

import Pagination from "@/components/Pagination";
import AdvSection from "../components/AdvSection";
import Search from "../components/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOffers } from "@/components/AdvSection/fetchAllOffers";
import { paths } from "@/common/paths";
import { useState } from "react";
import WorkerAdvSection from "@/components/WorkerAdvSection/WorkerAdvSection";

const baseButtonStyles = "font-extrabold";
const selectedButtonStyles = "p-2 bg-primary-light rounded-full text-white";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") ?? "1";
  const city = searchParams.get("city") ?? "";
  const postOrCompany = searchParams.get("postOrCompany") ?? "";

  const [option, setOption] = useState<"workers" | "employers">("employers");

  const params = { page, city, postOrCompany };

  const { isLoading, data, isError, remove } = useQuery({
    queryKey: ["fetchAllOffers"],
    queryFn: () => fetchAllOffers({ isActive: true, params }),
    retryOnMount: false,
  });

  const offers = data?.data?.offers;
  const pages = data?.data.pages ?? 1;

  const handleOptionChange = (option: "workers" | "employers") => {
    router.push(paths.home);
    if (option === "workers") {
      setOption("workers");
    } else {
      setOption("employers");
    }
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleOptionChange("employers")}
          className={`${
            option === "employers" ? selectedButtonStyles : ""
          } ${baseButtonStyles}
          `}
        >
          Oferty pracodawców
        </button>
        <button
          onClick={() => handleOptionChange("workers")}
          className={`${
            option === "workers" ? selectedButtonStyles : ""
          } ${baseButtonStyles}
          `}
        >
          Oferty kandydatów
        </button>
      </div>
      {option === "employers" && (
        <>
          <Search remove={remove} />
          {!isError ? (
            <>
              <AdvSection offers={offers} isLoading={isLoading} />
              <Pagination pages={pages} remove={remove} path={paths.home} />
            </>
          ) : null}
        </>
      )}
      {option === "workers" && <WorkerAdvSection />}
    </>
  );
}
