"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";

import { paths } from "@/common/paths";
import WorkerAdvSection from "@/components/WorkerAdvSection/WorkerAdvSection";
import Pagination from "@/components/Pagination";
import SmallLoader from "@/components/loaders/SmallLoader";

import Search from "../components/Search";

const baseButtonStyles = "font-extrabold sm:text-xl";
const selectedButtonStyles = "p-2 bg-primary-light rounded-full text-white";

export default function HomeTemplate({
  children,
  pages,
}: {
  children: React.ReactNode;
  pages: number;
}) {
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
            <Suspense
              fallback={
                <div className="flex justify-center mt-4">
                  <SmallLoader />
                </div>
              }
            >
              {children}
            </Suspense>
            <Pagination pages={pages} />
          </>
        </>
      )}
      {option === "workers" && <WorkerAdvSection />}
    </>
  );
}
