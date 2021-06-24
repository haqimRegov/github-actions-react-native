import React, { FunctionComponent, useState } from "react";
import { Image, ImageStyle, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { ActionButtons, CustomSpacer, IconButton, IconInput } from "../../../../components";
import { Language } from "../../../../constants";
import {
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexRow,
  fs16SemiBoldBlack2,
  fs24BoldBlue2,
  fullWidth,
  px,
  sh16,
  sh24,
  sh32,
  sh34,
  sh38,
  sh40,
  sh48,
  sh8,
  shadowBlack5,
  sw1,
  sw100,
  sw218,
  sw24,
  sw48,
  sw80,
  sw84,
} from "../../../../styles";
import { AnimationUtils } from "../../../../utils";
import { TransactionsFilter } from "./Filter";

// import { AnimationUtils } from "../../../../utils";
const { DASHBOARD_FILTER, DASHBOARD_HOME } = Language.PAGE;
interface ApplicationHistoryHeaderProps {
  activeTab: TransactionsTabType;
  filter: ITransactionsFilter;
  filterVisible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleResetFilter: () => void;
  handleSearch: () => void;
  handleShowFilter: () => void;
  inputSearch: string;
  setFilter: (value: ITransactionsFilter) => void;
  setInputSearch: (value: string) => void;
}

export const ApplicationHistoryHeader: FunctionComponent<ApplicationHistoryHeaderProps> = ({
  activeTab,
  filterVisible,
  handleCancel,
  handleShowFilter,
  handleConfirm,
  handleResetFilter,
  handleSearch,
  inputSearch,
  filter,
  setInputSearch,
  setFilter,
}: ApplicationHistoryHeaderProps) => {
  // TODO hide show all pills is only 1 line
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);
  // const [showMorePills, setShowMorePills] = useState<boolean>(false);
  // const [filter, setFilter] = useState<ITransactionsFilter>(selectedFilter);

  // const filterValues = Object.values(filter)
  //   .flat(1)
  //   .filter((value) => value !== "");

  const handlePressFilter = () => {
    if (searchInputRef !== null) {
      searchInputRef.blur();
    }
    handleCancel();
    handleShowFilter();
    AnimationUtils.layout({ duration: 180 });
  };

  const handleReset = () => {
    // Alert.alert("cancel");
    // handleCancel();
    handleResetFilter();
    // setFilter(products[productList].filters);
    handleShowFilter();
  };

  const handleApplyFilter = () => {
    handleConfirm();
    handleShowFilter();
    // handlePills();
  };

  // const handleShowAllFilter = () => {
  //   setShowMorePills(!showMorePills);
  // };

  // const handleRemoveFilter = (index: number) => {
  //   const keys = Object.keys(filter);
  //   const [deletedKey] = keys.filter((key: string) => filter[key].includes(filterValues[index]));
  //   const filterClone: ITransactionsFilter = { ...filter };
  //   const updatedFilter = filterClone[deletedKey].filter((filterValue: string) => filterValue !== filterValues[index]);
  //   filterClone[deletedKey] = updatedFilter;
  //   const values = Object.values(updatedFilter);
  //   if (values.flat(1).length === 0) {
  //     setShowMorePills(false);
  //   }
  //   setFilter(filterClone);
  // };

  // const overlay = filterVisible ? fullHeight : {};
  // const overflow: ViewStyle = showMorePills ? {} : { height: sh48, overflow: "hidden" };

  const pageContainer: ViewStyle = {
    ...fullWidth,
    // ...overlay,
    backgroundColor: colorTransparent,
    left: 0,
    position: "absolute",
    top: 0,
    zIndex: 1,
  };

  const container: ViewStyle = {
    ...shadowBlack5,
    backgroundColor: colorWhite._1,
    marginHorizontal: sw24,
    marginBottom: sh24,
    borderRadius: sw24,
  };

  const filterBGColor = filterVisible ? colorBlue._2 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._2 : colorGray._3;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._2;

  const filterIcon = filterVisible ? "close" : "filter";
  const filterIconSize = filterVisible ? sh32 : sh24;
  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw48, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const tooltipStyle: ImageStyle = { height: sh34, width: sw84, position: "absolute", zIndex: 1, bottom: sh38 };

  const inputStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.39 };
  // const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  return (
    <View style={pageContainer}>
      <CustomSpacer space={sh24} />
      <View style={container}>
        <View>
          <View style={px(sw24)}>
            <CustomSpacer space={sh32} />
            <Text style={fs24BoldBlue2}>{DASHBOARD_HOME.LABEL_HEADER}</Text>
            <CustomSpacer space={sh16} />
            <View style={{ ...centerVertical, ...flexRow }}>
              <IconInput
                autoCorrect={false}
                icon="search"
                iconInputRef={searchInputRef}
                onChangeText={setInputSearch}
                onSubmitEditing={handleSearch}
                placeholder={DASHBOARD_HOME.LABEL_FILTER_PENDING}
                placeholderTextColor={colorBlue._3_6}
                returnKeyType="search"
                setIconInputRef={setSearchInputRef}
                style={inputStyle}
                value={inputSearch}
                viewStyle={{ borderRadius: sw100, height: sh48 }}
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
          {/* {filterVisible || filterValues.length === 0 ? null : (
            <View style={px(sw24)}>
              <View style={flexRow}>
                <ButtonSelectionList
                  buttonStyle={{ marginRight: undefined, marginTop: sh16 }}
                  data={filterValues}
                  icon="close-circle"
                  onPress={handleRemoveFilter}
                  spaceBetween={sw8}
                  style={{ ...overflow, width: sw729 }}
                />
                <View>
                  <CustomSpacer space={sh24} />
                  <LinkText onPress={handleShowAllFilter} text={showLabel} />
                </View>
              </View>
            </View>
          )} */}
          {/* <Collapsible collapsed={!filterVisible} duration={300}> */}
          {filterVisible ? (
            <View>
              <TransactionsFilter filter={filter} activeTab={activeTab} setFilter={setFilter} />
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
          {/* </Collapsible> */}
          <CustomSpacer space={sh24} />
        </View>
      </View>
      {filterVisible ? <CustomSpacer space={sh24} /> : null}
    </View>
  );
};
