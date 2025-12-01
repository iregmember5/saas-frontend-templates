export const getFullImageUrl = (
  url: string | { url: string } | undefined
): string => {
  if (!url) return "";

  const urlString = typeof url === "string" ? url : url.url;

  if (urlString.startsWith("http")) return urlString;
  return `https://esign-admin.signmary.com${urlString}`;
};
