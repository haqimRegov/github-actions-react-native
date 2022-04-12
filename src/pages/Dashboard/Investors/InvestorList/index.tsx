import React, { FunctionComponent, useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, Pagination, Tab } from "../../../../components";
import { Language } from "../../../../constants";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../../store/Investors";
import {
  borderBottomGray2,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fullHW,
  sh153,
  sh16,
  sh24,
  sh48,
  shadow12Black112,
  sw24,
} from "../../../../styles";
import { AllInvestors } from "./All";
import { InvestorListHeader } from "./Header";

const { DASHBOARD_INVESTORS_LIST } = Language.PAGE;

interface InvestorDashboardProps extends InvestorsStoreProps {
  activeTab: InvestorsTabType;
  isLogout: boolean;
  navigation: IStackNavigationProp;
  setActiveTab: (route: InvestorsTabType) => void;
  setScreen: (route: InvestorsPageType) => void;
}

export const InvestorDashboardComponent: FunctionComponent<InvestorDashboardProps> = (props: InvestorDashboardProps) => {
  const { activeTab, navigation, investors, search, setScreen, updateSearch, updateAllFilter, resetAllFilter, updateInvestors } = props;
  const { all, allCount } = investors;

  const { filter, page, pages } = props[activeTab];
  const [loading, setLoading] = useState<boolean>(false);
  const [filterTemp, setFilterTemp] = useState<IInvestorsFilter>(filter);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);

  const handleNext = () => {
    if (loading === false) {
      updateInvestors({
        ...investors,
        all: {
          ...all,
          page: page + 1,
        },
      });
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      updateInvestors({
        ...investors,
        all: {
          ...all,
          page: page - 1,
        },
      });
    }
  };

  const handleSearch = () => {
    if (filterVisible === false) {
      updateSearch(inputSearch);
    }
  };

  const handleShowFilter = () => {
    if (filterVisible === false) {
      setFilterTemp(filter);
    }
    setFilterVisible(!filterVisible);
  };

  const handleResetFilter = () => {
    resetAllFilter();
    updateSearch(inputSearch);
  };

  const handleConfirmFilter = () => {
    updateAllFilter(filterTemp);
    updateSearch(inputSearch);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filter);
  };

  const tabProps = {
    setScreen: setScreen,
    navigation: navigation,
    isFetching: loading,
    isLogout: props.isLogout,
    setIsFetching: setLoading,
  };
  const content: JSX.Element = <AllInvestors activeTab={true} {...tabProps} />;

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };

  return (
    <View style={fullHW}>
      <ScrollView contentContainerStyle={flexGrow} showsVerticalScrollIndicator={false}>
        <View style={flexChild}>
          <InvestorListHeader
            filter={filterTemp}
            filterVisible={filterVisible}
            handleCancel={handleCancelFilter}
            handleConfirm={handleConfirmFilter}
            handleResetFilter={handleResetFilter}
            handleSearch={handleSearch}
            handleShowFilter={handleShowFilter}
            inputSearch={inputSearch}
            setFilter={setFilterTemp}
            setInputSearch={setInputSearch}
          />
          <CustomSpacer space={sh24} />
          <View
            style={{
              ...flexChild,
              ...shadow12Black112,
              marginHorizontal: sw24,
              backgroundColor: colorWhite._2,
              borderRadius: sw24,
            }}>
            <CustomSpacer space={sh153} />
            <CustomSpacer space={sh16} />

            <View style={flexRow}>
              <Tab badgeCount={allCount} selected={true} style={{ height: sh48 }} text={DASHBOARD_INVESTORS_LIST.LABEL_ALL} />
              <View style={{ ...flexRow, ...flexChild, ...borderBottomGray2 }}>
                <CustomFlexSpacer />
                <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={page} totalPages={pages} />
                <CustomSpacer isHorizontal={true} space={sw24} />
              </View>
            </View>
            <CustomSpacer space={sh16} />
            <View style={tableContainer}>{content}</View>
          </View>
        </View>
        <CustomSpacer space={sh24} />
      </ScrollView>
    </View>
  );
};

export const InvestorDashboard = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorDashboardComponent);
