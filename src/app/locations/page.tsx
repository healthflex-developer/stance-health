import LocationsContent from "./LocationsContent";
import { getAllLocations } from "@/lib/seo-pages";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("locations", {
  title: "Our Centres & Locations",
  description:
    "Find your nearest Stance Health centre in Bangalore — HSR Layout, Indiranagar, Whitefield. Advanced physiotherapy and sports rehab across the city.",
  alternates: { canonical: "/locations" },
});

export default async function LocationsHubPage() {
  const locations = await getAllLocations();
  const centres = locations.filter((location) => location.type === "centre");
  const neighbourhoods = locations.filter((location) => location.type === "neighbourhood");

  return <LocationsContent centres={centres} neighbourhoods={neighbourhoods} />;
}
