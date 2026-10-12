// A blank or placeholder link keeps the button's existing destination.
// Any other saved value is the destination the button should open.
export function buttonDestination(href: unknown): string | null {
  if (typeof href !== "string") return null;
  const text = href.trim();
  if (!text || text === "#") return null;
  return text;
}
