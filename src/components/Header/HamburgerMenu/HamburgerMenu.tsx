"use client";

import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

import { paths } from "@/common/paths";

const HamburgerMenu = () => {
  const [extended, setExtended] = useState(false);

  const hiddenStyles = extended ? "translate-x-0" : "-translate-x-96";

  const handleClick = () => setExtended((prev) => !prev);

  return (
    <div className="">
      <div className="absolute left-2 top-5 sm:hidden">
        <GiHamburgerMenu
          size={30}
          className={`${extended ? "hidden" : ""} cursor-pointer text-white`}
          onClick={handleClick}
        />
      </div>
      <aside
        className={`sm:hidden absolute top-0 left-0 ${hiddenStyles} w-60 bg-primary-light rounded-br-lg`}
      >
        <div className="flex justify-end p-3">
          <GrClose
            size={30}
            className={`${extended ? "" : "hidden"} cursor-pointer text-orange`}
            onClick={handleClick}
          />
        </div>
        <div className="border-t-2 p-1">
          <Link href="/" className="">
            Oferty pracy
          </Link>
        </div>
        <div className="border-t-2 p-1">
          <a href="https://www.vettech.pl" className="trainings">
            Szkolenia
          </a>
        </div>
        <div className="border-y-2 p-1">
          <Link href={paths.employer}>Panel pracodawcy</Link>
        </div>
      </aside>
    </div>
  );
};

export default HamburgerMenu;
