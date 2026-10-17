import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LocationsSections } from "@/components/sections/LocationsSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import { getAllLocations } from "@/lib/seo-pages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("locations", {
    title: "Our Centres & Locations",
    description:
      "Find your nearest Stance Health centre in Bangalore — HSR Layout, Indiranagar, Whitefield. Advanced physiotherapy and sports rehab across the city.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default async function LocationsHubPage() {
  const locations = await getAllLocations();
  const centres = locations
    .filter((location) => location.type === "centre")
    .map((location) => ({
      slug: location.slug,
      name: location.name,
      address: location.address,
      phone: location.phone,
      mapUrl: location.mapUrl,
    }));
  const neighbourhoods = locations
    .filter((location) => location.type === "neighbourhood")
    .map((location) => ({
      slug: location.slug,
      name: location.name,
      nearestCentre: location.nearestCentre,
    }));

  return (
    <PublishedPage slug="locations">
      <Navbar />
      <LocationsSections centres={centres} neighbourhoods={neighbourhoods} />
      <Footer />
    </PublishedPage>
  );
}
