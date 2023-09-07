import { UseFormRegister } from "react-hook-form";

import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "../CheckBoxGroup/CheckboxField/CheckboxField";
import { experienceData } from "../consts";
import { Inputs } from "../AddOffer";

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
          />
        );
      })}
    </CheckBoxGroup>
  );
};

export default Experience;
