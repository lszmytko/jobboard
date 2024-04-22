"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { paths } from "@/common/paths";
import WorkerAdvSection from "@/components/WorkerAdvSection/WorkerAdvSection";
import Pagination from "@/components/Pagination";
import AdvSection from "@/components/AdvSection";

import Search from "../components/Search";

const baseButtonStyles = "font-extrabold sm:text-xl";
const selectedButtonStyles = "p-2 bg-primary-light rounded-full text-white";

export default function HomeTemplate() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const city = searchParams.get("city") ?? "";
  const postOrCompany = searchParams.get("postOrCompany") ?? "";

  const params = { page, city, postOrCompany };
  const router = useRouter();

  const handleOptionChange = (option: "workers" | "employers") => {
    const queryParam =
      option === "workers" ? "?option=pracownicy" : "?option=pracodawcy";
    router.push(paths.job + queryParam);
  };

  const option = searchParams.get("option") ?? "pracodawcy";

  return (
    <>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleOptionChange("employers")}
          className={`${
            option === "pracodawcy" ? selectedButtonStyles : ""
          } ${baseButtonStyles}
          `}
        >
          Oferty pracodawców
        </button>
        <button
          onClick={() => handleOptionChange("workers")}
          className={`${
            option === "pracownicy" ? selectedButtonStyles : ""
          } ${baseButtonStyles}
          `}
        >
          Oferty kandydatów
        </button>
      </div>
      {option === "pracodawcy" && (
        <>
          <Search />
          <>
            <AdvSection params={params} page={page} />
            <Pagination />
          </>
        </>
      )}
      {option === "pracownicy" && <WorkerAdvSection />}
    </>
  );
}
