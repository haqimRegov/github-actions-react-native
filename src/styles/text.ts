import { TextStyle } from "react-native";

import { NunitoBold, NunitoRegular, NunitoSemiBold } from "../constants/fonts";
import { colorBlack, colorBlue, colorWhite } from "./colors";
import { sh10, sh12, sh14, sh16, sh24, sh40 } from "./sizes";

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

export const fs10RegBlue21: TextStyle = {
  color: colorBlack._2_1,
  fontFamily: NunitoRegular,
  fontSize: sh10,
};

export const fs12BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
};

export const fs12BoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
};

export const fs12BoldBlue3: TextStyle = {
  color: colorBlue._3,
  fontFamily: NunitoBold,
  fontSize: sh12,
};

export const fs12BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh12,
};

export const fs12RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
};

export const fs12RegBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
};

export const fs12SemiBoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
};

export const fs14BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh14,
};

export const fs14RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh14,
};

export const fs16BoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
};

export const fs16BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh16,
};

export const fs16RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
};

export const fs16SemiBoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
};

export const fs24BoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoBold,
  fontSize: sh24,
};

export const fs24BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh24,
};

export const fs24RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh24,
};

export const fs40BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh40,
};
