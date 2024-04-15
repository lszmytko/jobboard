import Image from "next/image";
import React from "react";

const CurrentCourse = () => {
  return (
    <div className="mb-4 w-full cursor-pointer relative flex justify-center">
      <a href="https://www.vettech.pl" className="relative">
        <Image
          src="/currentCourse.png"
          alt="Kursy weterynaria"
          width={672}
          height={300}
        />
      </a>
    </div>
  );
};

export default CurrentCourse;
