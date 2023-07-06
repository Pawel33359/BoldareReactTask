// Function to change date to american format
export function changeDateFormat(date) {
  const dateElements = date.split(".");
  const newDate = `${dateElements[1]}.${dateElements[0]}.${dateElements[2]}`;
  return newDate;
}
