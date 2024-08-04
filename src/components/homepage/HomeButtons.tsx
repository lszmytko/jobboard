"use client";

import { paths } from "@/common/paths";
import { useRouter, useSearchParams } from "next/navigation";

const baseButtonStyles = "font-extrabold sm:text-xl";
const selectedButtonStyles = `${baseButtonStyles} p-2 bg-primary rounded-lg text-white`;

export default function HomeButtons({
  option,
}: {
  option?: "pracownicy" | "pracodawcy" | undefined;
}) {
  const router = useRouter();

  const handleOptionChange = (option: "workers" | "employers") => {
    const queryParam =
      option === "workers" ? "?option=pracownicy" : "?option=pracodawcy";
    router.push(paths.job + queryParam);
  };

  const buttonStyles = {
    worker: option === "pracownicy" ? selectedButtonStyles : baseButtonStyles,
    employer:
      option === "pracodawcy" || option === undefined
        ? selectedButtonStyles
        : baseButtonStyles,
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => handleOptionChange("employers")}
        className={buttonStyles.employer}
      >
        Oferty pracodawców
      </button>
      <button
        onClick={() => handleOptionChange("workers")}
        className={buttonStyles.worker}
      >
        Oferty kandydatów
      </button>
    </div>
  );
}
