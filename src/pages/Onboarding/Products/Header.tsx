import React from "react";
import { View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, CustomTextInput, LabeledTitle, OutlineButton, Pagination } from "../../../components";
import {
  borderBottomBlack61,
  centerVertical,
  colorBlue,
  colorGray,
  flexChild,
  flexRow,
  fs16RegBlack2,
  fs24RegBlack2,
  py,
  sh15,
  sh35,
  sh54,
  sh8,
  sw106,
  sw145,
  sw36,
  sw561,
  sw63,
  sw8,
} from "../../../styles";

export interface ProductHeaderProps {
  handleNext: () => void;
  handlePrev: () => void;
  handleRecommended: () => void;
  handleViewAll: () => void;
}

export const ProductHeader = ({ handleNext, handlePrev, handleRecommended, handleViewAll }: ProductHeaderProps) => {
  return (
    <View>
      <View style={flexRow}>
        <CustomSpacer isHorizontal={true} space={sw63} />
        <View style={flexChild}>
          <CustomSpacer space={sh54} />
          <View style={{ ...flexRow, ...centerVertical }}>
            <LabeledTitle
              label={"Your Product Listing"}
              labelStyle={fs24RegBlack2}
              spaceToLabel={sh8}
              title="Let’s select the funds of your choice"
              titleStyle={fs16RegBlack2}
            />
            <CustomFlexSpacer />
            <CustomTextInput viewStyle={{ width: sw561 }} />
          </View>
        </View>
        <CustomSpacer isHorizontal={true} space={sw36} />
      </View>
      <CustomSpacer space={sh35} />
      <View style={borderBottomBlack61} />
      <View style={{ ...flexRow, ...py(sh15) }}>
        <CustomSpacer isHorizontal={true} space={sw63} />
        <OutlineButton onPress={handleRecommended} color={colorBlue._7} text={"Recommended"} buttonStyle={{ width: sw145 }} />
        <CustomSpacer isHorizontal={true} space={sw8} />
        <OutlineButton onPress={handleViewAll} color={colorGray._11} text={"View All"} buttonStyle={{ width: sw106 }} />
        <CustomFlexSpacer />
        <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={1} totalItems={36} itemsPerPage={20} />
        <CustomSpacer isHorizontal={true} space={sw36} />
      </View>
      <View style={borderBottomBlack61} />
    </View>
  );
};
