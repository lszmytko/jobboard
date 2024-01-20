"use client";

import Pagination from "@/components/Pagination";
import AdvSection from "../components/AdvSection";
import Search from "../components/Search";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOffers } from "@/components/AdvSection/fetchAllOffers";
import { paths } from "@/common/paths";
import WorkerAdvCard from "@/components/WorkerAdvCard/WorkerAdvCard";
import { useState } from "react";
import WorkerAdvSection from "@/components/WorkerAdvSection/WorkerAdvSection";

export default function Home() {
  const searchParams = useSearchParams();
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

  return (
    <>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setOption("employers")}
          className={
            option === "employers"
              ? "p-2 bg-primary-light rounded-full text-white"
              : ""
          }
        >
          Oferty pracodawców
        </button>
        <button
          onClick={() => setOption("workers")}
          className={
            option === "workers"
              ? "p-2 bg-primary-light rounded-full text-white"
              : ""
          }
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
