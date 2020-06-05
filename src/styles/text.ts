import { TextStyle } from "react-native";

import { colorBlack, colorBlue, colorWhite } from "./colors";
import { sh12, sh13, sh14, sh16, sh20, sh24, sh32 } from "./sizes";

export const fsAlignCenter: TextStyle = { textAlign: "center" };
export const fsCapitalize: TextStyle = {
  textTransform: "capitalize",
};
export const fsUnderline: TextStyle = {
  textDecorationLine: "underline",
};

// TODO add fontFamily
export const fs12MedBlack: TextStyle = {
  color: colorBlack._1,
  fontSize: sh12,
};

// TODO add fontFamily
export const fs13MedBlue2: TextStyle = {
  color: colorBlue._2,
  fontSize: sh13,
  lineHeight: sh16,
};

// TODO add fontFamily
export const fs14MedWhite: TextStyle = {
  color: colorWhite._1,
  fontSize: sh14,
  lineHeight: sh20,
};

// TODO add fontFamily
export const fs24MedBlack: TextStyle = {
  color: colorBlack._1,
  fontSize: sh24,
  lineHeight: sh32,
};
