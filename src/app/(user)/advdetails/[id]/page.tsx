import AdvCardDetails from "./AdvCardDetails";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-screen flex justify-center p-2 min-h-screen">
      <div className="flex-start">
        <AdvCardDetails id={params.id} />
      </div>
    </div>
  );
};

export default Page;

export const revalidate = 600;
