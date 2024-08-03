import HomeTemplate from "@/app/HomeTemplate";
import { SearchOption } from "@/common/types";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { city: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const city = params.city;

  return {
    title: `Oferty pracy :: Praca w Weterynarii :: Weterynarz :: Technik - Vettech - ${city}`,
    description: `Portal pracy dla Techników Weterynarii oraz Lekarzy Weterynarii. Najnowsze oferty pracy dla weterynarzy, tylko z widełkami wynagrodzeń. - ${city}`,
    keywords: [
      "weterynaria",
      "technik weterynarii",
      "praca",
      "lekarze weterynarii",
      "praca technik weterynarii",
      "praca lekarz weterynarii",
      `praca weterynarz ${city}`,
    ],
  };
}

export default function Page({
  params,
  searchParams,
}: {
  searchParams: {
    page?: string;
    postOrCompany?: string;
    option?: SearchOption;
  };
  params: { city: string };
}) {
  const page = searchParams.page ?? "1";
  const postOrCompany = searchParams.postOrCompany ?? "";
  const option = searchParams.option ?? "pracodawcy";
  const city = params.city;

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
