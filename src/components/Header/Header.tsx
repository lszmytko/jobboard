"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";

import { paths } from "@/common/paths";

import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/adminpanel")) return null;

  return (
    <div className="w-screen flex justify-center sm:mt-4">
      <HamburgerMenu />

      <div
        className={`flex max-sm:justify-center gap-2 max-w-3xl w-screen justify-between bg-dark-blue text-white font-semibold leading-10 ${montserrat.className} mb-4 p-4 sm:rounded-lg`}
      >
        <div>
          <Logo />
        </div>
        <div className="max-sm:hidden flex gap-2">
          <Link href="/" className="bg-primary rounded px-2">
            Oferty pracy
          </Link>
          <Link href={paths.employer}>Dam pracę</Link>
          <Link href={paths.worker}>Szukam pracy</Link>
          <a
            href="https://www.vettech.pl"
            className="trainings hidden sm:block"
          >
            Szkolenia
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
