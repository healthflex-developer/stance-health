export function partnerPoints(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [item];
    if (item && typeof item === "object" && "text" in item && typeof item.text === "string" && item.text.trim()) {
      return [item.text];
    }
    return [];
  });
}
