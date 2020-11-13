import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import {
  alignSelfCenter,
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
  flexRow,
  fs10RegBlue25,
  fs12SemiBoldGray8,
  sh24,
  sh40,
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
  label?: boolean;
  onPressNext: () => void;
  onPressPrev: () => void;
  page: number;
  totalItems: number;
  totalPages: number;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  itemsPerPage,
  label,
  onPressNext,
  onPressPrev,
  page,
  totalItems,
  totalPages,
}: PaginationProps) => {
  const buttonStyle: ViewStyle = circleBorder(sw40, sw1, colorGray._3);
  const currentMinItems = page * itemsPerPage - itemsPerPage + 1;
  const currentMaxItems = page * itemsPerPage;
  const lastItem = currentMaxItems > totalItems ? totalItems : currentMaxItems;
  const currentItems = `${currentMinItems}-${lastItem}`;
  const pageCounter = `${page}/${totalPages}`;

  const showListLabel = `${PAGINATION.LABEL_SHOWING} ${currentItems} ${PAGINATION.LABEL_OUT_OF} ${totalItems} ${PAGINATION.LABEL_RESULTS}`;

  return (
    <View style={{ ...centerVertical, ...flexRow, height: sh40 }}>
      {label === false ? null : (
        <Fragment>
          <Text style={fs10RegBlue25}>{showListLabel}</Text>
          <CustomSpacer isHorizontal={true} space={sw16} />
        </Fragment>
      )}
      <View style={flexRow}>
        <IconButton color={colorBlack._1} name="caret-left" onPress={onPressPrev} size={sh24} style={buttonStyle} />
        <CustomSpacer isHorizontal={true} space={sw8} />
        <Text style={{ ...fs12SemiBoldGray8, ...alignSelfCenter }}>{pageCounter}</Text>
        <CustomSpacer isHorizontal={true} space={sw8} />
        <IconButton color={colorBlack._1} name="caret-right" onPress={onPressNext} size={sh24} style={buttonStyle} />
      </View>
    </View>
  );
};
