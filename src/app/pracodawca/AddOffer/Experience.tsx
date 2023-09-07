import CheckBoxGroup from "./CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "./CheckBoxGroup/CheckboxField/CheckboxField";
import { experienceData } from "./consts";

const Experience = ({ register }: { register: any }) => {
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
