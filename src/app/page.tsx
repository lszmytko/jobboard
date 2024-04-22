"use client";

import { useRouter } from "next/navigation";

import { paths } from "@/common/paths";
import Pagination from "@/components/Pagination";

import Search from "../components/Search";
import HomeAds from "../components/homepage/HomeAds";
import { Suspense } from "react";
import SmallLoader from "@/components/loaders/SmallLoader";

const baseButtonStyles = "font-extrabold sm:text-xl";
const selectedButtonStyles = "p-2 bg-primary-light rounded-full text-white";

export default function HomeTemplate() {
  const router = useRouter();

  const handleOptionChange = (option: "workers" | "employers") => {
    const queryParam =
      option === "workers" ? "?option=pracownicy" : "option=pracodawcy";
    router.push(paths.job + queryParam);
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleOptionChange("employers")}
          className={`${selectedButtonStyles} ${baseButtonStyles}
          `}
        >
          Oferty pracodawców
        </button>
        <button
          onClick={() => handleOptionChange("workers")}
          className={`${baseButtonStyles}`}
        >
          Oferty kandydatów
        </button>
      </div>
      <Search />
      <>
        <HomeAds />
        <Suspense fallback={<SmallLoader />}>
          <Pagination />
        </Suspense>
      </>
    </>
  );
}
