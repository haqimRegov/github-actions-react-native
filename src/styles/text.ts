import { TextStyle } from "react-native";

import { NunitoBold, NunitoRegular, NunitoSemiBold } from "../constants/fonts";
import { colorBlack, colorBlue, colorWhite } from "./colors";
import { sh12, sh13, sh14, sh16, sh24, sh39 } from "./sizes";

export const fsAlignCenter: TextStyle = { textAlign: "center" };
export const fsUppercase: TextStyle = {
  textTransform: "uppercase",
};

export const fsCapitalize: TextStyle = {
  textTransform: "capitalize",
};
export const fsUnderline: TextStyle = {
  textDecorationLine: "underline",
};

// TODO change to proper lineHeight
export const fs12SemiBoldBlack3: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
};

// TODO change to proper lineHeight
export const fs13SemiBoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh13,
};

// TODO change to proper font
export const fs14SemiBoldBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh14,
};

// TODO change to proper lineHeight
export const fs14SemiBoldWhite: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh14,
};

export const fs16BoldBlack3: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: sh39,
};

export const fs16RegBlack3: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: sh39,
};

// TODO change to proper font
export const fs20MedWhite: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh20,
  lineHeight: sh24,
};

// TODO change to proper font
export const fs20MedBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh20,
  lineHeight: sh24,
};

export const fs24SemiBoldBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh24,
  lineHeight: sh39,
};

export const fs24RegBlack3: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh24,
  lineHeight: sh39,
};

export const fs24RegBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoRegular,
  fontSize: sh24,
  lineHeight: sh39,
};
