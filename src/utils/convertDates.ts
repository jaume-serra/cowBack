export const convertStringToDate = (stringDate: string) => {
  const dateParts: Array<string> = stringDate.split("/");
  return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
};

export const convertDateToMonth = (date: Date) => {
  const today = new Date()
  const convertDate = new Date(date)
  return today.getMonth() - convertDate.getMonth() + (today.getFullYear()-convertDate.getFullYear())*12
}