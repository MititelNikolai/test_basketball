const dashIntoSpace = (inputString: string) => {
  const stringWithUpperCase =
    inputString.charAt(0).toUpperCase() + inputString.slice(1);
  const stringWithSpaces = stringWithUpperCase.replace(/-/g, " ");
  return stringWithSpaces;
};

export default dashIntoSpace;
