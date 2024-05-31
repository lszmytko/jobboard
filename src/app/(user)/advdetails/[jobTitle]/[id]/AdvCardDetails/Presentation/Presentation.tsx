import { Offer } from "@/common/types";

import Job from "./Job";
import List from "./List";

type PresentationProps = Pick<Offer, "requirements" | "tasks" | "post">;

const Presentation = ({ requirements, tasks, post }: PresentationProps) => {
  return (
    <div className="text-sm">
      <Job post={post} />
      <List data={requirements} title="Wymagania" />
      <List data={tasks} title="Zakres obowiązków" />
    </div>
  );
};

export default Presentation;
