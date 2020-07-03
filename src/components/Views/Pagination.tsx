import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { IcoMoon } from "../../icons";
import { centerHV, centerVertical, colorGray, flexRow, fs14BoldBlack6, fs14RegularBlack6, sw05, sw16, sw2, sw32 } from "../../styles";
import { CustomSpacer } from "./Spacer";

interface PaginationProps {
  itemsPerPage: number;
  onPressNext: () => void;
  onPressPrev: () => void;
  page: number;
  totalItems: number;
}

export const Pagination = ({ itemsPerPage, onPressNext, onPressPrev, page, totalItems }: PaginationProps) => {
  const buttonStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorGray._3,
    borderColor: colorGray._10,
    borderRadius: sw2,
    borderWidth: sw05,
    height: sw32,
    width: sw32,
  };

  const currentMinItems = page * itemsPerPage - itemsPerPage + 1;
  const currentMaxItems = page * itemsPerPage;
  const lastItem = currentMaxItems > totalItems ? totalItems : currentMaxItems;
  const currentItems = `${currentMinItems}-${lastItem}`;

  return (
    <View style={{ ...centerVertical, ...flexRow }}>
      <Text style={fs14RegularBlack6}>
        Viewing <Text style={fs14BoldBlack6}>{currentItems}</Text> of <Text style={fs14BoldBlack6}>{totalItems}</Text>
      </Text>
      <CustomSpacer isHorizontal={true} space={sw16} />
      <View style={flexRow}>
        <TouchableWithoutFeedback onPress={onPressPrev}>
          <View style={buttonStyle}>
            <IcoMoon name="caret-left-filled" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressNext}>
          <View style={buttonStyle}>
            <IcoMoon name="caret-right-filled" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
