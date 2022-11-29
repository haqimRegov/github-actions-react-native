import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, ImageStyle, LayoutChangeEvent, Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CustomSpacer, CustomTextInput, IconButton, StatusBadge } from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { transactionsInitialState } from "../../../../store";
import {
  absolutePosition,
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorTransparent,
  colorWhite,
  disabledOpacity6,
  flexChild,
  flexRow,
  flexWrap,
  fs12BoldBlue1,
  fs12BoldBlue8,
  fs12RegBlue5,
  fs24BoldBlue1,
  fullWidth,
  px,
  sh16,
  sh20,
  sh24,
  sh32,
  sh34,
  sh36,
  sh40,
  sh8,
  shadow12Black112,
  sw1,
  sw12,
  sw218,
  sw24,
  sw28,
  sw32,
  sw48,
  sw56,
  sw64,
  sw692,
  sw8,
  sw80,
  sw84,
} from "../../../../styles";
import { AnimationUtils } from "../../../../utils";
import { TransactionsFilter } from "./Filter";

// import { AnimationUtils } from "../../../../utils";
const { DASHBOARD_FILTER, DASHBOARD_HOME } = Language.PAGE;
interface ApplicationHistoryHeaderProps {
  activeTab: TransactionsTabType;
  availableFilters: ITransactionsAvailableFilter;
  currentFilter: ITransactionsFilter;
  filterVisible: boolean;
  handleCancel: () => void;
  handleConfirm: (tempFilter?: ITransactionsFilter) => void;
  handleResetFilter: () => void;
  handleSearch: () => void;
  handleShowFilter: () => void;
  inputSearch: string;
  isNotFiltered: boolean;
  isLoading: boolean;
  prevSearch: string;
  setFilter: (value: ITransactionsFilter) => void;
  setInputSearch: (value: string) => void;
  tempFilter: ITransactionsFilter;
}

