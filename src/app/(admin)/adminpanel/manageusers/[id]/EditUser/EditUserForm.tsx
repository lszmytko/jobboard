"use client";

import { usePathname } from "next/navigation";
import { fetchSingleUser } from "../fetchSingleUser";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "@/common/types";
import EditUserField from "./EditUserField";
import { DevTool } from "@hookform/devtools";
import { editUser } from "./editUser";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

type FormInputs = {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  city: string;
  street: string;
  phoneNumber: string;
  flatNumber: string;
};

const EditUser = () => {
  const pathname = usePathname();

  const userID = pathname.split("/").pop();

  const { isLoading, data, isError, remove } = useQuery({
    queryKey: ["fetchSingleUser"],
    queryFn: () => fetchSingleUser(userID),
  });

  const { mutateAsync } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      toast.success("Uzytkownik zaktualizowany");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <EditUserUI data={data.data.user} mutateAsync={mutateAsync} />;
};

const EditUserUI = ({
  data,
  mutateAsync,
}: {
  data: User;
  mutateAsync: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    unknown,
    any,
    unknown
  >;
}) => {
  console.log("*** user data", data);
  const {
    _id,
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
      _id,
      email,
      password,
      companyName,
      city,
      street,
      phoneNumber,
      flatNumber,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => mutateAsync(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditUserField
          register={register}
          title="ID uzytkownika"
          fieldName="_id"
          readOnly={true}
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
        <div className="flex justify-center">
          <input
            type="submit"
            value="Uaktualnij"
            className="bg-primary-light text-white rounded-lg p-2"
          />
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default EditUser;
