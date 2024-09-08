export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export function capitalizeWords(str) {
  return str
    ?.split(" ")
    ?.map((word) => capitalizeFirstLetter(word))
    ?.join(" ");
}
