import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CustomAssessmentEnrollment } from "../src/components/sections/custom/CustomAssessmentEnrollment";
import { isCustomSectionType } from "../src/lib/custom-sections";
import { isHardcodedSiteSlug, slugFromPathname } from "../src/lib/site-routes";

function render(props?: Record<string, unknown>, audience: "player" | "academy" = "player") {
  return renderToStaticMarkup(
    <CustomAssessmentEnrollment props={props} initialAudience={audience} />,
  );
}

describe("custom assessment enrollment", () => {
  test("renders the player form and six benefit cards", () => {
    const html = render({
      heading: "Let's Get Your Athletes Assessed",
      playerLabel: "I'm a player",
      academyLabel: "I run an academy",
      submitLabel: "Enroll now",
      locations: [{ label: "Indiranagar" }],
    });
    expect(html).toContain("Athletes Assessed");
    expect(html).toContain("Individual performance report");
    expect(html).toContain("Works with your coach");
    expect(html).toContain("Player full name");
    expect(html).toContain("Mobile number (parent or player)");
    expect(html).toContain("Your academy");
    expect(html).toContain("Indiranagar");
    expect(html).toContain("Enroll now");
    expect(html).toContain("Privacy policy.");
    expect(html).toContain('aria-pressed="true"');
    expect(html).not.toContain("Number of athletes");
    expect(html).toContain("lg:grid-cols-2");
    expect(html).toContain("grid-cols-1");
    expect(html).toContain("overflow-x-hidden");
    expect(html.indexOf("Athletes Assessed")).toBeLessThan(html.indexOf("Enroll now"));
  });

  test("renders the academy form when that mode is selected", () => {
    const html = render(undefined, "academy");
    expect(html).toContain("Academy name");
    expect(html).toContain("Sport(s) coached");
    expect(html).toContain("Contact person");
    expect(html).toContain("Number of athletes");
    expect(html).toContain("name@academy.com");
    expect(html).not.toContain("Player full name");
    expect(html).not.toContain('name="coach"');
  });

  test("uses the designed copy when the editor saved placeholders", () => {
    const html = render({
      heading: "Enter heading",
      submitLabel: "Enter button label",
      playerLabel: "Enter label",
    });
    expect(html).toContain("Athletes Assessed");
    expect(html).toContain("Enroll now");
    expect(html).toContain("a player");
    expect(html).not.toContain("Enter heading");
  });
});

describe("custom section routing", () => {
  test("recognises the registered type and existing site slugs", () => {
    expect(isCustomSectionType("CustomAssessmentEnrollment")).toBe(true);
    expect(isCustomSectionType("CareersHero")).toBe(false);
    expect(slugFromPathname("/")).toBe("home");
    expect(slugFromPathname("/careers/")).toBe("careers");
    expect(isHardcodedSiteSlug("about")).toBe(true);
    expect(isHardcodedSiteSlug("blog/acl-rehab")).toBe(true);
    expect(isHardcodedSiteSlug("assessment-offer")).toBe(false);
  });
});
