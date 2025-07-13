export const convertToTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const makeOptions = (
  arr: string[],
): { label: string; value: string }[] => {
  return arr.map(item => ({
    label: convertToTitleCase(item),
    value: item,
  }));
};
