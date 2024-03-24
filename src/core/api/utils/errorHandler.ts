export const errorHandler = (
  errorCode: number,
  elementName: string = "element"
) => {
  switch (errorCode) {
    case 400:
      return "An error has occurred. Invalid request";
    case 401:
      return elementName !== "login"
        ? "An error has occurred. Try logging in again"
        : "User with the specified username / password was not found.";
    case 404:
      return "Resource not found";
    case 409:
      return `This ${elementName} already exists`;
    case 413:
      return `${elementName} too large`;
    case 500:
      return `Internal Server Error`;
    default:
      return "Unknown error";
  }
};
