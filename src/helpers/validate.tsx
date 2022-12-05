const checkSymbol = (str: string, specialSymbol: string) => {
  let repeatCount = 0;
  str.split('').forEach((symbol) => {
    if (symbol === specialSymbol) {
      repeatCount++;
    }
  });

  return repeatCount % 2 === 0;
}

export const validate = (chipText: string, specialSymbol: string): boolean => {
  if (!checkSymbol(chipText, specialSymbol)) {
    return false;
  }

  if (chipText.length === 0) {
    return false;
  }

  return true;
};
