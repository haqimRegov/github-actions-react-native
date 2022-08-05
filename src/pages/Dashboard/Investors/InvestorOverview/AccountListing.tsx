import React, { FunctionComponent, useEffect } from "react";
import { Alert, View } from "react-native";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { AdvanceTable, CustomSpacer, EmptyTable } from "../../../../components";
import { NunitoBold, NunitoRegular } from "../../../../constants";
import { Language } from "../../../../constants/language";
import { getInvestorDetailsDashboard } from "../../../../network-actions/dashboard/InvestorDetailsDashboard";
import {
  centerHV,
  flexChild,
  fs10BoldBlue1,
  fs12RegBlue1,
  fsTransformNone,
  px,
  sh13,
  sh32,
  sw104,
  sw136,
  sw16,
  sw176,
  sw224,
  sw56,
} from "../../../../styles";
import { InvestorDetailsCustomTableItem } from "./CustomItems";

const { DASHBOARD_INVESTORS_LIST, INVESTOR_ACCOUNTS } = Language.PAGE;

interface AccountListingProps {
  currentInvestor?: IInvestorData;
  handleBuyNewFund: (item: IInvestorAccountsData) => void;
  handleViewAccount: (account: ICurrentAccount) => void;
  investorData?: IInvestor;
  isFetching: boolean;
  navigation: IStackNavigationProp;
  page: number;
  setForceUpdatePrompt: (value: boolean) => void;
  setInvestorData: (data: IInvestor) => void;
  setIsFetching: (value: boolean) => void;
  setPage: (page: number) => void;
  setPages: (page: number) => void;
  setScreen: (route: InvestorsPageType) => void;
  setSort: (sort: IInvestorAccountsSort[]) => void;
  sort: IInvestorAccountsSort[];
}

