export const decodeHtmlEntities = (text: string) => {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(text, "text/html").body.textContent;
  return decoded || "";
};