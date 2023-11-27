"use client";

import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  postOrCompany: string;
  city: string;
};

const Search = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // setSearchCriteria(data);

    const params = `?postOrCompany=${data.postOrCompany ?? ""}&city=${
      data.city ?? ""
    }&page=1`;
    router.push(params);
  };

  return (
    <>
      <div className="mt-4 flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 mb-2 md:flex w-4/5 max-w-4xl"
        >
          <div className="md:grow">
            <input
              placeholder="Nazwa stanowiska/firmy"
              {...register("postOrCompany")}
              className="w-full text-center max-sm:border-b-2 p-2 border-primary-extra-light focus:outline-none md:border-r-2"
            />
          </div>
          <div className="md:grow">
            <input
              placeholder="Miasto"
              {...register("city", { required: true })}
              className="w-full text-center max-sm:border-b-2 p-2 border-primary-extra-light mb-2 focus:outline-none"
            />
          </div>
          {errors.city && <span>This field is required</span>}
          <div>
            <input
              type="submit"
              value="Szukaj"
              className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
            />
          </div>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};

export default Search;
