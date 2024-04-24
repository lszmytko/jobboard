"use client";

import { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";

import { paths } from "@/common/paths";
import { createStyles } from "@/utils/utils";

const activePageStyles = "font-extrabold text-orange-200";
const linkStyles = `border-t-2 border-light-blue p-1 text-white`;

const HamburgerMenu = () => {
  const [extended, setExtended] = useState(false);
  const pathname = usePathname();

  const styles = createStyles(pathname, activePageStyles);
  const workerLinkStyles = linkStyles + " " + styles.worker;
  const allOffersLinkStyles = linkStyles + " " + styles.allOffers;
  const employerLinkStyles = linkStyles + " " + styles.employer;

  const hiddenStyles = extended ? "translate-x-0" : "-translate-x-96";

  const handleClick = () => setExtended((prev) => !prev);

  return (
    <div>
      <div className="absolute left-2 top-5 sm:hidden">
        <GiHamburgerMenu
          size={30}
          className={`${extended ? "hidden" : ""} cursor-pointer text-white `}
          onClick={handleClick}
        />
      </div>
      <aside
        className={`sm:hidden absolute top-0 left-0 ${hiddenStyles} w-60 bg-dark-blue rounded-br-lg`}
      >
        <div className="flex justify-end p-3">
          <AiOutlineClose
            size={30}
            className={`${extended ? "" : "hidden"} cursor-pointer `}
            onClick={handleClick}
            color="white"
          />
        </div>
        <Link href="/" className="">
          <div className={allOffersLinkStyles}>Oferty pracy</div>
        </Link>
        <Link href={paths.employer}>
          <div className={employerLinkStyles}>Dam pracę</div>
        </Link>
        <Link href={paths.worker}>
          <div className={workerLinkStyles}>Szukam pracy</div>
        </Link>
        <a href="https://www.vettech.pl" className="trainings">
          <div className={`${linkStyles} bg-primary-light font-extrabold`}>
            Szkolenia
          </div>
        </a>
      </aside>
    </div>
  );
};

export default HamburgerMenu;
