import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

const Item = ({
  date,
  post,
  isActive,
}: {
  date: string;
  post: string;
  isActive: boolean;
}) => {
  const parsedDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  return (
    <div className="border-primary-light border-solid border-2 mb-2 p-2 rounded w-96 max-w-screen-md md:w-full ">
      <div className="flex justify-between">
        <h1 className="text-sm mb-1">Data dodania: {parsedDate}</h1>
        <Link href="/edit" className="cursor-pointer text-sm">
          Edytuj
        </Link>
      </div>
      <p className="font-bold text-sm mb-1">Stanowisko: {post}</p>
      {isActive ? (
        <p className="text-green-400 text-sm text-right font-semibold">
          Aktywne
        </p>
      ) : (
        <p className="text-red-400 text-sm text-right font-semibold">
          Nieaktywne
        </p>
      )}
    </div>
  );
};

export default Item;
