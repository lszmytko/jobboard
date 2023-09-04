const Detail = ({
  children,
  info,
}: {
  children: React.ReactNode;
  info: string;
}) => {
  return (
    <div className="border-2 px-3 py-1 grow">
      <div className="flex justify-center">{children}</div>
      <p className="text-center">{info}</p>
    </div>
  );
};

export default Detail;
