import { UseFormRegister } from "react-hook-form";

import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "../CheckBoxGroup/CheckboxField/CheckboxField";
import { agreementData } from "../consts";
import { Inputs } from "../AddOffer";

const AgreementType = ({ register }: { register: UseFormRegister<Inputs> }) => {
  return (
    <CheckBoxGroup title="Rodzaj umowy">
      {agreementData.values.map((value, index) => {
        return (
          <CheckboxField
            key={index}
            fieldGroup={agreementData.groupName}
            polishName={value}
            register={register}
          />
        );
      })}
    </CheckBoxGroup>
  );
};

export default AgreementType;
