import Link from "next/link";
import React from "react";

const UserCard = ({
  email,
  userID,
  company,
  isActive,
}: {
  email: string;
  userID: string;
  company: string;
  isActive: boolean;
}) => {
  return (
    <Link href={`/adminpanel/manageusers/${userID}`}>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4">
        <p>Email: {email}</p>
        <p>ID: {userID}</p>
        <p>Nazwa firmy: {company ?? "brak"}</p>
        <p>Czy aktywny? {isActive ?? "Nieaktywny"}</p>
      </div>
    </Link>
  );
};

export default UserCard;
