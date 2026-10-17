import { beforeEach, expect, test } from "bun:test";
import { buildTrackedUrl } from "./tracking";

class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
  clear() { this.data.clear(); }
  get length() { return this.data.size; }
  key() { return null; }
}

const BOOK = "https://book.stance.health/stance-health";

function install(pathname = "/") {
  const local = new MemoryStorage();
  const session = new MemoryStorage();
  const location = new URL(`https://www.stance.health${pathname}`);
  Object.assign(globalThis, {
    window: { location, localStorage: local, sessionStorage: session },
    localStorage: local,
    sessionStorage: session,
    document: { referrer: "" },
  });
}

function seed(data: Record<string, string>) {
  window.localStorage.setItem("stance_tracking", JSON.stringify(data));
}

function params(url: string) {
  return new URL(url, "https://www.stance.health").searchParams;
}

beforeEach(() => install("/"));

test("google ads click on a bare book link keeps cpc", () => {
  seed({
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "BD_SH_PMax_Blr",
    gclid: "gclid-1",
  });
  const q = params(buildTrackedUrl(BOOK));
  expect(q.get("utm_medium")).toBe("cpc");
  expect(q.get("utm_source")).toBe("google");
  expect(q.get("utm_campaign")).toBe("BD_SH_PMax_Blr");
  expect(q.get("gclid")).toBe("gclid-1");
  expect(q.get("utm_referer")).toBe("/");
});

test("hardcoded book-button cta is replaced when a gclid is stored", () => {
  seed({
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "BD_SH_PMax_Blr",
    gclid: "gclid-1",
  });
  const q = params(buildTrackedUrl(`${BOOK}?utm_source=website&utm_medium=cta`));
  expect(q.get("utm_medium")).toBe("cpc");
  expect(q.get("utm_source")).toBe("google");
  expect(q.get("utm_campaign")).toBe("BD_SH_PMax_Blr");
  expect(q.get("gclid")).toBe("gclid-1");
});

test("gclid wins even when storage was already overwritten to cta", () => {
  seed({ utm_source: "google", utm_medium: "cta", gclid: "gclid-1" });
  const q = params(buildTrackedUrl(`${BOOK}?utm_source=website&utm_medium=cta`));
  expect(q.get("utm_medium")).toBe("cpc");
  expect(q.get("utm_source")).toBe("google");
});

test("stored cpc without a click id still replaces a hardcoded cta", () => {
  seed({ utm_source: "google", utm_medium: "cpc", utm_campaign: "search" });
  const q = params(buildTrackedUrl(`${BOOK}?utm_source=website&utm_medium=cta`));
  expect(q.get("utm_medium")).toBe("cpc");
  expect(q.get("utm_source")).toBe("google");
  expect(q.get("utm_campaign")).toBe("search");
});

test("stored cpc on a bare book link stays cpc", () => {
  seed({ utm_source: "google", utm_medium: "cpc" });
  expect(params(buildTrackedUrl(BOOK)).get("utm_medium")).toBe("cpc");
});

test("gbraid alone turns a cta book link into cpc", () => {
  seed({ gbraid: "gb-1" });
  const q = params(buildTrackedUrl(`${BOOK}?utm_medium=cta`));
  expect(q.get("utm_medium")).toBe("cpc");
  expect(q.get("utm_source")).toBe("google");
});

test("wbraid alone on a bare book link becomes cpc and google", () => {
  seed({ wbraid: "wb-1" });
  const q = params(buildTrackedUrl(BOOK));
  expect(q.get("utm_medium")).toBe("cpc");
  expect(q.get("utm_source")).toBe("google");
  expect(q.get("wbraid")).toBe("wb-1");
});

test("a non-google stored medium replaces cta", () => {
  seed({ utm_source: "facebook", utm_medium: "paid", fbclid: "fb-1" });
  const q = params(buildTrackedUrl(`${BOOK}?utm_source=website&utm_medium=cta`));
  expect(q.get("utm_medium")).toBe("paid");
  expect(q.get("utm_source")).toBe("facebook");
});

test("a direct visit with nothing stored is tagged cta", () => {
  install("/services/knee");
  const q = params(buildTrackedUrl(BOOK));
  expect(q.get("utm_medium")).toBe("cta");
  expect(q.get("utm_source")).toBe("website");
  expect(q.get("utm_referer")).toBe("/services/knee");
  expect(q.get("gclid")).toBeNull();
});

test("a direct visit that is already tagged cta stays cta", () => {
  const q = params(buildTrackedUrl(`${BOOK}?utm_source=website&utm_medium=cta`));
  expect(q.get("utm_medium")).toBe("cta");
  expect(q.get("utm_source")).toBe("website");
});

test("app store cta is left alone", () => {
  seed({ utm_source: "google", utm_medium: "cpc", gclid: "gclid-1" });
  const href = "https://apps.apple.com/us/app/stance-health/id6757695513?utm_source=website&utm_medium=cta&utm_campaign=app_install";
  const q = params(buildTrackedUrl(href));
  expect(q.get("utm_medium")).toBe("cta");
  expect(q.get("utm_campaign")).toBe("app_install");
  expect(q.get("gclid")).toBe("gclid-1");
});

test("an internal link does not get a forced cta", () => {
  seed({ utm_source: "google", utm_medium: "cpc" });
  const q = params(buildTrackedUrl("/about"));
  expect(q.get("utm_medium")).toBe("cpc");
  expect(q.get("utm_referer")).toBeNull();
});

test("a phone link is not rewritten", () => {
  seed({ utm_medium: "cpc", gclid: "gclid-1" });
  expect(buildTrackedUrl("tel:+919999999999")).toBe("tel:+919999999999");
});
