export const getProductType = (type: string) => {
  switch (type.toLowerCase()) {
    case "ut":
      return "Unit Trust (UT)";

    case "prs":
      return "Private Retirement Schemes (PRS)";

    case "prsdefault":
      return "Private Retirement Schemes (PRS) Default";

    case "amp":
      return "Actively Managed Portfolio (AMP)";

    default:
      return type;
  }
};
