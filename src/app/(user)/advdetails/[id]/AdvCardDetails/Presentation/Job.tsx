const Job = ({ post }: { post: string }) => {
  return (
    <div className="font-semibold mb-2 text-base">
      <p>
        Stanowisko: <span className="font-normal">{post}</span>
      </p>
    </div>
  );
};

export default Job;
