import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, ImageStyle, Text, TextInput, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CustomSpacer, CustomTextInput, IconButton, LinkText, StatusBadge } from "../../../../components";
import { Language } from "../../../../constants";
import { getProductTabType } from "../../../../helpers";
import {
  absolutePosition,
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  flexWrap,
  fs12BoldBlue1,
  fs24BoldBlue1,
  fullWidth,
  justifyContentEnd,
  px,
  sh118,
  sh16,
  sh2,
  sh24,
  sh34,
  sh36,
  sh40,
  sh8,
  shadow12Black112,
  sw1,
  sw218,
  sw24,
  sw28,
  sw30,
  sw32,
  sw48,
  sw692,
  sw696,
  sw8,
  sw80,
  sw84,
} from "../../../../styles";
import { isNotEmpty } from "../../../../utils";
import { ProductFilter, ProductFilterProps } from "./Filter";

const { PRODUCT_LIST, PRODUCT_FILTER } = Language.PAGE;
interface ProductHeaderProps extends ProductFilterProps {
  accountDetails: INewSalesAccountDetails;
  availableFilters: IProductAvailableFilter;
  currentFilter: IProductFilter;
  filterVisible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleResetFilter: () => void;
  handleSearch: () => void;
  handleShowFilter: () => void;
  handleUpdateFilter: (value: IProductFilter) => void;
  inputSearch: string;
  isNotFiltered: boolean;
  prevSearch: string;
  setInputSearch: (value: string) => void;
}

export const ProductHeader: FunctionComponent<ProductHeaderProps> = ({
  accountDetails,
  currentFilter,
  handleShowFilter,
  filterVisible,
  handleCancel,
  handleConfirm,
  handleResetFilter,
  handleUpdateFilter,
  handleSearch,
  inputSearch,
  isNotFiltered,
  prevSearch,
  setInputSearch,
  ...filterProps
}: ProductHeaderProps) => {
  const { accountNo, fundType } = accountDetails;
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);
  const [showMorePills, setShowMorePills] = useState<boolean>(false);
  const filterKeys = isNotEmpty(currentFilter) ? Object.keys(currentFilter) : [];

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
    const filtered = currentFilter[key].filter((value) => value !== "");
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
    const filterClone: IProductFilter = { ...currentFilter };
    const updatedFilter = filterClone[key].filter((filterValue: string) => filterValue !== values[pillValues.indexOf(pill)]);
    filterClone[key] = updatedFilter;
    handleUpdateFilter(filterClone);
  };

  const handleSearchFunction = () => {
    if (prevSearch !== "" && inputSearch !== "" && prevSearch !== inputSearch && isNotFiltered === false) {
      handleResetFilter();
    }
    handleSearch();
  };

  const handleHeader = () => {
    switch (filterProps.productType) {
      case "ut":
        return PRODUCT_LIST.LABEL_HEADER_UNIT_TRUST;
      case "prs":
        return PRODUCT_LIST.LABEL_HEADER_PRS_SELF;
      case "prsDefault":
        return PRODUCT_LIST.LABEL_HEADER_PRS_DEFAULT;
      default:
        return PRODUCT_LIST.LABEL_HEADER_UNIT_TRUST;
    }
  };

  const headerLabel = accountNo !== "" ? handleHeader() : PRODUCT_LIST.HEADING;

  const overflow: ViewStyle = showMorePills ? {} : { height: sh40, overflow: "hidden" };

  const container: ViewStyle = {
    ...absolutePosition,
    ...shadow12Black112,
    ...fullWidth,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    marginBottom: sh24,
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

  const filterBGColor = filterVisible ? colorBlue._1 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._1 : colorBlue._4;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._1;
  const filterIcon = filterVisible ? "close" : "filter";
  const filterIconSize = filterVisible ? sw32 : sw28;
  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw48, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const tooltipStyle: ImageStyle = { height: sh34, width: sw84, position: "absolute", zIndex: 1, bottom: sh36 };

  const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  return (
    <Fragment>
      <View style={shadowFix} />
      <View style={container}>
        <View style={{ ...px(sw24), marginTop: sh24 }}>
          <Text style={fs24BoldBlue1}>{headerLabel}</Text>
        </View>
        <CustomSpacer space={sh8} />
        <View style={{ ...centerVertical, ...flexRow }}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <CustomTextInput
            autoCorrect={false}
            containerStyle={flexChild}
            disabled={filterVisible}
            leftIcon={{ name: "search" }}
            onChangeText={setInputSearch}
            onSubmitEditing={handleSearchFunction}
            placeholder={PRODUCT_LIST.INPUT_SEARCH_PLACEHOLDER}
            placeholderTextColor={colorBlue._5}
            returnKeyType="search"
            setRef={setSearchInputRef}
            value={inputSearch}
            viewStyle={{ width: sw692 }}
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
                  const checkDisabled = () => {
                    switch (pill) {
                      case "Fund House: KENANGA INVESTORS BERHAD":
                        if (filterProps.productType === "amp") {
                          return true;
                        }
                        return false;
                      case "EPF Approved: Yes":
                      case "EPF Approved: No":
                        if (accountNo !== "") {
                          return true;
                        }
                        return false;
                      case "Type: Conventional":
                      case "Type: Shariah":
                        if (getProductTabType(fundType) === "prsDefault") {
                          return true;
                        }
                        return false;
                      default:
                        return false;
                    }
                  };
                  return (
                    <Fragment key={index}>
                      {index === 0 ? null : <CustomSpacer isHorizontal={true} space={sw8} />}
                      <StatusBadge
                        disabled={checkDisabled()}
                        color="secondary"
                        icon="close"
                        onPress={handlePress}
                        text={pill}
                        style={{ marginRight: undefined, marginTop: sh16 }}
                      />
                    </Fragment>
                  );
                })}
              </View>
              <CustomSpacer isHorizontal={true} space={sw30} />
              <View style={{ ...justifyContentEnd, height: sh40 }}>
                <LinkText onPress={handleShowAllFilter} text={showLabel} style={{ ...fs12BoldBlue1, height: sh24 }} />
              </View>
            </View>
          </View>
        )}
        <Collapsible collapsed={!filterVisible} duration={300}>
          <ProductFilter accountDetails={accountDetails} {...filterProps} />
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
