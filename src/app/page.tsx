"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";

import AdvSection from "@/components/AdvSection";
import HomeTemplate from "./HomeTemplate";

export default function Home() {
  const pages = useRef(1);
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const city = searchParams.get("city") ?? "";
  const postOrCompany = searchParams.get("postOrCompany") ?? "";

  const params = { page, city, postOrCompany };

  return (
    <HomeTemplate pages={pages.current}>
      <AdvSection params={params} pages={pages} />
    </HomeTemplate>
  );
}
