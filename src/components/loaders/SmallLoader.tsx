import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SmallLoader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color={"#fdba74"}
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
}
