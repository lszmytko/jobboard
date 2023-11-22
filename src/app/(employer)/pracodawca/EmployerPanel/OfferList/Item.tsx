import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { paths } from "@/common/paths";

const Item = ({
  date,
  post,
  isActive,
  id,
}: {
  date: string;
  post: string;
  isActive: boolean;
  id: string;
}) => {
  const parsedDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");

  const editLink = `${paths.editOffer}/${id}`;

  return (
    <div className="border-primary-extra mb-4 p-2 rounded w-96 max-w-screen-md md:w-full bg-primary-extra-light shadow-2xl">
      <div className="flex justify-between">
        <h1 className="text-sm mb-1">Data dodania: {parsedDate}</h1>
        <Link href={editLink} className="cursor-pointer text-sm">
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
