import React from "react";
import { Text, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
  flexRow,
  fs10RegBlue25,
  sh24,
  sw1,
  sw16,
  sw40,
  sw8,
} from "../../styles";
import { IconButton } from "../Touchables/Icon";
import { CustomSpacer } from "./Spacer";

const { PAGINATION } = Language.PAGE;

interface PaginationProps {
  itemsPerPage: number;
  onPressNext: () => void;
  onPressPrev: () => void;
  page: number;
  totalItems: number;
}

export const Pagination = ({ itemsPerPage, onPressNext, onPressPrev, page, totalItems }: PaginationProps) => {
  const buttonStyle: ViewStyle = {
    ...circleBorder(sw40, sw1, colorGray._3),
    ...centerHV,
  };

  const currentMinItems = page * itemsPerPage - itemsPerPage + 1;
  const currentMaxItems = page * itemsPerPage;
  const lastItem = currentMaxItems > totalItems ? totalItems : currentMaxItems;
  const currentItems = `${currentMinItems}-${lastItem}`;

  const label = `${PAGINATION.LABEL_SHOWING} ${currentItems} ${PAGINATION.LABEL_OUT_OF} ${totalItems} ${PAGINATION.LABEL_RESULTS}`;

  return (
    <View style={{ ...centerVertical, ...flexRow }}>
      <Text style={fs10RegBlue25}>{label}</Text>
      <CustomSpacer isHorizontal={true} space={sw16} />
      <View style={flexRow}>
        <IconButton color={colorBlack._1} name="caret-left" onPress={onPressPrev} size={sh24} style={buttonStyle} />
        <CustomSpacer isHorizontal={true} space={sw8} />
        <IconButton color={colorBlack._1} name="caret-right" onPress={onPressNext} size={sh24} style={buttonStyle} />
      </View>
    </View>
  );
};
