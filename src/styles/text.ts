import { TextStyle } from "react-native";

import { NunitoSemiBold } from "../constants/fonts";
import { colorBlack, colorBlue, colorWhite } from "./colors";
import { sh12, sh13, sh14, sh16, sh20, sh24, sh32 } from "./sizes";

export const fsAlignCenter: TextStyle = { textAlign: "center" };
export const fsCapitalize: TextStyle = {
  textTransform: "capitalize",
};
export const fsUnderline: TextStyle = {
  textDecorationLine: "underline",
};

// TODO change to proper font
export const fs12MedBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
};

// TODO change to proper font
export const fs13MedBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh13,
  lineHeight: sh16,
};

// TODO change to proper font
export const fs14MedBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: RobotoSemiBold,
  fontSize: sh14,
  lineHeight: sh20,
};

// TODO change to proper font
export const fs14MedWhite: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh14,
  lineHeight: sh20,
};

// TODO change to proper font
export const fs20MedWhite: TextStyle = {
  color: colorWhite._1,
  fontFamily: RobotoSemiBold,
  fontSize: sh20,
  lineHeight: sh24,
};

// TODO change to proper font
export const fs20MedBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: RobotoSemiBold,
  fontSize: sh20,
  lineHeight: sh24,
};

// TODO change to proper font
export const fs24MedBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh24,
  lineHeight: sh32,
};
