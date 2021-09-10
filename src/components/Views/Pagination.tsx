import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import {
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  flexRow,
  fs10RegBlue25,
  fs12BoldBlack3,
  fs12RegGray9,
  sh16,
  sh40,
  sw1,
  sw16,
  sw2,
  sw24,
  sw40,
  sw8,
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
  const totalPage = `of ${totalPages}`;

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

  return (
    <View style={{ ...centerVertical, ...flexRow, height: sh40 }}>
      {withLabel === true ? (
        <Fragment>
          <Text style={fs10RegBlue25}>{showListLabel}</Text>
          <CustomSpacer isHorizontal={true} space={sw16} />
        </Fragment>
      ) : null}
      <View style={{ ...centerVertical, ...flexRow }}>
        <View style={{ ...centerVertical, ...flexRow, height: sh16 }}>
          <Text style={{ ...fs12BoldBlack3, lineHeight: sh16 }}>{page}</Text>
          <CustomSpacer isHorizontal={true} space={sw2} />
          <Text style={{ ...fs12RegGray9, lineHeight: sh16 }}>{totalPage}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw24} />
        <View style={flexRow}>
          <IconButton
            color={colorBlue._2}
            name="caret-left"
            onPress={handlePrev}
            size={sw24}
            style={{ ...buttonStyle, ...prevStyle }}
            withDebounce={true}
          />
          <CustomSpacer isHorizontal={true} space={sw8} />
          <IconButton
            color={colorBlue._2}
            name="caret-right"
            onPress={handleNext}
            size={sw24}
            style={{ ...buttonStyle, ...nextStyle }}
            withDebounce={true}
          />
        </View>
      </View>
    </View>
  );
};
