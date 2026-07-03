import path from "path";
import { promises as fs } from "fs";
import type { BlogSection } from "./blogs";

export type { BlogSection };

export type ConditionFaq = { q: string; a: string };

export type ConditionPage = {
  slug: string;
  title: string;
  bodyRegion: string;
  summary: string;
  heroHeadline: string;
  symptoms: string[];
  causes: string[];
  stanceApproach: string;
  relatedServices: string[];
  relatedResources: string[];
  faqs: ConditionFaq[];
  locations: string[];
  seo: { title: string; description: string; canonical: string };
  lastModified: string;
};

export type LocationPage = {
  slug: string;
  name: string;
  type: "centre" | "neighbourhood";
  nearestCentre: string;
  address: string;
  phone: string;
  mapUrl: string;
  commonConditions: string[];
  seo: { title: string; description: string };
  lastModified: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  summary: string;
  heroHeadline: string;
  whoItsFor: string;
  approach: string;
  features: string[];
  relatedConditions: string[];
  seo: { title: string; description: string };
  lastModified: string;
};

export type ResourcePage = {
  slug: string;
  title: string;
  summary: string;
  bodyRegion: string;
  condition: string;
  service: string;
  contentFormat: string;
  funnelStage: "awareness" | "consideration" | "conversion";
  clinicalReviewStatus: "draft" | "reviewed" | "approved";
  primaryCTA: string;
  publishedAt: string;
  sections: BlogSection[];
  seo: { title: string; description: string };
};

let _conditionsCache: ConditionPage[] | null = null;
let _locationsCache: LocationPage[] | null = null;
let _servicesCache: ServicePage[] | null = null;
let _resourcesCache: ResourcePage[] | null = null;

async function loadJson<T>(filename: string): Promise<T[]> {
  const filePath = path.join(process.cwd(), "public", "data", filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

export async function getAllConditions(): Promise<ConditionPage[]> {
  if (_conditionsCache) return _conditionsCache;
  _conditionsCache = await loadJson<ConditionPage>("conditions.json");
  return _conditionsCache;
}

export async function getConditionBySlug(slug: string): Promise<ConditionPage | null> {
  const all = await getAllConditions();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getAllLocations(): Promise<LocationPage[]> {
  if (_locationsCache) return _locationsCache;
  _locationsCache = await loadJson<LocationPage>("locations.json");
  return _locationsCache;
}

export async function getLocationBySlug(slug: string): Promise<LocationPage | null> {
  const all = await getAllLocations();
  return all.find((l) => l.slug === slug) ?? null;
}

export async function getAllServices(): Promise<ServicePage[]> {
  if (_servicesCache) return _servicesCache;
  _servicesCache = await loadJson<ServicePage>("services.json");
  return _servicesCache;
}

export async function getServiceBySlug(slug: string): Promise<ServicePage | null> {
  const all = await getAllServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getAllResources(): Promise<ResourcePage[]> {
  if (_resourcesCache) return _resourcesCache;
  _resourcesCache = await loadJson<ResourcePage>("resources.json");
  return _resourcesCache;
}

export async function getResourceBySlug(slug: string): Promise<ResourcePage | null> {
  const all = await getAllResources();
  return all.find((r) => r.slug === slug) ?? null;
}
