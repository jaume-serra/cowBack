export const convertStringToDate = (stringDate: string) => {
  const dateParts: Array<string> = stringDate.split("/");
  return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
};