export const ApplicationHistoryHeader: FunctionComponent<ApplicationHistoryHeaderProps> = ({
  activeTab,
  availableFilters,
  currentFilter,
  filterVisible,
  handleCancel,
  handleConfirm,
  handleResetFilter,
  handleSearch,
  handleShowFilter,
  inputSearch,
  isNotFiltered,
  isLoading,
  prevSearch,
  setFilter,
  setInputSearch,
  tempFilter,
}: ApplicationHistoryHeaderProps) => {
  // TODO hide show all pills is only 1 line
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

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

  const handleClearAll = () => {
    handleResetFilter();
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setContainerWidth(width);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleSearchFunction = () => {
    if (prevSearch !== "" && inputSearch !== "" && prevSearch !== inputSearch && isNotFiltered === false) {
      handleResetFilter();
    }
    handleSearch();
  };

  const filterKeys: TransactionsFilterType[] = Object.keys(currentFilter) as TransactionsFilterType[];
  let updatedKeys: TransactionsFilterType[] = filterKeys;
  if (currentFilter.startDate === undefined || currentFilter.endDate === undefined) {
    updatedKeys = filterKeys.filter(
      (eachFilterKey: TransactionsFilterType) => eachFilterKey !== "startDate" && eachFilterKey !== "endDate",
    );
  } else if (currentFilter.startDate !== undefined && currentFilter.endDate !== undefined) {
    updatedKeys = filterKeys.filter((eachFilterKey: TransactionsFilterType) => eachFilterKey !== "endDate");
  }

  const generatePillLabel = (filterKey: string, value: string) => {
    switch (filterKey as TransactionsFilterType) {
      case "dateSorting":
        return { label: DASHBOARD_HOME.LABEL_DATE, value, key: "dateSorting" };
      case "startDate": {
        const formattedEndDate = moment(currentFilter.endDate).format(DEFAULT_DATE_FORMAT);
        const updatedValue = `${value} - ${formattedEndDate}`;
        return { label: DASHBOARD_HOME.LABEL_DATE_RANGE, value: updatedValue, key: "startDate" };
      }
      case "accountType":
        return { label: DASHBOARD_HOME.LABEL_ACCOUNT_TYPE, value, key: "accountType" };
      case "orderStatus":
        return { label: DASHBOARD_HOME.LABEL_STATUS, value, key: "orderStatus" };
      case "transactionsType":
        return { label: DASHBOARD_HOME.LABEL_TRANSACTION, value, key: "transactionsType" };
      default:
        return {};
    }
  };

  const newPills = updatedKeys
    .filter((eachKey: TransactionsFilterType) => currentFilter[eachKey] !== undefined && currentFilter[eachKey] !== "")
    .map((key) => {
      const checkArray: string[] =
        typeof currentFilter[key] === "object" ? (currentFilter[key] as string[]) : ([currentFilter[key]] as string[]);
      const dataArray: string[] =
        typeof currentFilter[key] === "object" && (key === "endDate" || key === "startDate")
          ? [moment(currentFilter[key]).format(DEFAULT_DATE_FORMAT)]
          : checkArray;
      const pillValues = dataArray.map((value) => generatePillLabel(key, value));
      return pillValues;
    });
  const pillList = newPills.map((pillValues) => pillValues).flat();

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
  const pillsContainer: ViewStyle = {
    ...flexRow,
    ...flexWrap,
    maxWidth: 722,
    height: showAll === true ? "auto" : sh40,
    overflow: showAll === true ? "visible" : "hidden",
  };
  const filterBGColor = filterVisible ? colorBlue._1 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._1 : colorBlue._4;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._1;

  const filterIcon = filterVisible ? "close" : "filter";
  const filterIconSize = filterVisible ? sw32 : sw28;
  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw48, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const tooltipStyle: ImageStyle = { height: sh34, width: sw84, position: "absolute", zIndex: 1, bottom: sh36 };
  const showAllText = showAll === false ? DASHBOARD_HOME.LABEL_SHOW_ALL : DASHBOARD_HOME.LABEL_HIDE;
  const checkAction = isLoading === true ? "none" : "auto";
  const disabledStyle: ViewStyle = isLoading === true ? disabledOpacity6 : {};

  // const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  return (
    <View style={pageContainer}>
      <CustomSpacer space={sh24} />
      <View style={container}>
        <View>
          <View style={px(sw24)}>
            <CustomSpacer space={sh32} />
            <Text style={fs24BoldBlue1}>{DASHBOARD_HOME.LABEL_HEADER}</Text>
            <CustomSpacer space={sh16} />
            <View style={{ ...centerVertical, ...flexRow }}>
              <CustomTextInput
                autoCorrect={false}
                containerStyle={flexChild}
                disabled={filterVisible || isLoading}
                leftIcon={{ name: "search" }}
                onChangeText={setInputSearch}
                onSubmitEditing={handleSearchFunction}
                placeholder={DASHBOARD_HOME.LABEL_FILTER_PENDING}
                returnKeyType="search"
                setRef={setSearchInputRef}
                value={inputSearch}
                viewStyle={{ width: sw692 }}
              />
              <View style={{ width: sw80, ...disabledStyle }} pointerEvents={checkAction}>
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
            {pillList.length > 0 && filterVisible === false ? (
              <View style={{ ...flexChild, ...flexRow, ...disabledStyle }} pointerEvents={checkAction}>
                <View style={pillsContainer} onLayout={handleLayout}>
                  {pillList.map((pill, index: number) => {
                    const handlePress = () => {
                      let updatedFilter = { ...currentFilter };
                      if (pill.key === "startDate") {
                        updatedFilter = {
                          ...updatedFilter,
                          startDate: undefined,
                          endDate: new Date(),
                          dateSorting: "",
                        };
                      } else {
                        const filterPillKey = pill.key as TransactionsFilterType;
                        const isKeyArray = filterPillKey !== "dateSorting" && filterPillKey !== "endDate" && filterPillKey !== "startDate";
                        const updatedPill = isKeyArray
                          ? currentFilter[filterPillKey]!.filter((eachFilter) => eachFilter !== pill.value)
                          : transactionsInitialState[activeTab].filter[filterPillKey];
                        updatedFilter = { ...updatedFilter, [filterPillKey]: updatedPill };
                      }
                      handleConfirm(updatedFilter);
                    };
                    return (
                      <Fragment key={index}>
                        {index === 0 ? null : <CustomSpacer isHorizontal={true} space={sw8} />}
                        <StatusBadge
                          color="secondary"
                          icon="close"
                          onPress={handlePress}
                          prefix={pill.label}
                          prefixStyle={fs12RegBlue5}
                          text={pill.value!}
                          textStyle={fs12BoldBlue1}
                          style={{ marginRight: undefined, marginTop: sh16 }}
                        />
                      </Fragment>
                    );
                  })}
                  {pillList.length > 0 ? (
                    <Fragment>
                      <CustomSpacer isHorizontal={true} space={sw12} />
                      <TouchableWithoutFeedback onPress={handleClearAll}>
                        <View
                          style={{
                            ...centerHV,
                            marginTop: sh16,
                            height: sh24,
                            borderBottomColor: colorBlue._8,
                            borderBottomWidth: sw1,
                          }}>
                          <Text style={{ ...fs12BoldBlue8 }}>Clear All</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </Fragment>
                  ) : null}
                </View>
                {containerWidth === 722 ? (
                  <View>
                    <TouchableWithoutFeedback onPress={handleShowAll}>
                      <View style={{ width: sw56, ...centerHV }}>
                        <CustomSpacer space={sh20} />
                        <Text style={{ ...centerHV, ...fs12BoldBlue1 }}>{showAllText}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                ) : (
                  <CustomSpacer isHorizontal={true} space={sw64} />
                )}
              </View>
            ) : null}
          </View>
          {filterVisible ? (
            <View>
              <TransactionsFilter availableFilters={availableFilters} filter={tempFilter} activeTab={activeTab} setFilter={setFilter} />
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
