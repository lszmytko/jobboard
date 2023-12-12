"use client";

import { usePathname } from "next/navigation";
import { fetchSingleUser } from "../fetchSingleUser";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { User } from "@/common/types";
import EditUserField from "./EditUserField";
import { DevTool } from "@hookform/devtools";

const EditUser = () => {
  const pathname = usePathname();

  const userID = pathname.split("/").pop();

  const { isLoading, data, isError, remove } = useQuery({
    queryKey: ["fetchSingleUser"],
    queryFn: () => fetchSingleUser(userID),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <EditUserUI data={data.data.user} />;
};

const EditUserUI = ({ data }: { data: User }) => {
  const {
    id,
    email,
    password,
    companyName,
    city,
    street,
    phoneNumber,
    flatNumber,
  } = data;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id,
      email,
      password,
      companyName,
      city,
      street,
      phoneNumber,
      flatNumber,
    },
  });

  return (
    <>
      <form>
        <EditUserField
          register={register}
          title="ID uzytkownika"
          fieldName="name"
        />
        <EditUserField register={register} title="Email" fieldName="email" />
        <EditUserField
          register={register}
          title="Nazwa firmy"
          fieldName="companyName"
        />
        <EditUserField
          register={register}
          title="Miasto"
          fieldName="companyName"
        />
        <EditUserField register={register} title="Ulica" fieldName="street" />
        <EditUserField
          register={register}
          title="Numer mieszkania"
          fieldName="flatNumber"
        />
        <EditUserField
          register={register}
          title="Numer telefonu"
          fieldName="phoneNumber"
        />
        <input
          type="submit"
          value="Uaktualnij"
          className="bg-primary-light text-white rounded-lg p-2"
        />
      </form>
      <DevTool control={control} />
    </>
  );
};

export default EditUser;
