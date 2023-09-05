const Detail = ({
  children,
  info,
  isLast,
}: {
  children: React.ReactNode;
  info: string;
  isLast?: boolean;
}) => {
  const border = !isLast
    ? "border-b-2 sm:border-b-0 border-r-0 sm:border-r-2"
    : "";

  return (
    <div className={`${border} px-3 py-1 grow`}>
      <div className="flex justify-center">{children}</div>
      <p className="text-center">{info}</p>
    </div>
  );
};

export default Detail;
