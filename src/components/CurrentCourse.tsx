import Image from "next/image";
import React from "react";

const START_COURSE_DATE = new Date("March 17, 2024 11:00:00");

const CurrentCourse = () => {
  const currentDate = new Date();

  if (currentDate > START_COURSE_DATE) return null;

  return (
    <div className="mb-4 w-full cursor-pointer relative flex justify-center">
      <a href="https://www.vettech.pl">
        <Image
          src="/currentCourse.png"
          alt="Kurs anastezjologia"
          width={400}
          height={333}
        />
      </a>
    </div>
  );
};

export default CurrentCourse;
