import { UseFormRegister } from "react-hook-form";

import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "../CheckBoxGroup/CheckboxField/CheckboxField";
import { workingTime } from "../consts";
import { Inputs } from "../AddOffer";

const WorkingTime = ({ register }: { register: UseFormRegister<Inputs> }) => {
  return (
    <CheckBoxGroup title="Wymiar pracy">
      {workingTime.values.map((value, index) => {
        return (
          <CheckboxField
            key={index}
            fieldGroup={workingTime.groupName}
            polishName={value}
            register={register}
          />
        );
      })}
    </CheckBoxGroup>
  );
};

export default WorkingTime;
