import { UseFormRegister } from "react-hook-form";

import { experienceData } from "./consts";
import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "../CheckBoxGroup/CheckboxField/CheckboxField";
import { Inputs } from "../AddOfferForm";

const Experience = ({ register }: { register: UseFormRegister<Inputs> }) => {
  return (
    <CheckBoxGroup title="Doświadczenie">
      {experienceData.values.map((value, index) => {
        return (
          <CheckboxField
            key={index}
            fieldGroup={experienceData.groupName}
            polishName={value}
            register={register}
            type="radio"
          />
        );
      })}
    </CheckBoxGroup>
  );
};

export default Experience;
