export const alphabeticalOrder = (item1: string, item2: string) => {
  if (item1 > item2) {
    return 1;
  }
  if (item1 < item2) {
    return -1;
  }
  return 0;
};
