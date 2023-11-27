"use client";

import { useState } from "react";
import Pagination from "@/components/Pagination";
import AdvSection from "../components/AdvSection";
import Search from "../components/Search";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOffers } from "@/components/AdvSection/fetchAllOffers";

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const city = searchParams.get("city") ?? "";
  const postOrCompany = searchParams.get("postOrCompany") ?? "";

  const params = { page, city, postOrCompany };

  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetchAllOffers"],
    queryFn: () => fetchAllOffers(true, params),
  });

  console.log("*** data", data);
  const offers = data?.data?.offers;
  const pages = data?.data.pages ?? 1;

  return (
    <>
      <Search />
      {!isError ? (
        <>
          <AdvSection offers={offers} isLoading={isLoading} />
          <Pagination pages={pages} />
        </>
      ) : null}
    </>
  );
}
