import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Image, ImageStyle, Keyboard, ScrollView, Text, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { LocalAssets } from "../../assets/images/LocalAssets";
import {
  absolutePosition,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorTransparent,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs24BoldBlue1,
  fullHeight,
  fullWidth,
  px,
  sh16,
  sh24,
  sh32,
  sh34,
  sh36,
  shadow12Black112,
  sw1,
  sw24,
  sw48,
  sw784,
  sw80,
  sw84,
} from "../../styles";
import { CustomTextInput } from "../Input";
import { IconButton } from "../Touchables/Icon";
import { CustomSpacer } from "../Views/Spacer";

interface CollapsibleHeaderProps {
  collapsibleContent?: ReactNode;
  filterVisible?: boolean;
  handleFilter?: () => void;
  inputSearch: string;
  inputViewStyle?: ViewStyle;
  label?: string;
  noFilter?: boolean;
  onSubmitEditing?: () => void;
  placeholder?: string;
  setInputSearch: (value: string) => void;
}

export const CollapsibleHeader: FunctionComponent<CollapsibleHeaderProps> = ({
  collapsibleContent,
  filterVisible,
  handleFilter,
  inputSearch,
  inputViewStyle,
  label,
  noFilter,
  onSubmitEditing,
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
    ...shadow12Black112,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
  };

  const filterBGColor = filterVisible ? colorBlue._1 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._1 : colorBlue._4;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._1;
  const filterIcon = filterVisible ? "close" : "filter";
  const filterIconSize = filterVisible ? sh32 : sh24;

  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw48, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const tooltipStyle: ImageStyle = { ...absolutePosition, height: sh34, width: sw84, zIndex: 1, bottom: sh36 };

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
              {label !== undefined ? <Text style={fs24BoldBlue1}>{label}</Text> : null}
              <CustomSpacer space={sh16} />
              <View style={{ ...centerVertical, ...flexRow }}>
                <CustomTextInput
                  autoCorrect={false}
                  containerStyle={flexChild}
                  leftIcon={{ name: "search" }}
                  onChangeText={setInputSearch}
                  onSubmitEditing={onSubmitEditing}
                  placeholder={placeholder}
                  returnKeyType="search"
                  value={inputSearch}
                  viewStyle={{ width: sw784, ...inputViewStyle }}
                />
                {noFilter === true ? null : (
                  <Fragment>
                    <View style={{ width: sw80 }}>
                      {filterVisible ? null : <Image source={LocalAssets.tooltip.filter} style={tooltipStyle} />}
                      <View style={centerVertical}>
                        <IconButton
                          color={filterColor}
                          onPress={handlePressFilter}
                          name={filterIcon}
                          size={filterIconSize}
                          style={filterContainer}
                        />
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
