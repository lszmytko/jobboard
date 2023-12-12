"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserByEmail } from "../fetchUserByMail";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import { paths } from "@/common/paths";
import UserCard from "./UserCard";

const ManageUsers = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  const page = searchParams.get("page") ?? "1";

  const { isLoading, data, isError, remove, refetch } = useQuery({
    queryKey: ["fetchAllOffers"],
    queryFn: () => fetchUserByEmail(email, page),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    refetch();
  };

  const pages = data?.data.pages ?? 1;

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 py-2 rounded-lg text-sm focus:outline-none mr-4"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 rounded-lg bg-primary-light text-white cursor-pointer transition-all hover:bg-primary-dark"
            type="submit"
            value="Znajdź uytkownika"
          />
        </form>
      </div>
      <section className="mt-6 flex justify-center">
        <div>
          <h1 className="text-center">Uytkownicy:</h1>
          <div>
            {data?.data.users.map((user) => {
              const { email, _id: userID, company, isActive } = user;
              return (
                <UserCard
                  key={userID}
                  {...{ email, userID, company, isActive }}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Pagination pages={pages} remove={remove} path={paths.adminManageUsers} />
    </div>
  );
};

export default ManageUsers;
