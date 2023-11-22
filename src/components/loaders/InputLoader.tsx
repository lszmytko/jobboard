import { ThreeDots } from "react-loader-spinner";

const InputLoader = () => {
  return (
    <div className="flex justify-center">
      <ThreeDots
        height="40"
        width="40"
        radius="9"
        color={"#4fa94d"}
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default InputLoader;
