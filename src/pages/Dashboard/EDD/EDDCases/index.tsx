import React, { FunctionComponent, useState } from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, Pagination, TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../store/EDD";
import { borderBottomGray2, colorWhite, flexChild, flexRow, fullHW, sh153, sh16, sh24, shadow12Black112, sw24 } from "../../../../styles";
import { DashboardLayout } from "../../DashboardLayout";
import { EDDDashboardHeader } from "./Header";
import { HistoryTab } from "./HistoryTab";
import { NewCasesTab } from "./NewCaseTab";

const { DASHBOARD_EDD } = Language.PAGE;

interface EDDCasesProps extends EDDStoreProps {
  activeTab: EDDTabType;
  isLogout: boolean;
  navigation: IStackNavigationProp;
  setActiveTab: (route: EDDTabType) => void;
  setScreen: (route: EDDPageType) => void;
}

export const EDDCasesComponent: FunctionComponent<EDDCasesProps> = (props: EDDCasesProps) => {
  const {
    activeTab,
    edd,
    navigation,
    resetHistoryFilter,
    resetNewCasesFilter,
    search,
    setActiveTab,
    setScreen,
    updateCases,
    updateHistoryFilter,
    updateNewCasesFilter,
    updateEDDSearch,
  } = props;
  const { newCount, historyCount } = edd;

  const { filter, page, pages } = props[activeTab];
  // const fetching = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterTemp, setFilterTemp] = useState<IEDDFilter>(filter);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);

  const tabs: EDDTabType[] = ["new", "history"];
  const activeTabIndex = tabs.indexOf(activeTab);

  const handleTabs = (index: number) => {
    updateEDDSearch("");
    setInputSearch("");
    setActiveTab(tabs[index]);
  };

  const handleNext = () => {
    if (loading === false) {
      updateCases({
        ...edd,
        [activeTab]: {
          ...edd[activeTab],
          page: page + 1,
        },
      });
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      updateCases({
        ...edd,
        [activeTab]: {
          ...edd[activeTab],
          page: page - 1,
        },
      });
    }
  };

  const handleSearch = () => {
    if (filterVisible === false) {
      updateEDDSearch(inputSearch);
    }
  };

  const handleShowFilter = () => {
    if (filterVisible === false) {
      setFilterTemp(filter);
    }
    setFilterVisible(!filterVisible);
  };

  const handleResetFilter = () => {
    switch (activeTab) {
      case "new":
        resetNewCasesFilter();
        break;
      case "history":
        resetHistoryFilter();
        break;
      default:
        resetNewCasesFilter();
        break;
    }
    updateEDDSearch(inputSearch);
  };

  const handleConfirmFilter = () => {
    switch (activeTab) {
      case "new":
        updateNewCasesFilter(filterTemp);
        break;
      case "history":
        updateHistoryFilter(filterTemp);
        break;
      default:
        updateNewCasesFilter(filterTemp);
        break;
    }
    updateEDDSearch(inputSearch);
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
  let content: JSX.Element = <View />;

  if (activeTab === "new") {
    content = <NewCasesTab activeTab={activeTab === "new"} {...tabProps} />;
  } else if (activeTab === "history") {
    content = <HistoryTab {...tabProps} />;
  }

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };

  return (
    <View style={fullHW}>
      <DashboardLayout hideQuickActions={true} scrollEnabled={!filterVisible} {...props}>
        <View style={flexChild}>
          <EDDDashboardHeader
            activeTab={activeTab}
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
              <TabGroup
                activeTab={activeTabIndex}
                containerStyle={borderBottomGray2}
                setActiveTab={handleTabs}
                tabs={[
                  { badgeCount: newCount, text: DASHBOARD_EDD.LABEL_NEW },
                  { badgeCount: historyCount, text: DASHBOARD_EDD.LABEL_HISTORY },
                ]}
              />
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
      </DashboardLayout>
    </View>
  );
};

export const EDDCases = connect(EDDMapStateToProps, EDDMapDispatchToProps)(EDDCasesComponent);
