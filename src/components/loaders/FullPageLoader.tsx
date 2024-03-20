import React from "react";
import { ThreeDots } from "react-loader-spinner";

const FullPageLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <ThreeDots
        height="120"
        width="120"
        radius="9"
        color={"#fdba74"}
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default FullPageLoader;