export const AccountListing: FunctionComponent<AccountListingProps> = ({
  currentInvestor,
  handleBuyNewFund,
  handleViewAccount,
  investorData,
  isFetching,
  navigation,
  page,
  setForceUpdatePrompt,
  setInvestorData,
  setIsFetching,
  setPage,
  setPages,
  setSort,
  sort,
}: AccountListingProps) => {
  const handleSortInvestorName = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorAccountsSort = sortColumns.includes("name")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "name", value: "descending" };
    setSort([newSort]);
  };

  const handleSortRisk = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorAccountsSort = sortColumns.includes("riskTolerance")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "riskTolerance", value: "descending" };
    setSort([newSort]);
  };

  const handleSortAccountNo = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorAccountsSort = sortColumns.includes("accountNo")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "accountNo", value: "descending" };
    setSort([newSort]);
  };

  const handleSortJointAccount = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorAccountsSort = sortColumns.includes("jointName")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "jointName", value: "descending" };
    setSort([newSort]);
  };

  const handleSortAccountOpening = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IInvestorAccountsSort = sortColumns.includes("accountOpeningDate")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "accountOpeningDate", value: "descending" };
    setSort([newSort]);
  };

  const checkLoading = (functionToBeCalled: () => void) => {
    if (isFetching === false) {
      functionToBeCalled();
    }
  };

  const handleView = (item: ITableRowData) => {
    const data = item.rawData as unknown as IInvestorAccountsData;
    if (investorData !== undefined && data !== undefined && data.accountNo !== undefined) {
      handleViewAccount({ accountNumber: data.accountNo, clientId: data.clientId });
    }
  };

  const findInvestorName = sort.filter((sortType) => sortType.column === "name");
  const findRisk = sort.filter((sortType) => sortType.column === "riskTolerance");
  const findAccountNo = sort.filter((sortType) => sortType.column === "accountNo");
  const findJointAccount = sort.filter((sortType) => sortType.column === "jointName");
  const findAccountOpening = sort.filter((sortType) => sortType.column === "accountOpeningDate");
  const sortInvestorName = findInvestorName.length > 0 ? findInvestorName[0].value : "ascending";
  const sortRisk = findRisk.length > 0 ? findRisk[0].value : "ascending";
  const sortAccountNo = findAccountNo.length > 0 ? findAccountNo[0].value : "ascending";
  const sortJointAccount = findJointAccount.length > 0 ? findJointAccount[0].value : "ascending";
  const sortAccountOpening = findAccountOpening.length > 0 ? findAccountOpening[0].value : "ascending";
  const sortedColumns = sort.map((currentSortType) => currentSortType.column);
  const columns: ITableColumn[] = [
    {
      customItem: true,
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
      viewStyle: { width: sw224 },
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
      viewStyle: { width: sw104 },
    },
    {
      icon: { name: sortAccountNo === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "accountNo",
          textStyle: { ...fs12RegBlue1, fontFamily: sortedColumns.includes("accountNo") ? NunitoBold : NunitoRegular },
        },
      ],
      onPressHeader: () => checkLoading(handleSortAccountNo),
      textStyle: fsTransformNone,
      title: INVESTOR_ACCOUNTS.LABEL_ACCOUNT_NO,
      titleStyle: sortedColumns.includes("accountNo") ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 } : { ...fsTransformNone },
      viewStyle: { width: sw104 },
    },
    {
      icon: { name: sortJointAccount === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "jointName",
          textStyle: { ...fs12RegBlue1, fontFamily: sortedColumns.includes("jointName") ? NunitoBold : NunitoRegular },
        },
      ],
      onPressHeader: () => checkLoading(handleSortJointAccount),
      textStyle: fsTransformNone,
      title: INVESTOR_ACCOUNTS.LABEL_JOINT_ACCOUNT_NAME,
      titleStyle: sortedColumns.includes("jointName") ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 } : { ...fsTransformNone },
      viewStyle: { width: sw176 },
    },
    {
      customItem: true,
      icon: { name: sortAccountOpening === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "accountOpeningDate",
          textStyle: { ...fs12RegBlue1, fontFamily: sortedColumns.includes("accountOpeningDate") ? NunitoBold : NunitoRegular },
        },
      ],
      onPressHeader: () => checkLoading(handleSortAccountOpening),
      textStyle: fsTransformNone,
      title: INVESTOR_ACCOUNTS.LABEL_ACCOUNT_OPENING_DATE,
      titleStyle: sortedColumns.includes("accountOpeningDate")
        ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 }
        : { ...fsTransformNone },
      viewStyle: { width: sw136 },
    },
    {
      customItem: true,
      key: [{ key: "" }],
      title: INVESTOR_ACCOUNTS.LABEL_ACTIONS,
      viewStyle: { ...centerHV, width: sw56 },
    },
  ];

  const handleFetch = async () => {
    setIsFetching(true);
    const defaultSort: IInvestorAccountsSort[] = sort.length === 0 ? [{ column: "name", value: "descending" }] : sort;
    const request: IInvestorDetailsDashboardRequest = {
      idNumber: currentInvestor!.idNumber,
      page: page,
      sort: defaultSort,
      tab: "allAccounts",
    };
    const investorDetailsResponse: IInvestorDetailsDashboardResponse = await getInvestorDetailsDashboard(
      request,
      navigation,
      setIsFetching,
    );
    if (investorDetailsResponse !== undefined) {
      const { data, error } = investorDetailsResponse;
      if (error === null && data !== null) {
        const { page: currentPage, pages, ...updatedInvestorData } = data.result;
        setInvestorData({
          ...investorData,
          ...updatedInvestorData,
        });
        if (data.result.isForceUpdate === true) {
          setForceUpdatePrompt(true);
        }
        setPage(currentPage);
        setPages(pages);
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
  }, [sort, page]);

  const title = DASHBOARD_INVESTORS_LIST.LABEL_EMPTY_TITLE;
  const subtitle = DASHBOARD_INVESTORS_LIST.LABEL_EMPTY_SUBTITLE;
  const hintText = DASHBOARD_INVESTORS_LIST.LABEL_EMPTY_CONTENT;

  return (
    <View style={{ ...flexChild, ...px(sw16) }}>
      <AdvanceTable
        columns={columns}
        data={isFetching === true || investorData === undefined ? [] : (investorData.investorDetails as unknown as ITableData[])}
        RenderCustomItem={(data: ITableCustomItem) => (
          <InvestorDetailsCustomTableItem
            {...data}
            handleBuyNewFund={handleBuyNewFund}
            handleViewAccount={handleView}
            sortedColumns={sortedColumns}
          />
        )}
        RenderEmptyState={() => (
          <EmptyTable
            hintText={hintText}
            loading={isFetching}
            illustration={LocalAssets.illustration.investorsEmpty}
            title={title}
            subtitle={subtitle}
          />
        )}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};
