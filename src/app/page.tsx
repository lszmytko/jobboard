import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black">
      <Image src="/images/profile.jpg" width={200} height={200} />
    </div>
  );
}
