import { UseFormRegister } from "react-hook-form";

import { Inputs } from "../../AddOfferForm";

const CheckboxField = ({
  register,
  polishName,
  fieldGroup,
}: {
  register: UseFormRegister<Inputs>;
  polishName: string;
  fieldGroup: keyof Inputs;
}) => {
  return (
    <label className="inline-block mr-4 text-sm sm:text-base">
      <span className="inline-block mr-1">{polishName}</span>
      <input
        type="checkbox"
        value={polishName}
        id={polishName}
        {...register(fieldGroup, { required: true })}
      />
    </label>
  );
};

export default CheckboxField;