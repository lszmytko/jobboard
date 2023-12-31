"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";

import { paths } from "@/common/paths";

import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import { checkIfUserIsLoggedIn } from "@/utils/utils";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const montserrat = Montserrat({ subsets: ["latin"] });

const Header = () => {
  const isUser = checkIfUserIsLoggedIn();
  const router = useRouter();
  const pathname = usePathname();

  const notify = () => toast.success("Wylogowanie zakończone sukcesem");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    router.push(paths.home);

    notify();
  };

  if (pathname.startsWith("/adminpanel")) return null;

  return (
    <div className="w-screen flex justify-center sm:mt-4">
      <HamburgerMenu />

      <div
        className={`flex max-sm:justify-center max-w-2xl w-screen justify-between bg-dark-blue text-white font-semibold leading-10 ${montserrat.className} mb-4 p-4 sm:rounded-lg`}
      >
        <div>
          <Logo />
        </div>
        <div className="max-sm:hidden flex gap-2">
          <Link href="/" className="bg-primary rounded px-2">
            Oferty pracy
          </Link>
          <Link href={paths.employer}>Panel pracodawcy</Link>
          <a
            href="https://www.vettech.pl"
            className="trainings hidden sm:block"
          >
            Szkolenia
          </a>
          {isUser && (
            <button
              className="text-white ml-6 cursor-pointer"
              onClick={handleLogout}
            >
              Wyloguj się
            </button>
          )}
        </div>
      </div>
      {isUser && (
        <button
          className=" rounded mb-4 p-4 font-semibold leading-10 text-white absolute right-0 top-0 sm:hidden cursor-pointer"
          onClick={handleLogout}
        >
          Wyloguj się
        </button>
      )}
    </div>
  );
};

export default Header;
