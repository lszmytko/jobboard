import Image from "next/image";
import React from "react";

const START_COURSE_DATE = new Date("April 15, 2024 10:00:00");

const CurrentCourse = () => {
  const currentDate = new Date();

  if (currentDate > START_COURSE_DATE) return null;

  return (
    <div className="mb-4 w-full cursor-pointer relative flex justify-center">
      <a
        href="https://www.vettech.pl/usg-krok-po-kroku-modul-1"
        className="relative"
      >
        <Image
          src="/currentCourse.png"
          alt="Kurs anastezjologia"
          width={672}
          height={300}
        />
      </a>
    </div>
  );
};

export default CurrentCourse;
