const List = ({ data, title }: { data: string[]; title: string }) => {
  return (
    <div className="tasks mb-2">
      <h4 className="font-semibold mb-1">{title}:</h4>
      <ul className="list-disc list-inside">
        {data.map((item, key) => {
          return (
            <li key={key} className="mb-1">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
