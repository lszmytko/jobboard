import { UseFormRegister } from "react-hook-form";

import { workingTime } from "./consts";
import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "../CheckBoxGroup/CheckboxField/CheckboxField";

const WorkingTime = ({ register }: { register: UseFormRegister<any> }) => {
  return (
    <CheckBoxGroup title="Wymiar pracy">
      {workingTime.values.map((value, index) => {
        return (
          <CheckboxField
            key={index}
            fieldGroup={workingTime.groupName}
            polishName={value}
            register={register}
            type="checkbox"
          />
        );
      })}
    </CheckBoxGroup>
  );
};

export default WorkingTime;
