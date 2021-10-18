import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../../assets/images/LocalAssets";
import { AdvanceTable, CustomSpacer, EmptyTable } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { updateSeen } from "../../../../../network-actions/dashboard/UpdateSeen";
import { getEDDDashboard } from "../../../../../network-actions/edd/Dashboard";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../../store/EDD";
import {
  centerHorizontal,
  centerHV,
  colorWhite,
  flexChild,
  fs10BoldBlue2,
  fs12RegBlue2,
  fsTransformNone,
  justifyContentStart,
  px,
  sh32,
  sw103,
  sw112,
  sw119,
  sw159,
  sw16,
  sw20,
  sw24,
  sw64,
  sw8,
} from "../../../../../styles";
import { OrderRemarks } from "../../../Transactions/ApplicationHistory/OrderRemarks";
import { EDDCustomTableItem } from "../CustomItems";
import { IShowDateBy, TDateType, TSortType } from "../NewCaseTab";

const { EMPTY_STATE, DASHBOARD_EDD, DASHBOARD_HOME } = Language.PAGE;

export interface HistoryProps extends EDDStoreProps {
  isFetching: boolean;
  navigation: IStackNavigationProp;
  setIsFetching: (value: boolean) => void;
  setScreen: (route: EDDPageType) => void;
}

