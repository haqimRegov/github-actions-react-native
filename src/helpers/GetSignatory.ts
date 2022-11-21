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
  switch (text.toLowerCase()) {
    case "principal to sign":
    case "principal applicant to sign":
      return "Principal Applicant";
    case "both applicants to sign":
    case "both to sign":
      return "Both Applicants";
    case "either applicant to sign":
    case "either to sign":
      return "Either Applicant";
    default:
      return "Principal Applicant";
  }
};
