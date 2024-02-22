export const dashIntoSpace = (inputString: string) => {
  const stringWithSpaces = inputString.replace(/-/g, " ").trim();

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

export const addSpaceBeforeUppercase = (text: string) => {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const jsonDateToString = (jsonString: string) => {
  const dateObject = new Date(jsonString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
