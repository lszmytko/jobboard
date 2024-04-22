"use client";

import { paths } from "@/common/paths";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type SearchInputs = {
  postOrCompany: string;
  city: string;
};

const Search = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SearchInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    let params = "?page=1";
    if (data.postOrCompany)
      params = params + `&postOrCompany=${data.postOrCompany}`;
    if (data.city) params = params + `&city=${data.city}`;

    const url = paths.job + params;
    router.push(url);
  };

  const resetCriteria = () => {
    router.push(paths.job);
    reset();
  };

  return (
    <>
      <div className="mt-6 flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-3 mb-6 md:flex w-4/5 max-w-4xl"
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
              {...register("city")}
              className="w-full text-center max-sm:border-b-2 p-2 border-primary-extra-light mb-2 sm:mb-0 focus:outline-none"
            />
          </div>
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
      <div className="flex justify-center">
        <button
          onClick={resetCriteria}
          className="text-white bg-primary-light hover:bg-primary focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Resetuj kryteria
        </button>
      </div>
    </>
  );
};

export default Search;
