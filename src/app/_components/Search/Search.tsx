"use client";

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
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch("company")); // watch input value by passing the name of it
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="mt-4 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 mb-2 md:flex w-4/5 max-w-4xl"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="md:grow">
          <input
            placeholder="Nazwa stanowiska/firmy"
            {...register("postOrCompany")}
            className="w-full text-center border-b-2 p-2 border-primary-extra-light focus:outline-none md:border-r-2"
          />
        </div>
        {/* include validation with required or other standard HTML validation rules */}
        <div className="md:grow">
          <input
            placeholder="Miasto"
            {...register("city", { required: true })}
            className="w-full text-center border-b-2 p-2 border-primary-extra-light mb-2 focus:outline-none"
          />
        </div>
        {/* errors will return when field validation fails  */}
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
  );
};

export default Search;
