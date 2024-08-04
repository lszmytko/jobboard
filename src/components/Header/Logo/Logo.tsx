import { paths } from "@/common/paths";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../../../public/vettechLogo.png";

const Logo = () => {
  return (
    <Link href={paths.job} className="cursor-pointer">
      <div>
        <Image
          src={LogoImage}
          alt="logo - oferty pracy w weterynarii"
          className="w-32 md:w-44"
        />
      </div>
    </Link>
  );
};

export default Logo;
