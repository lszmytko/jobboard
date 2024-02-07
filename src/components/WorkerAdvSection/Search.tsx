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
    <div className="mb-4">
      <form
        className="mb-6 mt-4 md:flex justify-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Wpisz miasto"
          className="w-full text-center max-sm:border-b-2 p-2 border-primary-extra-light focus:outline-none md:border-r-2"
          {...register("criterium")}
        />
        <input
          type="submit"
          value="Wyszukaj"
          className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
        />
      </form>
      <div className="flex justify-center">
        <button
          onClick={resetCriteria}
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Resetuj kryteria
        </button>
      </div>
    </div>
  );
};

export default Search;
