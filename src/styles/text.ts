import { TextStyle } from "react-native";

import { NunitoBold, NunitoRegular, NunitoSemiBold } from "../constants/fonts";
import { colorBlack, colorBlue, colorGray, colorRed, colorWhite, colorYellow } from "./colors";
import { scaleHeight } from "./scaler";
import { sh10, sh12, sh14, sh16, sh18, sh20, sh24, sh32, sh36, sh40, sh48 } from "./sizes";

export const fsAlignCenter: TextStyle = { textAlign: "center" };
export const fsAlignLeft: TextStyle = { textAlign: "left" };
export const fsAlignRight: TextStyle = { textAlign: "right" };

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

export const fs10BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10BoldBlue6: TextStyle = {
  color: colorBlue._6,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10BoldBlue8: TextStyle = {
  color: colorBlue._8,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10BoldGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10BoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegBlue5: TextStyle = {
  color: colorBlue._5,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegBlue6: TextStyle = {
  color: colorBlue._6,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegBlue9: TextStyle = {
  color: colorBlue._9,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegGray4: TextStyle = {
  color: colorGray._4,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs12BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldBlue8: TextStyle = {
  color: colorBlue._8,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldYellow2: TextStyle = {
  color: colorYellow._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegBlue5: TextStyle = {
  color: colorBlue._5,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegBlue6: TextStyle = {
  color: colorBlue._6,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegBlue8: TextStyle = {
  color: colorBlue._8,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegGray4: TextStyle = {
  color: colorGray._4,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegRed2: TextStyle = {
  color: colorRed._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12SemiBoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12SemiBoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs14BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};
export const fs14BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14BoldGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoBold,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14BoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoBold,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegGray4: TextStyle = {
  color: colorGray._4,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs16BoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegBlue5: TextStyle = {
  color: colorBlue._5,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16SemiBoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16SemiBoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16SemiBoldBlue5: TextStyle = {
  color: colorBlue._5,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16SemiBoldBlue8: TextStyle = {
  color: colorBlue._8,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16SemiBoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs18BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh18,
  lineHeight: scaleHeight(18 * 1.35),
};

export const fs18BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh18,
  lineHeight: scaleHeight(18 * 1.35),
};

export const fs18BoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoBold,
  fontSize: sh18,
  lineHeight: scaleHeight(18 * 1.35),
};

export const fs20BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh20,
  lineHeight: scaleHeight(20 * 1.4),
};

export const fs20BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh20,
  lineHeight: scaleHeight(20 * 1.4),
};

export const fs20BoldGray5: TextStyle = {
  color: colorGray._5,
  fontFamily: NunitoBold,
  fontSize: sh20,
  lineHeight: scaleHeight(20 * 1.4),
};

export const fs24BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs24BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs24BoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs24BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs24RegGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoRegular,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs36BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh36,
  lineHeight: scaleHeight(36 * 1.22),
};

export const fs32BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh32,
  lineHeight: scaleHeight(36 * 1.22),
};

export const fs32BoldBlue1: TextStyle = {
  color: colorBlue._1,
  fontFamily: NunitoBold,
  fontSize: sh32,
  lineHeight: scaleHeight(36 * 1.22),
};

export const fs36BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh36,
  lineHeight: scaleHeight(36 * 1.22),
};

export const fs40BoldGray6: TextStyle = {
  color: colorGray._6,
  fontFamily: NunitoBold,
  fontSize: sh40,
  lineHeight: sh48,
};
