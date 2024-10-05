import WorkerAdvCardDetails from "./WorkerAdvCardDetails";

const Page = () => {
  return (
    <div className="w-full flex justify-center p-2 min-h-screen items-start">
      <WorkerAdvCardDetails />
    </div>
  );
};

export default Page;

export const revalidate = 600;