const HistoryTabComponent: FunctionComponent<HistoryProps> = ({
  isFetching,
  navigation,
  edd,
  history,
  search,
  setIsFetching,
  setScreen,
  updateCases,
  updateCurrentCase,
  updateHistorySort,
}: HistoryProps) => {
  const { filter, page, cases, sort } = history;
  const [showDateBy, setShowDateBy] = useState<IShowDateBy>({ type: "Last Updated", key: "descending" });
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);

  const handleShowDateBy = (text: TDateType, key: TSortType) => {
    setShowDateBy({ type: text, key: key });
    const sortColumns = sort.map((sortType) => sortType.column);
    const sortType = text === "Case Created On" ? "caseCreated" : "lastUpdated";
    const newSort: IEDDDashboardSort = sortColumns.includes(sortType) ? { ...sort[0], value: key } : { column: sortType, value: key };
    updateHistorySort([newSort]);
  };

  const handleShowRemarks = (item: ITableRowData) => {
    const { remark } = item.rawData as IEDDDashboardCase;
    if (remark) {
      const newSections: number[] = [...activeAccordion];
      const sectionIndex = newSections.indexOf(item.index);
      if (sectionIndex > -1) {
        newSections.splice(sectionIndex, 1);
      } else {
        newSections.splice(0, 1, item.index);
      }
      setActiveAccordion(newSections);
    }
  };

  const handleSortCaseId = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("caseNo")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "caseNo", value: "descending" };
    updateHistorySort([newSort]);
  };

  const handleSortName = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("clientName")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "clientName", value: "descending" };
    updateHistorySort([newSort]);
  };

  const handleSortAccountNo = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("accountNo")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "accountNo", value: "descending" };
    updateHistorySort([newSort]);
  };

  const handleSortCreatedOn = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("caseCreated")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "caseCreated", value: "descending" };
    updateHistorySort([newSort]);
  };

  const handleSortClosedOn = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("closeDate")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "closeDate", value: "descending" };
    updateHistorySort([newSort]);
  };

  const handleSortStatus = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("status")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "status", value: "descending" };
    updateHistorySort([newSort]);
  };

  const handleView = (item: ITableData) => {
    updateCurrentCase(item.rawData as IEDDDashboardCase);
    setScreen("ViewCase");
  };

  const handlePressCase = (item: ITableData) => {
    updateCurrentCase(item as IEDDDashboardCase);
    setScreen("ViewCase");
  };

  const tableAccordion = (item: ITableData) => {
    const { remark, status } = item as IEDDDashboardCase;
    return (
      <Fragment>
        {remark ? (
          <OrderRemarks showIcon={false} remarks={remark} remarkTitle={DASHBOARD_EDD.LABEL_CANCELLED_REMARKS} status={status} />
        ) : null}
      </Fragment>
    );
  };

  const showDatePopupContent: IHeaderPopupContent[] = [
    { icon: { name: "arrow-up" }, key: "descending", text: DASHBOARD_EDD.LABEL_CASE_CREATED_ON },
    { icon: { name: "arrow-down" }, key: "ascending", text: DASHBOARD_EDD.LABEL_CASE_CREATED_ON },
    { icon: { name: "arrow-up" }, key: "descending", text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
    { icon: { name: "arrow-down" }, key: "ascending", text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
  ];

  const popupContentIndex = showDatePopupContent.findIndex(
    (content: IHeaderPopupContent) => content.text === showDateBy.type && content.key === showDateBy.key,
  );

  const renderAccordion = cases.length !== 0 ? tableAccordion : undefined;

  const findCaseId = sort.filter((sortType) => sortType.column === "caseNo");
  const findName = sort.filter((sortType) => sortType.column === "clientName");
  const findAccountNo = sort.filter((sortType) => sortType.column === "accountNo");
  const findClosedOn = sort.filter((sortType) => sortType.column === "closeDate");
  const findStatus = sort.filter((sortType) => sortType.column === "status");
  const sortCaseId = findCaseId.length > 0 ? findCaseId[0].value : "ascending";
  const sortName = findName.length > 0 ? findName[0].value : "ascending";
  const sortAccountNo = findAccountNo.length > 0 ? findAccountNo[0].value : "ascending";
  const sortClosedOn = findClosedOn.length > 0 ? findClosedOn[0].value : "ascending";
  const sortStatus = findStatus.length > 0 ? findStatus[0].value : "ascending";

  const columns: ITableColumn[] = [
    {
      icon: { name: sortCaseId === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "caseNo", textStyle: { ...fs12RegBlue2, ...fsTransformNone } }],
      onPressHeader: handleSortCaseId,
      viewStyle: {
        width: sw112,
      },
      title: DASHBOARD_EDD.LABEL_EDD_CASE_ID,
    },
    {
      customItem: true,
      icon: { name: sortName === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "clientName", textStyle: { ...fsTransformNone, ...fs12RegBlue2 } }],
      onPressHeader: handleSortName,
      viewStyle: {
        width: sw159,
      },
      title: DASHBOARD_EDD.LABEL_INVESTOR_NAME,
    },
    {
      icon: { name: sortAccountNo === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "accountNo", textStyle: fs12RegBlue2 }],
      onPressHeader: handleSortAccountNo,
      viewStyle: {
        width: sw103,
      },
      textStyle: fsTransformNone,
      title: DASHBOARD_EDD.LABEL_ACCOUNT_NO,
      titleStyle: fsTransformNone,
    },
    {
      customItem: true,
      customHeader: true,
      icon: {
        name: "caret-down",
      },
      key: [{ key: "createdOn", textStyle: fs12RegBlue2 }],
      onPressHeader: handleSortCreatedOn,
      itemStyle: { ...justifyContentStart, ...px(sw8) },
      viewStyle: {
        width: sw119,
        ...px(0),
        ...centerHorizontal,
      },
      title: showDateBy.type,
    },
    {
      customItem: true,
      icon: { name: sortClosedOn === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "lastUpdated", textStyle: fs12RegBlue2 }],
      onPressHeader: handleSortClosedOn,
      viewStyle: {
        width: sw119,
      },
      title: DASHBOARD_EDD.LABEL_CASE_CLOSED_ON,
    },
    {
      customItem: true,
      withAccordion: true,
      icon: { name: sortStatus === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "status" }],
      onPressHeader: handleSortStatus,
      viewStyle: { width: sw119 },
      onPressItem: handleShowRemarks,
      title: DASHBOARD_EDD.LABEL_STATUS,
    },
    {
      itemIcon: { name: "eye-show", size: sw20 },
      key: [],
      onPressItem: handleView,
      viewStyle: { ...centerHV, width: sw64 },
      title: DASHBOARD_EDD.LABEL_VIEW,
    },
  ];

  const handleFetch = async () => {
    setIsFetching(true);
    const filterStatus = filter.caseStatus!.map((value) => ({ column: "status", value: value }));
    const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    // The closeDate and lastUpdated are same in backend.Due to limitation of backend.
    const checkSort: IEDDDashboardSort[] =
      sort.length > 0 && sort[0].column === "closeDate" ? [{ ...sort[0], column: "lastUpdated" }] : sort;
    const defaultSort: IEDDDashboardSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : checkSort;
    const request: IEDDDashboardRequest = {
      tab: "history",
      page: page,
      search: search,
      sort: defaultSort,
      filter: [
        {
          column: filter.dateSorting === "Creation Date" ? "caseCreated" : "lastUpdated",
          value: `${minimumDate}~${maximumDate}`,
        },
        ...filterStatus,
      ],
    };
    const dashboardResponse: IEDDDashboardResponse = await getEDDDashboard(request, navigation);
    if (dashboardResponse !== undefined) {
      const { data, error } = dashboardResponse;
      if (error === null && data !== null) {
        updateCases({
          ...edd,
          history: {
            ...edd.history,
            cases: data.result.cases,
            page: data.result.page,
            pages: data.result.pages,
          },
          pendingCount: data.result.pendingCount,
          submittedCount: data.result.submittedCount,
          historyCount: data.result.historyCount,
          newCount: data.result.newCount,
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

  const handleSeen = async () => {
    setIsFetching(true);
    const request: IUpdateSeenRequest = { dashboard: "edddashboard", tab: ["history"] };
    const updateSeenResponse: IUpdateSeenResponse = await updateSeen(request, navigation);
    if (updateSeenResponse !== undefined) {
      const { error } = updateSeenResponse;
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  useEffect(() => {
    handleFetch();
    return () => {
      handleSeen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, page, filter]);

  const noResults = search !== undefined && search !== "";
  const title = noResults === true ? EMPTY_STATE.LABEL_NO_RESULTS : DASHBOARD_EDD.LABEL_EMPTY_TITLE;
  const subtitle = noResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : DASHBOARD_EDD.LABEL_EMPTY_SUBTITLE;
  const hintText = noResults === true ? EMPTY_STATE.SUBTITLE : undefined;
  const illustration = noResults === true ? undefined : LocalAssets.illustration.eddEmpty;

  return (
    <View style={{ ...flexChild, ...px(sw16), backgroundColor: colorWhite._5, borderRadius: sw24 }}>
      <AdvanceTable
        activeAccordion={activeAccordion}
        columns={columns}
        data={isFetching === true ? [] : cases}
        handleRowNavigation={handlePressCase}
        headerPopup={{
          content: showDatePopupContent,
          onPressContent: ({ hide, text, key }) => {
            handleShowDateBy(text as TDateType, key as TSortType);
            hide();
          },
          selectedIndex: [popupContentIndex],
          title: showDateBy.type,
          titleStyle: fs10BoldBlue2,
          viewStyle: { width: sw119 },
        }}
        RenderAccordion={renderAccordion}
        RenderCustomItem={(data: ITableCustomItem) => <EDDCustomTableItem {...data} />}
        RenderEmptyState={() => (
          <EmptyTable hintText={hintText} illustration={illustration} loading={isFetching} title={title} subtitle={subtitle} />
        )}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const HistoryTab = connect(EDDMapStateToProps, EDDMapDispatchToProps)(HistoryTabComponent);
