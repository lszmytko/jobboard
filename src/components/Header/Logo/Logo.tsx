import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <div className="flex gap-2">
        <Image src="/vettechLogo.png" alt="logo" width="40" height="40" />
        <h1>VetPraca</h1>
      </div>
    </Link>
  );
};

export default Logo;
