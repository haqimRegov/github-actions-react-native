import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Keyboard, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { CustomSpacer, IconButton, IconInput } from "..";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  flexGrow,
  flexRow,
  fs12RegBlue2,
  fs16SemiBoldBlack2,
  fs24BoldBlue2,
  fullHeight,
  fullWidth,
  px,
  sh16,
  sh24,
  sh32,
  sh34,
  sh48,
  shadowBlack5,
  sw1,
  sw100,
  sw24,
  sw40,
  sw85,
} from "../../styles";

const { PRODUCT_FILTER } = Language.PAGE;
interface CollapsibleHeaderProps {
  collapsibleContent?: ReactNode;
  filterVisible?: boolean;
  handleFilter?: () => void;
  inputSearch: string;
  label?: string;
  noFilter?: boolean;
  placeholder?: string;
  setInputSearch: (value: string) => void;
}

export const CollapsibleHeader: FunctionComponent<CollapsibleHeaderProps> = ({
  collapsibleContent,
  filterVisible,
  handleFilter,
  inputSearch,
  label,
  noFilter,
  placeholder,
  setInputSearch,
}: CollapsibleHeaderProps) => {
  const handlePressFilter = () => {
    Keyboard.dismiss();
    if (handleFilter !== undefined) {
      handleFilter();
    }
  };

  const overlay = filterVisible ? fullHeight : {};

  const pageContainer: ViewStyle = {
    ...fullWidth,
    ...overlay,
    backgroundColor: colorTransparent,
    left: 0,
    position: "absolute",
    top: 0,
    zIndex: 1,
  };

  const container: ViewStyle = {
    ...shadowBlack5,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
  };

  const filterBGColor = filterVisible ? colorRed._1 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorRed._1 : colorGray._3;
  const filterColor = filterVisible ? colorWhite._1 : colorBlack._1;

  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw40, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const inputStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.39 };
  const filterToolTip: TextStyle = { top: -30, zIndex: 1, position: "absolute" };
  const toolTipLabel: TextStyle = { position: "absolute", top: 0, left: 0, right: 0, bottom: 8, ...centerHV };

  return (
    <View style={pageContainer}>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ borderRadius: sw24 }}>
        <View style={container}>
          <View>
            <View style={px(sw24)}>
              <CustomSpacer space={sh32} />
              {label !== undefined ? <Text style={fs24BoldBlue2}>{label}</Text> : null}
              <CustomSpacer space={sh16} />
              <View style={{ ...centerVertical, ...flexRow }}>
                <IconInput
                  icon="search"
                  onChangeText={setInputSearch}
                  placeholder={placeholder}
                  placeholderTextColor={colorBlack._2_5}
                  style={inputStyle}
                  value={inputSearch}
                  viewStyle={{ borderRadius: sw100, height: sh48 }}
                />
                {noFilter === true ? null : (
                  <Fragment>
                    <CustomSpacer isHorizontal={true} space={sw40} />
                    <View style={{ width: sw85 }}>
                      <View style={filterToolTip}>
                        <IcoMoon color={colorGray._1} name="filter-tooltip" size={sh34} />
                        <View style={toolTipLabel}>
                          <Text style={{ ...fs12RegBlue2 }}>{PRODUCT_FILTER.LABEL_FILTER}</Text>
                        </View>
                      </View>
                      <View style={centerVertical}>
                        <IconButton color={filterColor} name="filter" onPress={handlePressFilter} size={sh24} style={filterContainer} />
                      </View>
                    </View>
                  </Fragment>
                )}
              </View>
            </View>
            <Collapsible collapsed={!filterVisible} duration={300}>
              {collapsibleContent}
            </Collapsible>
            <CustomSpacer space={sh24} />
          </View>
        </View>
        <CustomSpacer space={sh16} />
        {filterVisible ? <CustomSpacer space={sh24} /> : null}
      </ScrollView>
    </View>
  );
};
