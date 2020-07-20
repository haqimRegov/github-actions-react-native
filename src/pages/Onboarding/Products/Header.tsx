import React, { FunctionComponent, useState } from "react";
import { ScrollView, Text, TextInput, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { ActionButtons, CustomSpacer, IconButton } from "../../../components";
import { IconInput } from "../../../components/Input/IconInput";
import { Language } from "../../../constants";
import {
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  DEVICE,
  flexGrow,
  flexRow,
  fs24BoldBlue2,
  fullHeight,
  fullWidth,
  px,
  scaleHeight,
  sh16,
  sh24,
  sh32,
  sh48,
  sh56,
  shadow5,
  sw1,
  sw100,
  sw218,
  sw24,
  sw40,
} from "../../../styles";

const { PRODUCT_LIST } = Language.PAGE;
interface ProductHeaderProps {
  filter: boolean;
  inputSearch: string;
  handleFilter: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  setInputSearch: (value: string) => void;
}

export const ProductHeader: FunctionComponent<ProductHeaderProps> = ({
  inputSearch,
  filter,
  handleFilter,
  setInputSearch,
}: ProductHeaderProps) => {
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);

  const handlePressFilter = () => {
    if (searchInputRef !== null) {
      searchInputRef.blur();
    }
    handleFilter();
  };

  const overlay = filter ? {} : fullHeight;

  const pageContainer: ViewStyle = {
    ...fullWidth,
    ...overlay,
    ...px(sw24),
    backgroundColor: colorTransparent,
    left: 0,
    position: "absolute",
    top: 0,
    zIndex: 1,
  };

  const containerMaxHeight = scaleHeight(DEVICE.SCREEN.HEIGHT - sh48);

  const container: ViewStyle = {
    ...px(sw24),
    ...shadow5,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    maxHeight: containerMaxHeight,
  };

  const filterBGColor = filter ? colorWhite._1 : colorRed._1;
  const filterBorderColor = filter ? colorGray._3 : colorRed._1;
  const filterColor = filter ? colorBlack._1 : colorWhite._1;

  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw40, sw1, filterBorderColor), backgroundColor: filterBGColor };

  return (
    <View style={pageContainer}>
      <CustomSpacer space={sh24} />
      <View style={container}>
        <ScrollView
          bounces={false}
          contentContainerStyle={flexGrow}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <CustomSpacer space={sh32} />
          <Text style={fs24BoldBlue2}>{PRODUCT_LIST.HEADING}</Text>
          <CustomSpacer space={sh16} />
          <View style={{ ...centerVertical, ...flexRow }}>
            <IconInput
              icon="search"
              onChangeText={setInputSearch}
              placeholder={PRODUCT_LIST.INPUT_SEARCH_PLACEHOLDER}
              setRef={setSearchInputRef}
              value={inputSearch}
              viewStyle={{ borderRadius: sw100, height: sh48 }}
            />
            <CustomSpacer isHorizontal={true} space={sw40} />
            <IconButton color={filterColor} name="filter" onPress={handlePressFilter} size={sh24} style={filterContainer} />
          </View>
          <Collapsible collapsed={filter} duration={300}>
            <CustomSpacer space={sh56} />
            <ActionButtons
              buttonContainerStyle={centerHorizontal}
              cancelButtonStyle={{ width: sw218 }}
              continueButtonStyle={{ width: sw218 }}
              handleCancel={handleFilter}
              handleContinue={handleFilter}
            />
            <CustomSpacer space={sh16} />
          </Collapsible>
          <CustomSpacer space={sh24} />
        </ScrollView>
      </View>
      {filter ? null : <CustomSpacer space={sh24} />}
    </View>
  );
};
