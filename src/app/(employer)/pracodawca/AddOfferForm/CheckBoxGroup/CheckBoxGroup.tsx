const CheckBoxGroup = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="mb-4 bg-white pt-2">
      <h2 className="mb-4 text-primary font-semibold text-center">{title}</h2>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default CheckBoxGroup;
