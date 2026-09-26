import ConditionsContent from "./ConditionsContent";
import { getAllConditions } from "@/lib/seo-pages";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("conditions", {
  title: "Conditions We Treat",
  description:
    "Every condition has a root cause. We use objective assessment, clinical expertise and measurable data to understand it, then build a programme around your specific needs and goals.",
  alternates: { canonical: "/conditions" },
});

export default async function ConditionsHubPage() {
  const conditions = await getAllConditions();
  return <ConditionsContent conditions={conditions} />;
}
