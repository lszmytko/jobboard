"use client";

import Link from "next/link";

import { paths } from "@/common/paths";

import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import { usePathname } from "next/navigation";
import { createStyles } from "@/utils/utils";

const activeClassName = "font-extrabold text-primary text-xl leading-10";

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/adminpanel")) return null;

  const styles = createStyles(pathname, activeClassName);

  return (
    <div className="flex justify-center">
      <HamburgerMenu />

      <div
        className={`flex max-sm:justify-center gap-2 w-full justify-between bg-dark-blue text-white font-semibold leading-10 mb-4 px-4 py-4 md:py-2 lg:px-44 xl:px-64 2xl:px-96`}
      >
        <div className="self-center">
          <Logo />
        </div>
        <div className="max-sm:hidden flex gap-4 py-4">
          <Link href="/" className={styles.allOffers}>
            Oferty pracy
          </Link>
          <Link className={styles.employer} href={paths.employer}>
            Dam pracę
          </Link>
          <Link className={styles.worker} href={paths.worker}>
            Szukam pracy
          </Link>
          <a
            href="https://www.vettech.pl"
            className="trainings hidden sm:block bg-primary rounded px-2"
          >
            Szkolenia
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
