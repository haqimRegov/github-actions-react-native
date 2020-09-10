import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";
import { ScrollView } from "react-native-gesture-handler";

import { ActionButtons, ButtonSelectionList, CustomSpacer, IconButton, IconInput, LinkText } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
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
  sw218,
  sw24,
  sw40,
  sw729,
  sw8,
  sw85,
} from "../../../../styles";
import { ProductFilter } from "./Filter";

const { PRODUCT_FILTER, PRODUCT_LIST } = Language.PAGE;
interface ProductHeaderProps {
  filterVisible: boolean;
  handleFilter: () => void;
  inputSearch: string;
  selectedFilter: IProductFilter;
  setInputSearch: (value: string) => void;
  setSelectedFilter: (value: IProductFilter) => void;
  setShowMore: (value: boolean) => void;
  showMore: boolean;
}

export const ProductHeader: FunctionComponent<ProductHeaderProps> = ({
  filterVisible,
  handleFilter,
  inputSearch,
  selectedFilter,
  setInputSearch,
  setSelectedFilter,
  setShowMore,
  showMore,
}: ProductHeaderProps) => {
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
    borderRadius: sw24,
  };

  const filterBGColor = filterVisible ? colorRed._1 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorRed._1 : colorGray._3;
  const filterColor = filterVisible ? colorWhite._1 : colorBlack._1;

  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw40, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const inputStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.39 };
  const filterToolTip: TextStyle = { top: -30, zIndex: 1, position: "absolute" };
  const toolTipLabel: TextStyle = { position: "absolute", top: 0, left: 0, right: 0, bottom: 8, ...centerHV };
  const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  useEffect(() => {
    setFilter(selectedFilter);
  }, [selectedFilter]);

  return (
    <View style={pageContainer}>
      <ScrollView
        bounces={showMore}
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <CustomSpacer space={sh24} />
        <View style={container}>
          <View>
            <View style={px(sw24)}>
              <CustomSpacer space={sh32} />
              <Text style={fs24BoldBlue2}>{PRODUCT_LIST.HEADING}</Text>
              <CustomSpacer space={sh16} />
              <View style={{ ...centerVertical, ...flexRow }}>
                <IconInput
                  icon="search"
                  onChangeText={setInputSearch}
                  placeholder={PRODUCT_LIST.INPUT_SEARCH_PLACEHOLDER}
                  placeholderTextColor={colorBlack._2_5}
                  setRef={setSearchInputRef}
                  style={inputStyle}
                  value={inputSearch}
                  viewStyle={{ borderRadius: sw100, height: sh48 }}
                />
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
              <ProductFilter filter={filter} showMore={showMore} setFilter={setFilter} setShowMore={setShowMore} />
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
        <CustomSpacer space={sh24} />
        {filterVisible ? <CustomSpacer space={sh24} /> : null}
      </ScrollView>
    </View>
  );
};
