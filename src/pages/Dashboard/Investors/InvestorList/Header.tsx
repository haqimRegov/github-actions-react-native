import React, { FunctionComponent, useState } from "react";
import { Image, ImageStyle, Text, TextInput, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CustomSpacer, CustomTextInput, IconButton } from "../../../../components";
import { Language } from "../../../../constants";
import {
  absolutePosition,
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs24BoldBlue1,
  fullWidth,
  px,
  sh16,
  sh24,
  sh32,
  sh34,
  sh36,
  sh40,
  sh8,
  shadow12Black112,
  sw1,
  sw218,
  sw24,
  sw48,
  sw692,
  sw80,
  sw84,
} from "../../../../styles";
import { AnimationUtils } from "../../../../utils";
import { InvestorListFilter } from "./Filter";

const { DASHBOARD_FILTER, DASHBOARD_INVESTORS_LIST } = Language.PAGE;
interface IInvestorListHeaderProps {
  filter: IInvestorsFilter;
  filterVisible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleResetFilter: () => void;
  handleSearch: () => void;
  handleShowFilter: () => void;
  inputSearch: string;
  setFilter: (value: IInvestorsFilter) => void;
  setInputSearch: (value: string) => void;
}

export const InvestorListHeader: FunctionComponent<IInvestorListHeaderProps> = ({
  filter,
  filterVisible,
  handleCancel,
  handleConfirm,
  handleResetFilter,
  handleSearch,
  handleShowFilter,
  inputSearch,
  setFilter,
  setInputSearch,
}: IInvestorListHeaderProps) => {
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);

  const handlePressFilter = () => {
    if (searchInputRef !== null) {
      searchInputRef.blur();
    }
    handleCancel();
    handleShowFilter();
    AnimationUtils.layout({ duration: 180 });
  };

  const handleReset = () => {
    handleResetFilter();
    handleShowFilter();
  };

  const handleApplyFilter = () => {
    handleConfirm();
    handleShowFilter();
  };

  const pageContainer: ViewStyle = {
    ...fullWidth,
    ...absolutePosition,
    backgroundColor: colorTransparent,
    left: 0,
    top: 0,
    zIndex: 1,
  };

  const container: ViewStyle = {
    ...shadow12Black112,
    backgroundColor: colorWhite._1,
    marginHorizontal: sw24,
    marginBottom: sh24,
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
      <CustomSpacer space={sh24} />
      <View style={container}>
        <View>
          <View style={px(sw24)}>
            <CustomSpacer space={sh32} />
            <Text style={fs24BoldBlue1}>{DASHBOARD_INVESTORS_LIST.LABEL_INVESTOR_LIST}</Text>
            <CustomSpacer space={sh16} />
            <View style={{ ...centerVertical, ...flexRow }}>
              <CustomTextInput
                autoCorrect={false}
                containerStyle={flexChild}
                leftIcon={{ name: "search" }}
                onChangeText={setInputSearch}
                onSubmitEditing={handleSearch}
                placeholder={DASHBOARD_INVESTORS_LIST.LABEL_INVESTOR_SEARCH}
                returnKeyType="search"
                setRef={setSearchInputRef}
                value={inputSearch}
                viewStyle={{ width: sw692 }}
              />
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
            </View>
          </View>
          {filterVisible ? (
            <View>
              <InvestorListFilter filter={filter} setFilter={setFilter} />
              <CustomSpacer space={sh40} />
              <ActionButtons
                buttonContainerStyle={centerHorizontal}
                cancelButtonStyle={{ width: sw218 }}
                continueButtonStyle={{ width: sw218 }}
                handleCancel={handleReset}
                handleContinue={handleApplyFilter}
                labelCancel={DASHBOARD_FILTER.BUTTON_RESET}
                labelContinue={DASHBOARD_FILTER.BUTTON_APPLY}
              />
              <CustomSpacer space={sh8} />
            </View>
          ) : null}
          <CustomSpacer space={sh24} />
        </View>
      </View>
      {filterVisible ? <CustomSpacer space={sh24} /> : null}
    </View>
  );
};
