export const getProductType = (type: string) => {
  switch (type.toLowerCase()) {
    case "ut":
      return "Unit Trust (UT)";

    case "prs":
      return "Private Retirement Schemes (PRS)";

    case "prsdefault":
    case "prs default":
      return "Private Retirement Schemes (PRS) Default";

    case "amp":
      return "Actively Managed Portfolio (AMP)";

    default:
      return type;
  }
};

export const getProductTagType = (type: string) => {
  switch (type.toLowerCase()) {
    case "ut":
      return "UT";

    case "prs":
      return "PRS";

    case "prsdefault":
    case "prs default":
      return "PRS Default";

    case "amp":
      return "AMP";

    default:
      return type;
  }
};

export const getProductTabType = (type: string): ProductType => {
  switch (type) {
    case "UT":
      return "ut";

    case "PRS":
      return "prs";

    case "PRS Default":
      return "prsDefault";

    case "AMP":
      return "amp";

    default:
      return "ut";
  }
};
