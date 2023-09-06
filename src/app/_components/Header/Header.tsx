import { Montserrat } from "next/font/google";
import Link from "next/link";

import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";

const montserrat = Montserrat({ subsets: ["latin"] });

const Header = () => {
  return (
    <div className="w-screen flex justify-center">
      <HamburgerMenu />
      <div
        className={`flex max-sm:justify-center max-w-2xl w-screen justify-between bg-header-background text-white font-semibold leading-10 ${montserrat.className} mb-4 p-4 sm:rounded-lg`}
      >
        <div>
          <Logo />
        </div>
        <div className="max-sm:hidden flex gap-2">
          <Link href="/" className="bg-primary rounded px-2">
            Praca
          </Link>
          <a href="www.vettech.pl" className="trainings hidden sm:block">
            Szkolenia
          </a>
          <Link href="/login/employee">Dla pracodawcy</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
