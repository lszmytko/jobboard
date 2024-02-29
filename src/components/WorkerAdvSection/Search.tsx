import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  criterium: string;
};

const Search = ({
  setFilterCriteria,
}: {
  setFilterCriteria: Dispatch<SetStateAction<string>>;
}) => {
  const { register, handleSubmit } = useForm<FormInputs>();
  const resetCriteria = () => {
    setFilterCriteria("");
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setFilterCriteria(data.criterium);
  };
  return (
    <div className="flex justify-center">
      <div className="w-4/5 sm:w-full">
        <form
          className="mb-6 md:flex justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Wpisz miasto"
            className="w-full text-center max-sm:border-b-2 p-2 border-primary-extra-light focus:outline-none md:border-r-2 mb-2 md:mb-0"
            {...register("criterium")}
          />
          <input
            type="submit"
            value="Szukaj"
            className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
          />
        </form>
        <div className="flex justify-center">
          <button
            onClick={resetCriteria}
            className="text-white bg-primary-light hover:bg-primary focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Resetuj kryteria
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
