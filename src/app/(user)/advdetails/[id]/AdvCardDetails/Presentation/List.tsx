const List = ({ data, title }: { data: string[]; title: string }) => {
  return (
    <div className="tasks mb-2">
      <h4 className="font-semibold">{title}:</h4>
      <ul className="list-disc list-inside">
        {data.map((item, key) => {
          return <li key={key}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default List;
