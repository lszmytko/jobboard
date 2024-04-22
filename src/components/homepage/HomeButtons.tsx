"use client";

import { paths } from "@/common/paths";
import { useRouter } from "next/navigation";

const baseButtonStyles = "font-extrabold sm:text-xl";
const selectedButtonStyles = "p-2 bg-primary-light rounded-full text-white";

export default function HomeButtons() {
  const router = useRouter();

  const handleOptionChange = (option: "workers" | "employers") => {
    const queryParam =
      option === "workers" ? "?option=pracownicy" : "option=pracodawcy";
    router.push(paths.job + queryParam);
  };

  console.log("rerender");
  return (
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
  );
}
