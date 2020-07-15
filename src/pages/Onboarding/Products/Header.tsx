import React from "react";
import { View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, CustomTextInput, LabeledTitle, OutlineButton, Pagination } from "../../../components";
import {
  borderBottomBlack21,
  centerVertical,
  colorBlack,
  flexChild,
  flexRow,
  fs16RegBlack2,
  fs24RegBlack2,
  px,
  py,
  sh15,
  sh35,
  sh54,
  sh8,
  sw106,
  sw145,
  sw24,
  sw561,
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
      <View style={px(sw24)}>
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
      </View>
      <CustomSpacer space={sh35} />
      <View style={borderBottomBlack21} />
      <View style={{ ...flexRow, ...px(sw24), ...py(sh15) }}>
        <OutlineButton onPress={handleRecommended} color={colorBlack._2} text={"Recommended"} buttonStyle={{ width: sw145 }} />
        <CustomSpacer isHorizontal={true} space={sw8} />
        <OutlineButton onPress={handleViewAll} color={colorBlack._2} text={"View All"} buttonStyle={{ width: sw106 }} />
        <CustomFlexSpacer />
        <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={1} totalItems={36} itemsPerPage={20} />
      </View>
      <View style={borderBottomBlack21} />
    </View>
  );
};
