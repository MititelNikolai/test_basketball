export const calculateAge = (birthday: string) => {
  const birthdayDate = new Date(birthday);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthdayDate.getFullYear();

  const birthdayThisYear = new Date(
    currentDate.getFullYear(),
    birthdayDate.getMonth(),
    birthdayDate.getDate()
  );
  if (currentDate < birthdayThisYear) {
    age--;
  }

  return age;
};
