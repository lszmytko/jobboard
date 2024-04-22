import { Suspense } from "react";
import HomeTemplate from "../HomeTemplate";
import SmallLoader from "@/components/loaders/SmallLoader";

export default function Page() {
  return (
    <>
      <Suspense>
        <HomeTemplate />;
      </Suspense>
    </>
  );
}
