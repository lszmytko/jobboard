import React from "react";

const EditUserField = ({
  register,
  title,
  fieldName,
}: {
  register: any;
  title: string;
  fieldName: string;
}) => {
  return (
    <div className="mb-4 w-4/5">
      <div className="mb-2 text-primary-dark text-center">
        <h1>{title}</h1>
      </div>
      <div className="flex justify-center">
        <input
          placeholder={fieldName}
          {...register(fieldName)}
          className="p-1 w-80"
        />
      </div>
    </div>
  );
};

export default EditUserField;
