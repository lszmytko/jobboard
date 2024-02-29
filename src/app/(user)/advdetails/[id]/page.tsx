import AdvCardDetails from "./AdvCardDetails";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-screen flex justify-center p-2">
      <AdvCardDetails id={params.id} />
    </div>
  );
};

export default Page;
