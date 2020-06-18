import { TextStyle } from "react-native";

import { NunitoBold, NunitoRegular, NunitoSemiBold } from "../constants/fonts";
import { colorBlack, colorBlue, colorGray, colorWhite } from "./colors";
import { sh12, sh13, sh14, sh15, sh16, sh20, sh24, sh32 } from "./sizes";

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
export const fs12SemiBoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
};

export const fs6BoldGray4: TextStyle = {
  color: colorGray._4,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh16,
};

// TODO change to proper font
export const fs12MedBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
};

// TODO change to proper lineHeight
export const fs12RegBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
};

// TODO change to proper lineHeight
export const fs12RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
};

// TODO change to proper lineHeight
export const fs12RegBlue: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
};

// TODO change to proper lineHeight
export const fs13SemiBoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh13,
};
export const fs12BoldBlack3: TextStyle = {
  color: colorBlack._3,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh16,
};

// TODO change to proper font
export const fs13MedBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh13,
};

// TODO change to proper lineHeight
export const fs15BoldWhite: TextStyle = {
  color: colorBlack._3,
  fontFamily: NunitoRegular,
  fontSize: sh13,
  lineHeight: sh20,
};
export const fs13RegBlack3: TextStyle = {
  color: colorBlack._3,
  fontFamily: NunitoRegular,
  fontSize: sh13,
  lineHeight: sh20,
};

// TODO change to proper font
export const fs14MedWhite: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh15,
};

// TODO change to proper lineHeight
export const fs16BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh16,
};

// TODO change to proper lineHeight
export const fs16RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
};

// TODO change to proper lineHeight
export const fs16SemiBoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
};
export const fs15BoldBlack4: TextStyle = {
  color: colorBlack._4,
  fontFamily: NunitoBold,
  fontSize: sh15,
  lineHeight: sh20,
};

export const fs15BoldWhite: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh15,
  lineHeight: sh20,
};

export const fs16RegBlack3: TextStyle = {
  color: colorBlack._3,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: sh20,
};

// TODO change to proper font
export const fs24SemiBoldBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh24,
};

// TODO change to proper font
export const fs24RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh24,
};

// TODO change to proper font
export const fs24RegBlack: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoRegular,
  fontSize: sh24,
};
// TODO change to proper font
export const fs36SemiBoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh36,
};

export const fs24RegBlack: TextStyle = {
  color: colorBlack._3,
  fontFamily: NunitoRegular,
  fontSize: sh24,
  lineHeight: sh32,
};
