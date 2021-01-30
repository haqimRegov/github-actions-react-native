import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";
import { ScrollView } from "react-native-gesture-handler";

import { ActionButtons, ButtonSelectionList, CustomSpacer, IconButton, IconInput, LinkText } from "../../../../components";
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
  flexGrow,
  flexRow,
  fs16SemiBoldBlack2,
  fs24BoldBlue2,
  fullHeight,
  fullWidth,
  px,
  sh16,
  sh24,
  sh32,
  sh48,
  shadowBlack5,
  sw1,
  sw100,
  sw218,
  sw24,
  sw40,
  sw729,
  sw8,
} from "../../../../styles";

const { PRODUCT_FILTER, DASHBOARD_HOME } = Language.PAGE;
interface ApplicationHistoryHeaderProps {
  filterVisible: boolean;
  handleFilter: () => void;
  handleSearch: () => void;
  inputSearch: string;
  selectedFilter: IProductFilter;
  setInputSearch: (value: string) => void;
  setSelectedFilter: (value: IProductFilter) => void;
}

export const ApplicationHistoryHeader: FunctionComponent<ApplicationHistoryHeaderProps> = ({
  filterVisible,
  handleFilter,
  handleSearch,
  inputSearch,
  selectedFilter,
  setInputSearch,
  setSelectedFilter,
}: ApplicationHistoryHeaderProps) => {
  // TODO hide show all pills is only 1 line
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);
  const [showMorePills, setShowMorePills] = useState<boolean>(false);
  const [filter, setFilter] = useState<IProductFilter>(selectedFilter);

  const filterValues = Object.values(selectedFilter)
    .flat(1)
    .filter((value) => value !== "");

  const handlePressFilter = () => {
    if (searchInputRef !== null) {
      searchInputRef.blur();
    }
    handleFilter();
  };

  const handleShowAllFilter = () => {
    setShowMorePills(!showMorePills);
  };

  const handleRemoveFilter = (index: number) => {
    const keys = Object.keys(selectedFilter);
    const [deletedKey] = keys.filter((key: string) => selectedFilter[key].includes(filterValues[index]));
    const filterClone: IProductFilter = { ...selectedFilter };
    const updatedFilter = filterClone[deletedKey].filter((filterValue: string) => filterValue !== filterValues[index]);
    filterClone[deletedKey] = updatedFilter;
    const values = Object.values(updatedFilter);
    if (values.flat(1).length === 0) {
      setShowMorePills(false);
    }
    setSelectedFilter(filterClone);
  };

  const handleCancelFilter = () => {
    setFilter(selectedFilter);
    handleFilter();
  };

  const handleContinueFilter = () => {
    setSelectedFilter(filter);
    handleFilter();
  };

  const overlay = filterVisible ? fullHeight : {};
  const overflow: ViewStyle = showMorePills ? {} : { height: sh48, overflow: "hidden" };

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
    marginHorizontal: sw24,
    marginBottom: sh24,
    borderRadius: sw24,
  };

  const filterBGColor = filterVisible ? colorBlue._2 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._2 : colorGray._3;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._2;

  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw40, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const inputStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.39 };
  const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  useEffect(() => {
    setFilter(selectedFilter);
  }, [selectedFilter]);

  return (
    <View style={pageContainer}>
      <ScrollView bounces={true} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
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
                <CustomSpacer isHorizontal={true} space={sw40} />
                <IconButton color={filterColor} onPress={handlePressFilter} name="filter" size={sh24} style={filterContainer} />
              </View>
            </View>
            {filterVisible || filterValues.length === 0 ? null : (
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
            )}
            <Collapsible collapsed={!filterVisible} duration={300}>
              <CustomSpacer space={sh32} />
              <ActionButtons
                buttonContainerStyle={centerHorizontal}
                cancelButtonStyle={{ width: sw218 }}
                continueButtonStyle={{ width: sw218 }}
                handleCancel={handleCancelFilter}
                handleContinue={handleContinueFilter}
              />
              <CustomSpacer space={sh16} />
            </Collapsible>
            <CustomSpacer space={sh24} />
          </View>
        </View>
        {filterVisible ? <CustomSpacer space={sh24} /> : null}
      </ScrollView>
    </View>
  );
};