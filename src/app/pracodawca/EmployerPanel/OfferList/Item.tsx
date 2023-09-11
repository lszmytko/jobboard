import React from "react";

const Item = ({
  date,
  post,
  isActive,
}: {
  date: string;
  post: string;
  isActive: boolean;
}) => {
  return (
    <div className="border-primary-light border-solid border-2 mb-2 p-2 rounded w-96">
      <h1 className="text-sm">12.01.2023</h1>
      <p className="font-bold">Technik weterynarii</p>
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
