import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, ImageStyle, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CustomSpacer, IconButton, IconInput, LinkText, Tag } from "../../../../components";
import { Language } from "../../../../constants";
import {
  absolutePosition,
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  flexWrap,
  fs12BoldBlue2,
  fs12SemiBoldBlue38,
  fs16SemiBoldBlack2,
  fullWidth,
  justifyContentEnd,
  px,
  sh118,
  sh120,
  sh16,
  sh2,
  sh24,
  sh32,
  sh34,
  sh38,
  sh40,
  sh48,
  shadowBlack5,
  sw1,
  sw100,
  sw218,
  sw24,
  sw30,
  sw48,
  sw696,
  sw8,
  sw80,
  sw84,
} from "../../../../styles";
import { ProductFilter, ProductFilterProps } from "./Filter";

const { PRODUCT_LIST, PRODUCT_FILTER } = Language.PAGE;
interface ProductHeaderProps extends ProductFilterProps {
  filterVisible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleSearch: () => void;
  handleShowFilter: () => void;
  handleUpdateFilter: (value: IProductFilter) => void;
  inputSearch: string;
  setInputSearch: (value: string) => void;
}

export const ProductHeader: FunctionComponent<ProductHeaderProps> = ({
  handleShowFilter,
  filterVisible,
  handleCancel,
  handleConfirm,
  handleUpdateFilter,
  handleSearch,
  inputSearch,
  setInputSearch,
  ...filterProps
}: ProductHeaderProps) => {
  const { filter } = filterProps;
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);
  const [showMorePills, setShowMorePills] = useState<boolean>(false);

  const filterKeys = Object.keys(filter);

  const generatePillLabel = (filterKey: string, value: string) => {
    switch (filterKey as ProductFilterType) {
      case "epfApproved":
        return `${PRODUCT_FILTER.LABEL_EPF}: ${value}`;
      case "shariahApproved":
        return `${PRODUCT_FILTER.LABEL_TYPE}: ${value === "Yes" ? "Shariah" : "Conventional"}`;
      case "fundType":
        return `${PRODUCT_FILTER.LABEL_FUND_TYPE}: ${value}`;
      case "fundCurrency":
        return `${PRODUCT_FILTER.LABEL_FUND_CURRENCY}: ${value}`;
      case "issuingHouse":
        return `${PRODUCT_FILTER.LABEL_ISSUING}: ${value}`;
      case "riskCategory":
        return `${PRODUCT_FILTER.LABEL_RISK}: ${value}`;
      case "conventional":
        return `${PRODUCT_FILTER.LABEL_TYPE}: ${value === "Yes" ? "Conventional" : "Shariah"}`;

      default:
        return "";
    }
  };

  const newPills = filterKeys.map((key) => {
    const filtered = filter[key].filter((value) => value !== "");
    const pillValues = filtered.map((value) => generatePillLabel(key, value));
    return { key: key, values: filtered, pillValues: pillValues };
  });

  const handlePressFilter = () => {
    if (searchInputRef !== null) {
      searchInputRef.blur();
    }
    handleShowFilter();
    setShowMorePills(false);
  };

  const handleCancelFilter = () => {
    handleCancel();
    handleShowFilter();
  };

  const handleApplyFilter = () => {
    handleConfirm();
    handleShowFilter();
  };

  const handleShowAllFilter = () => {
    setShowMorePills(!showMorePills);
  };
  const pillList = newPills.map(({ pillValues }) => pillValues).flat();

  const handleRemoveFilter = (pill: string) => {
    const findPill = newPills.findIndex((pills) => pills.pillValues.includes(pill));
    const { key, pillValues, values } = newPills[findPill];
    const filterClone: IProductFilter = { ...filter };
    const updatedFilter = filterClone[key].filter((filterValue: string) => filterValue !== values[pillValues.indexOf(pill)]);
    filterClone[key] = updatedFilter;
    handleUpdateFilter(filterClone);
  };

  const overflow: ViewStyle = showMorePills ? {} : { height: sh40, overflow: "hidden" };

  const container: ViewStyle = {
    ...absolutePosition,
    ...shadowBlack5,
    ...fullWidth,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw24,
    borderBottomRightRadius: sw24,
    marginBottom: sh24,
    top: sh120,
    zIndex: 1,
  };

  const shadowFix: ViewStyle = {
    ...absolutePosition,
    ...fullWidth,
    backgroundColor: colorWhite._1,
    height: sh2,
    top: sh118,
    zIndex: 2,
  };

  const filterBGColor = filterVisible ? colorBlue._2 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._2 : colorGray._3;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._2;
  const filterIcon = filterVisible ? "close" : "filter";
  const filterIconSize = filterVisible ? sh32 : sh24;
  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw48, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const tooltipStyle: ImageStyle = { height: sh34, width: sw84, position: "absolute", zIndex: 1, bottom: sh38 };

  const inputStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.39 };

  const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  return (
    <Fragment>
      <View style={shadowFix} />
      <View style={container}>
        <CustomSpacer space={sh24} />
        <View style={{ ...centerVertical, ...flexRow }}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <IconInput
            autoCorrect={false}
            icon="search"
            iconInputRef={searchInputRef}
            onChangeText={setInputSearch}
            onSubmitEditing={handleSearch}
            placeholder={PRODUCT_LIST.INPUT_SEARCH_PLACEHOLDER}
            placeholderTextColor={colorBlack._2_5}
            returnKeyType="search"
            setIconInputRef={setSearchInputRef}
            style={inputStyle}
            value={inputSearch}
            viewStyle={{ borderRadius: sw100, height: sh48 }}
          />
          <View style={{ width: sw80 }}>
            {filterVisible ? null : <Image source={LocalAssets.tooltip.filter} style={tooltipStyle} />}
            <View style={centerVertical}>
              <IconButton color={filterColor} onPress={handlePressFilter} name={filterIcon} size={filterIconSize} style={filterContainer} />
            </View>
          </View>
          <CustomSpacer isHorizontal={true} space={sw24} />
        </View>
        {filterVisible || pillList.length === 0 ? null : (
          <View style={px(sw24)}>
            <View style={flexRow}>
              <View style={{ ...flexRow, ...flexWrap, ...overflow, width: sw696 }}>
                {pillList.map((pill: string, index: number) => {
                  const handlePress = () => {
                    handleRemoveFilter(pill);
                  };
                  return (
                    <Fragment key={index}>
                      {index === 0 ? null : <CustomSpacer isHorizontal={true} space={sw8} />}
                      <Tag
                        color="secondary"
                        icon="close"
                        onPress={handlePress}
                        text={pill}
                        textStyle={fs12SemiBoldBlue38}
                        style={{ marginRight: undefined, marginTop: sh16 }}
                      />
                    </Fragment>
                  );
                })}
              </View>
              <CustomSpacer isHorizontal={true} space={sw30} />
              <View style={{ ...justifyContentEnd, height: sh40 }}>
                <LinkText onPress={handleShowAllFilter} text={showLabel} style={{ ...fs12BoldBlue2, height: sh24, lineHeight: sh24 }} />
              </View>
            </View>
          </View>
        )}
        <Collapsible collapsed={!filterVisible} duration={300}>
          <ProductFilter {...filterProps} />
          <CustomSpacer space={sh40} />
          <ActionButtons
            buttonContainerStyle={centerHorizontal}
            cancelButtonStyle={{ width: sw218 }}
            continueButtonStyle={{ width: sw218 }}
            labelContinue={PRODUCT_FILTER.BUTTON_APPLY}
            handleCancel={handleCancelFilter}
            handleContinue={handleApplyFilter}
          />
          <CustomSpacer space={sh16} />
        </Collapsible>
        <CustomSpacer space={sh24} />
      </View>
    </Fragment>
  );
};
