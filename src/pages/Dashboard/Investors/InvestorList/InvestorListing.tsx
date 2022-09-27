import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { AdvanceTable, CustomSpacer, EmptyTable } from "../../../../components";
import { Language, NunitoBold, NunitoRegular } from "../../../../constants";
import { getInvestorDashboard } from "../../../../network-actions/dashboard/InvestorDashboard";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../../store";
import {
  centerHV,
  colorBlue,
  flexChild,
  fs10BoldBlue1,
  fs12BoldBlue1,
  fs12RegBlue1,
  fsTransformNone,
  px,
  sh13,
  sh32,
  sw120,
  sw144,
  sw16,
  sw2,
  sw216,
  sw24,
  sw264,
  sw56,
} from "../../../../styles";

const { EMPTY_STATE, DASHBOARD_HOME, DASHBOARD_INVESTORS_LIST } = Language.PAGE;

interface InvestorListingProps extends InvestorsStoreProps {
  activeTab: boolean;
  isFetching: boolean;
  isLogout: boolean;
  setIsFetching: (value: boolean) => void;
  setScreen: (route: InvestorsPageType) => void;
}

const InvestorListingComponent: FunctionComponent<InvestorListingProps> = ({
  all,
  investors,
  isFetching,
  search,
  setIsFetching,
  setScreen,
  updateAllSort,
  updateCurrentInvestor,
  updateInvestors,
  updateInvestorSearch,
}: InvestorListingProps) => {
  const navigation = useNavigation<IStackNavigationProp>();

  const { filter, page, sort } = all;

  const handleRowPress = (_item: ITableData) => {};

  const handleSortInvestorName = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorsSort = sortColumns.includes("name")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "name", value: "descending" };
    updateAllSort([newSort]);
  };

  const handleSortRisk = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorsSort = sortColumns.includes("riskTolerance")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "riskTolerance", value: "descending" };
    updateAllSort([newSort]);
  };

  const handleSortMobile = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorsSort = sortColumns.includes("mobileNo")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "mobileNo", value: "descending" };
    updateAllSort([newSort]);
  };

  const handleSortEmail = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorsSort = sortColumns.includes("email")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "email", value: "descending" };
    updateAllSort([newSort]);
  };

  const handleView = (item: ITableRowData) => {
    updateCurrentInvestor(item.rawData as unknown as IInvestorData);
    updateInvestorSearch("");
    setScreen("InvestorOverview");
  };

  const checkLoading = (functionToBeCalled: () => void) => {
    if (isFetching === false) {
      functionToBeCalled();
    }
  };

  const findInvestorName = sort.filter((sortType) => sortType.column === "name");
  const findRisk = sort.filter((sortType) => sortType.column === "riskTolerance");
  const findMobile = sort.filter((sortType) => sortType.column === "mobileNo");
  const findEmail = sort.filter((sortType) => sortType.column === "email");
  const sortInvestorName = findInvestorName.length > 0 ? findInvestorName[0].value : "ascending";
  const sortRisk = findRisk.length > 0 ? findRisk[0].value : "ascending";
  const sortMobile = findMobile.length > 0 ? findMobile[0].value : "ascending";
  const sortEmail = findEmail.length > 0 ? findEmail[0].value : "ascending";
  const sortedColumns = sort.map((currentSortType) => currentSortType.column);
  const columns: ITableColumn[] = [
    {
      icon: { name: sortInvestorName === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "name",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
            fontFamily: sortedColumns.includes("name") ? NunitoBold : NunitoRegular,
          },
        },
      ],
      onPressHeader: () => checkLoading(handleSortInvestorName),
      textStyle: sortedColumns.includes("name") ? { fontFamily: NunitoBold } : {},
      title: DASHBOARD_INVESTORS_LIST.LABEL_INVESTOR_NAME,
      titleStyle: sortedColumns.includes("name") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw216 },
    },
    {
      icon: { name: sortRisk === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "riskTolerance",
          textStyle: {
            fontFamily: sortedColumns.includes("riskTolerance") ? NunitoBold : NunitoRegular,
          },
        },
      ],
      onPressHeader: () => checkLoading(handleSortRisk),
      textStyle: sortedColumns.includes("riskTolerance") ? { fontFamily: NunitoBold } : {},
      title: DASHBOARD_INVESTORS_LIST.LABEL_RISK_CATEGORY,
      titleStyle: sortedColumns.includes("riskTolerance")
        ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 }
        : { ...fsTransformNone },
      viewStyle: { width: sw120 },
    },
    {
      icon: { name: sortMobile === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "mobileNo",
          textStyle: { ...fs12RegBlue1, fontFamily: sortedColumns.includes("mobileNo") ? NunitoBold : NunitoRegular },
        },
      ],
      onPressHeader: () => checkLoading(handleSortMobile),
      textStyle: fsTransformNone,
      title: DASHBOARD_INVESTORS_LIST.LABEL_MOBILE_NO,
      titleStyle: sortedColumns.includes("mobileNo") ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 } : { ...fsTransformNone },
      viewStyle: { width: sw144 },
    },
    {
      icon: { name: sortEmail === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "email",
          textStyle: { ...fs12RegBlue1, fontFamily: sortedColumns.includes("email") ? NunitoBold : NunitoRegular },
        },
      ],
      onPressHeader: () => checkLoading(handleSortEmail),
      textStyle: fsTransformNone,
      title: DASHBOARD_INVESTORS_LIST.LABEL_EMAIL,
      titleStyle: sortedColumns.includes("email") ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 } : { ...fsTransformNone },
      viewStyle: { width: sw264 },
    },
    {
      itemIcon: { color: colorBlue._1, name: "eye-show", size: sw24 },
      key: [],
      onPressItem: handleView,
      title: DASHBOARD_HOME.LABEL_ACTIONS,
      viewStyle: { ...centerHV, width: sw56 },
    },
  ];

  const handleFetch = async () => {
    setIsFetching(true);
    const filterRisk: IInvestorDashboardFilter[] =
      filter.riskProfile.length > 0
        ? filter.riskProfile.map((eachProfile: string) => ({ column: "riskTolerance", value: eachProfile }))
        : [];
    const defaultSort: IInvestorsSort[] = sort.length === 0 ? [{ column: "name", value: "descending" }] : sort;

    const request: IInvestorDashboardRequest = {
      tab: "all",
      page: page,
      search: search,
      sort: defaultSort,
      filter: [...filterRisk],
    };
    const investorDashboardResponse: IInvestorDashboardResponse = await getInvestorDashboard(request, navigation, setIsFetching);
    if (investorDashboardResponse !== undefined) {
      const { data, error } = investorDashboardResponse;
      if (error === null && data !== null) {
        const { pages, investors: investorsResponse, totalCount } = data.result;

        updateInvestors({
          ...investors,
          all: {
            ...investors.all,
            investors: investorsResponse,
            page: data.result.page,
            pages: pages,
          },
          allCount: totalCount,
          currentAccount: undefined,
          currentInvestor: undefined,
        });
        setIsFetching(false);
      }
      if (error !== null) {
        setIsFetching(false);
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, page, filter]);

  const noResults = search !== undefined && search !== "";
  const title = noResults === true ? EMPTY_STATE.LABEL_NO_RESULTS : DASHBOARD_INVESTORS_LIST.LABEL_EMPTY_TITLE;
  const subtitle = noResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : DASHBOARD_INVESTORS_LIST.LABEL_EMPTY_SUBTITLE;
  const hintText = noResults === true ? EMPTY_STATE.SUBTITLE : DASHBOARD_INVESTORS_LIST.LABEL_EMPTY_CONTENT;

  return (
    <View style={{ ...flexChild, ...px(sw16) }}>
      <AdvanceTable
        columns={columns}
        data={isFetching === true ? [] : (all.investors as unknown as ITableData[])}
        handleRowNavigation={handleRowPress}
        RenderEmptyState={() => (
          <EmptyTable
            hintContainerStyle={{ borderBottomWidth: sw2, borderBottomColor: colorBlue._1 }}
            hintText={hintText}
            hintTextStyle={{ ...fs12BoldBlue1 }}
            loading={isFetching}
            illustration={LocalAssets.illustration.investorsEmpty}
            title={title}
            subtitle={subtitle}
            subtitleStyle={fs12RegBlue1}
          />
        )}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const InvestorListing = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorListingComponent);
