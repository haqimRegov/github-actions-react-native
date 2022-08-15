export const handleSignatory = (text: string) => {
  switch (text) {
    case "Principal Applicant":
      return "Principal applicant to sign";
    case "Both Applicants":
      return "Both applicants to sign";
    case "Either Applicant":
      return "either applicant to sign";
    default:
      return "Principal applicant to sign";
  }
};

export const handleSignatoryFromBE = (text: string) => {
  switch (text) {
    case "Principal to sign":
      return "Principal Applicant";
    case "Both Applicants to sign":
      return "Both Applicants";
    case "Either Applicant to sign":
      return "Either Applicant";
    default:
      return "Principal Applicant";
  }
};
