import { UseFormRegister } from "react-hook-form";

import { workingTime } from "./consts";
import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "../CheckBoxGroup/CheckboxField/CheckboxField";
import { Inputs } from "../AddOfferForm";

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
