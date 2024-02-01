import { UseFormRegister } from "react-hook-form";

import { agreementData } from "./consts";
import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";
import CheckboxField from "../CheckBoxGroup/CheckboxField/CheckboxField";
import { Inputs } from "../AddOfferForm";

const AgreementType = ({ register }: { register: UseFormRegister<any> }) => {
  return (
    <CheckBoxGroup title="Rodzaj umowy">
      {agreementData.values.map((value, index) => {
        return (
          <CheckboxField
            key={index}
            fieldGroup={agreementData.groupName}
            polishName={value}
            register={register}
            type="checkbox"
          />
        );
      })}
    </CheckBoxGroup>
  );
};

export default AgreementType;
