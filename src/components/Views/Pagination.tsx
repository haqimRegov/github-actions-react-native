import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import {
  centerVertical,
  circleBorder,
  colorBlue,
  disabledOpacity4,
  flexRow,
  fs12BoldBlack2,
  fs12RegGray4,
  sh16,
  sh40,
  sw1,
  sw2,
  sw24,
  sw40,
  sw8,
} from "../../styles";
import { IconButton } from "../Touchables/Icon";
import { CustomSpacer } from "./Spacer";

interface PaginationProps {
  onPressNext: () => void;
  onPressPrev: () => void;
  page: number;
  totalPages: number;
}

export const Pagination: FunctionComponent<PaginationProps> = ({ onPressNext, onPressPrev, page, totalPages }: PaginationProps) => {
  const buttonStyle: ViewStyle = circleBorder(sw40, sw1, colorBlue._4);

  const totalPage = `of ${totalPages}`;

  const prevEnabled = page > 1;
  const nextEnabled = page < totalPages;
  const prevStyle = prevEnabled ? {} : { ...disabledOpacity4 };
  const nextStyle = nextEnabled ? {} : { ...disabledOpacity4 };

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
      <View style={{ ...centerVertical, ...flexRow }}>
        <View style={{ ...centerVertical, ...flexRow, height: sh16 }}>
          <Text style={fs12BoldBlack2}>{page}</Text>
          <CustomSpacer isHorizontal={true} space={sw2} />
          <Text style={fs12RegGray4}>{totalPage}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw24} />
        <View style={flexRow}>
          <IconButton
            color={colorBlue._1}
            name="caret-left"
            onPress={handlePrev}
            size={sw24}
            style={{ ...buttonStyle, ...prevStyle }}
            withDebounce={true}
          />
          <CustomSpacer isHorizontal={true} space={sw8} />
          <IconButton
            color={colorBlue._1}
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
