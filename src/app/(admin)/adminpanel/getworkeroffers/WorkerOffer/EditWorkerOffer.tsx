import React from "react";
import { editWorkerOffer } from "./editWorkerOfferFn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSingleWorkerOffer } from "@/app/(worker)/pracownik/szczegoly/[id]/fetchSingleWorkerOffer";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  WorkingTime,
  WorkerOffer,
  WorkerOfferFormInputs,
} from "@/common/types";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input/input";
import { ThreeDots } from "react-loader-spinner";
import { DevTool } from "@hookform/devtools";
import { toast } from "sonner";
import { availability as availabilityOptions } from "@/common/consts";

const workingTimeOptions = [
  "cały etat",
  "pół etatu",
  "dorywczo",
  "weekendy",
  "praca w nocy",
] as const;

const inputStyles = "block w-full p-1 mb-2";
const headingStyles = "text-center text-primary text-sm font-bold mb-1";

const EditWorkerOffer = ({ offerID }: { offerID: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["fetchSingleWorkerOffer"],
    queryFn: () => fetchSingleWorkerOffer(offerID),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  const offerDetails = data.data.offer;

  return <EditWorkerOfferFormUI data={offerDetails} />;
};

const EditWorkerOfferFormUI = ({ data }: { data: WorkerOffer }) => {
  const {
    workingTime,
    email,
    education,
    experience,
    city,
    offerText,
    _id,
    availability,
    phoneNumber,
  } = data;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WorkerOfferFormInputs>({
    defaultValues: {
      workingTime: workingTime.map((item) => ({ name: item })),
      email,
      education,
      experience,
      city,
      offerText,
      availability,
      phoneNumber,
    },
  });

  const router = useRouter();

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: editWorkerOffer,
    onSuccess: () => {
      router.push("/adminpanel/getworkeroffers");
      toast.success("Pomyślnie edytowano ogłoszenie!");
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "workingTime",
    rules: { required: true },
  });

  const onSubmit: SubmitHandler<WorkerOfferFormInputs> = async (data) => {
    const parsedWorkingTime = data.workingTime
      .filter((item) => item.name)
      .map((item) => item.name);

    try {
      await mutateAsync({
        ...data,
        workingTime: parsedWorkingTime,
        _id,
      });
    } catch (error) {}
  };

  return (
    <div className="mb-1 p-2">
      <h1 className="mb-2 text-lg font-bold text-center">
        Wypełnij formularz by edytować ogłoszenie.
      </h1>
      {Object.values(errors).length > 0 && (
        <p className="text-center text-red-600 text-sm font-bold">
          Popraw dane w formularzu!
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className={headingStyles}>Twój email</h1>
          <input
            {...register("email")}
            placeholder="Email"
            className={inputStyles}
          />
        </div>
        <div>
          <h1 className={headingStyles}>Miasto</h1>
          <input
            {...register("city")}
            placeholder="Miasto"
            className={inputStyles}
          />
        </div>
        <div>
          <h1 className={headingStyles}>Twój numer telefonu</h1>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country="PL"
                value={value}
                onChange={onChange}
                placeholder="Numer telefonu"
                className={inputStyles}
              />
            )}
          />
        </div>
        <div>
          <h1 className={headingStyles}>Twoje Wykształcenie</h1>
          <textarea
            {...register("education")}
            maxLength={300}
            rows={3}
            placeholder="Wykształcenie"
            className={inputStyles}
          />
        </div>
        <div>
          <h1 className={headingStyles}>Twoje Doświadczenie</h1>
          <textarea
            {...register("experience")}
            maxLength={300}
            rows={3}
            className={inputStyles}
          />
        </div>
        <div className="mb-4">
          <h1 className={headingStyles}>Wymiar pracy</h1>
          <div className="flex gap-2">
            {workingTimeOptions.map((option, index) => (
              <div key={option}>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="text-center"
                    {...register(`workingTime.${index}.name`)}
                    value={option}
                    defaultChecked={fields.some(
                      (field) => field.name === option
                    )}
                  />
                </div>
                <label className="block text-sm text-center">{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className={headingStyles}>Dostępność</h1>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-dark-blue text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("availability", { required: true })}
          >
            <option value="">Wybierz dostępność</option>
            {availabilityOptions.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h1 className={headingStyles}>Opis ogłoszenia</h1>
          <textarea
            maxLength={500}
            rows={5}
            className="block w-full p-1 mb-4"
            {...register("offerText", { required: true })}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <ThreeDots
              height="40"
              width="100"
              radius="9"
              color={"#4fa94d"}
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <input
            type="submit"
            value="Dodaj"
            className="w-full text-center rounded py-2 px-4 bg-primary-light cursor-pointer"
            disabled={!isValid}
          />
        )}
        {isError && (
          <p className="text-center text-red-600 text-sm font-bold">
            Coś poszło nie tak...
          </p>
        )}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default EditWorkerOffer;
