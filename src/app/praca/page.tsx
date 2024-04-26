import { Suspense } from "react";
import HomeTemplate from "../HomeTemplate";
import SmallLoader from "@/components/loaders/SmallLoader";
import { SearchOption } from "@/common/types";

export default function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    city?: string;
    postOrCompany?: string;
    option?: SearchOption;
  };
}) {
  const page = searchParams.page ?? "1";
  const city = searchParams.city ?? "";
  const postOrCompany = searchParams.postOrCompany ?? "";
  const option = searchParams.option ?? "pracodawcy";

  return (
    <>
      <HomeTemplate
        page={page}
        city={city}
        postOrCompany={postOrCompany}
        option={option}
      />
    </>
  );
}
