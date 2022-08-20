// Function from BE for temporary use
export const findDOBFromNric = (nric: string): string => {
  const dob: string = nric.substring(0, 6);
  const year: string = dob.substring(0, 2);
  const currentDate: string | number = new Date().getFullYear();
  const dateValue = String(currentDate);
  const currentYear: string = dateValue.substring(2, 4);
  const yearPrefix: string = dateValue.substring(0, 2);
  let dobYear: string;
  if (Number(currentYear) - Number(year) <= 0) {
    const temp = Number(yearPrefix) - 1;
    dobYear = String(temp) + dob;
  } else dobYear = String(yearPrefix) + dob;
  const dateOfBirth = String(dobYear + dob.substring(2, 4) + dob.substring(4, 6));
  return dateOfBirth;
};
