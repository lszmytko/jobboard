"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { paths } from "@/common/paths";
import WorkerAdvSection from "@/components/WorkerAdvSection/WorkerAdvSection";
import Pagination from "@/components/Pagination";
import AdvSection from "@/components/AdvSection";

import Search from "../components/Search";

const baseButtonStyles = "font-extrabold sm:text-xl";
const selectedButtonStyles = "p-2 bg-primary-light rounded-full text-white";

export default function HomeTemplate() {
  const [pages, setPages] = useState(1);
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const city = searchParams.get("city") ?? "";
  const postOrCompany = searchParams.get("postOrCompany") ?? "";

  const params = { page, city, postOrCompany };
  const router = useRouter();

  const [option, setOption] = useState<"workers" | "employers">("employers");

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
          <Search />
          <>
            <AdvSection params={params} setPages={setPages} page={page} />
            <Pagination pages={pages} />
          </>
        </>
      )}
      {option === "workers" && <WorkerAdvSection />}
    </>
  );
}
