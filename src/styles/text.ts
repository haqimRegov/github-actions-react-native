import { TextStyle } from "react-native";

import { NunitoBlack, NunitoBold, NunitoRegular, NunitoSemiBold } from "../constants/fonts";
import { colorBlack, colorBlue, colorGray, colorRed, colorWhite } from "./colors";
import { sh10, sh11, sh12, sh14, sh16, sh18, sh19, sh24, sh32, sh40, sh55, sw005, sw02, sw03, sw033 } from "./sizes";

export const fsAlignCenter: TextStyle = { textAlign: "center" };
export const fsAlignLeft: TextStyle = { textAlign: "left" };

export const fsCapitalize: TextStyle = {
  textTransform: "capitalize",
};

export const fsNoLineHeight: TextStyle = {
  lineHeight: undefined,
};

export const fsTransformNone: TextStyle = {
  textTransform: "none",
};

export const fsUnderline: TextStyle = {
  textDecorationLine: "underline",
};

export const fsUppercase: TextStyle = {
  textTransform: "uppercase",
};

export const fs10BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh10,
  letterSpacing: -sw033,
  lineHeight: sh16,
};

export const fs10BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh10,
  letterSpacing: -sw033,
  lineHeight: sh16,
};

export const fs10RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: sh16,
};

export const fs10RegBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: sh12,
};

export const fs10RegBlue38: TextStyle = {
  color: colorBlue._3_8,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: sh16,
};

export const fs10RegBlue25: TextStyle = {
  color: colorBlue._2_5,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: sh16,
};

export const fs11RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh11,
  lineHeight: sh16,
};

export const fs12BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh24,
};

export const fs12BoldBlack3: TextStyle = {
  color: colorBlack._3,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh24,
};

export const fs12BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh24,
};

export const fs12BoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh24,
};

export const fs12BoldBlue38: TextStyle = {
  color: colorBlue._3_8,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh24,
};

export const fs12BoldGray7: TextStyle = {
  color: colorGray._7,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh24,
};

export const fs12BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: sh24,
};

export const fs12RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12RegBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12RegBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12RegBlue25: TextStyle = {
  color: colorBlue._2_5,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12RegBlue6: TextStyle = {
  color: colorBlue._6,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12RegBlue38: TextStyle = {
  color: colorBlue._3_8,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12RegGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  letterSpacing: -sw03,
  lineHeight: sh14,
};

export const fs12RegGray7: TextStyle = {
  color: colorGray._7,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  letterSpacing: -sw03,
  lineHeight: sh14,
};

export const fs12RegGray8: TextStyle = {
  color: colorGray._8,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  letterSpacing: -sw03,
  lineHeight: sh14,
};

export const fs12RegGray9: TextStyle = {
  color: colorGray._9,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  letterSpacing: -sw03,
  lineHeight: sh14,
};

export const fs12RegRed2: TextStyle = {
  color: colorRed._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldBlue38: TextStyle = {
  color: colorBlue._3_8,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldGray8: TextStyle = {
  color: colorGray._8,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldRed2: TextStyle = {
  color: colorRed._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs12SemiBoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: sh16,
};

export const fs14BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh14,
  lineHeight: sh24,
};

export const fs14RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  letterSpacing: -sw02,
  lineHeight: sh24,
};

export const fs14RegGray7: TextStyle = {
  color: colorGray._7,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: sh24,
};

export const fs14SemiBoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh14,
  lineHeight: sh19,
};

export const fs16BoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: sh24,
};

export const fs16BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: sh24,
};

export const fs16BoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: sh24,
};

export const fs16BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: sh24,
};

export const fs16RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: sh24,
};

export const fs16RegBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: sh24,
};

export const fs16RegBlue25: TextStyle = {
  color: colorBlue._2_5,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: sh24,
};

export const fs16SemiBoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  letterSpacing: -sw005,
  lineHeight: sh24,
};

export const fs16SemiBoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  letterSpacing: -sw005,
  lineHeight: sh24,
};

export const fs16SemiBoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  letterSpacing: -sw005,
  lineHeight: sh24,
};

export const fs16SemiBoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  letterSpacing: -sw005,
  lineHeight: sh24,
};

export const fs16SemiBoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  letterSpacing: -sw005,
  lineHeight: sh24,
};

export const fs18BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh18,
  letterSpacing: -sw02,
  lineHeight: sh32,
};

export const fs18BoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoBold,
  fontSize: sh18,
  letterSpacing: -sw02,
  lineHeight: sh32,
};

export const fs24BlackBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBlack,
  fontSize: sh24,
  lineHeight: sh32,
};

export const fs24BoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: sh32,
};

export const fs24BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: sh32,
};

export const fs24BoldBlue2: TextStyle = {
  color: colorBlue._2,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: sh32,
};

export const fs24RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh24,
  lineHeight: sh32,
};

export const fs40BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh40,
  lineHeight: sh55,
};

export const fs40BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh40,
  lineHeight: sh55,
};
