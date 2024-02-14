export const dashIntoSpace = (inputString: string) => {
  const stringWithSpaces = inputString.replace(/-/g, " ");

  return stringWithSpaces
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
};

export const createSlug = (inputString: string) => {
  const stringWithoutUpperCase = inputString.toLowerCase();
  const stringWithSpaces = stringWithoutUpperCase.replace(/ /g, "-");
  return stringWithSpaces;
};
