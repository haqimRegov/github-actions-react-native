import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  flexRow,
  fs10RegBlue25,
  fs12SemiBoldGray8,
  sh24,
  sh40,
  sw1,
  sw16,
  sw36,
  sw4,
  sw40,
} from "../../styles";
import { IconButton } from "../Touchables/Icon";
import { CustomSpacer } from "./Spacer";

const { PAGINATION } = Language.PAGE;

interface PaginationProps {
  itemsPerPage?: number;
  onPressNext: () => void;
  onPressPrev: () => void;
  page: number;
  totalItems?: number;
  totalPages: number;
  withLabel?: boolean;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  itemsPerPage,
  onPressNext,
  onPressPrev,
  page,
  totalItems,
  totalPages,
  withLabel,
}: PaginationProps) => {
  const buttonStyle: ViewStyle = circleBorder(sw40, sw1, colorGray._3);
  let currentMinItems = 0;
  let currentMaxItems = 0;
  let lastItem = 0;
  let currentItems = "";

  if (withLabel === true && itemsPerPage !== undefined && totalItems !== undefined) {
    currentMinItems = page * itemsPerPage - itemsPerPage + 1;
    currentMaxItems = page * itemsPerPage;
    lastItem = currentMaxItems > totalItems ? totalItems : currentMaxItems;
    currentItems = `${currentMinItems}-${lastItem}`;
  }
  const pageCounter = `${page}/${totalPages}`;

  const showListLabel = `${PAGINATION.LABEL_SHOWING} ${currentItems} ${PAGINATION.LABEL_OUT_OF} ${totalItems} ${PAGINATION.LABEL_RESULTS}`;
  const prevEnabled = page > 1;
  const nextEnabled = page < totalPages;
  const prevStyle = prevEnabled ? {} : { opacity: 0.6 };
  const nextStyle = nextEnabled ? {} : { opacity: 0.6 };

  const handlePrev = () => {
    if (prevEnabled) {
      onPressPrev();
    }
  };

  const handleNext = () => {
    if (nextEnabled) {
      onPressNext();
    }
  };

  const prevColor = prevEnabled ? colorBlue._2 : colorGray._3;
  const nextColor = nextEnabled ? colorBlue._2 : colorGray._3;

  return (
    <View style={{ ...centerVertical, ...flexRow, height: sh40 }}>
      {withLabel === true ? (
        <Fragment>
          <Text style={fs10RegBlue25}>{showListLabel}</Text>
          <CustomSpacer isHorizontal={true} space={sw16} />
        </Fragment>
      ) : null}
      <View style={flexRow}>
        <IconButton color={prevColor} name="caret-left" onPress={handlePrev} size={sh24} style={{ ...buttonStyle, ...prevStyle }} />
        <CustomSpacer isHorizontal={true} space={sw4} />
        <View style={{ ...centerHV, width: sw36 }}>
          <Text style={fs12SemiBoldGray8}>{pageCounter}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw4} />
        <IconButton color={nextColor} name="caret-right" onPress={handleNext} size={sh24} style={{ ...buttonStyle, ...nextStyle }} />
      </View>
    </View>
  );
};
