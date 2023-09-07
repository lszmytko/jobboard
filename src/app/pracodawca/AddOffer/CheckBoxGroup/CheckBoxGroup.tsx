const CheckBoxGroup = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="mb-2">
      <h1 className="mb-1">{title}</h1>
      {children}
    </div>
  );
};

export default CheckBoxGroup;
