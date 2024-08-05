import { apiRoutes, paths } from "@/common/paths";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}${paths.getAllOffers}`
  );

  const { offers } = await response.json();

  const offersEntries = offers.map(({ _id }: { _id: string }) => {
    return {
      url: `https://vetpraca.vettech.pl/advdetails/${_id}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    };
  });

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getAllWorkerOffers}?isActive=true&page=1`;

  const workerResponse = await fetch(url);

  const { offers: workerOffers } = await workerResponse.json();

  const workerOffersEntries = workerOffers.map(({ id }: { id: string }) => {
    return {
      url: `https://vetpraca.vettech.pl/pracownik/${id}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    };
  });

  return [
    {
      url: "https://vetpraca.vettech.pl",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://vetpraca.vettech.pl/pracodawca",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/pracownik",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/warszawa",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/kraków",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/łódź",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/wrocław",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/poznań",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/gdańsk",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/bydgoszcz",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/lublin",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://vetpraca.vettech.pl/praca/katowice",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...offersEntries,
    ...workerOffersEntries,
  ];
}
