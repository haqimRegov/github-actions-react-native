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
