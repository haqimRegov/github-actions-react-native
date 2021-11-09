import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../../assets/images/LocalAssets";
import { AdvanceTable, CustomSpacer, EmptyTable, Tag } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { updateSeen } from "../../../../../network-actions/dashboard/UpdateSeen";
import { getEDDDashboard } from "../../../../../network-actions/edd";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../../store/EDD";
import {
  centerHorizontal,
  centerHV,
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  fs10RegBlue6,
  fs12RegBlue1,
  fs12RegGray4,
  fsTransformNone,
  justifyContentStart,
  px,
  sh18,
  sh32,
  sw103,
  sw112,
  sw119,
  sw143,
  sw159,
  sw16,
  sw20,
  sw24,
  sw64,
  sw8,
  sw95,
} from "../../../../../styles";
import { OrderRemarks } from "../../../Transactions/ApplicationHistory/OrderRemarks";
import { EDDCustomTableItem } from "../CustomItems";

declare interface TagData {
  text: EDDNewCaseTagValue;
  pillCount: number;
}

const { EMPTY_STATE, DASHBOARD_EDD, DASHBOARD_HOME } = Language.PAGE;

export interface NewCasesProps extends EDDStoreProps {
  activeTab: boolean;
  isFetching: boolean;
  isLogout: boolean;
  navigation: IStackNavigationProp;
  setIsFetching: (value: boolean) => void;
  setScreen: (route: EDDPageType) => void;
}

export type TDateType = "Case Created On" | "Last Updated";
export type TSortType = "ascending" | "descending";

export interface IShowDateBy {
  key: TSortType;
  type: TDateType;
}

const NewCasesTabComponent: FunctionComponent<NewCasesProps> = ({
  activeTab,
  edd,
  isFetching,
  isLogout,
  navigation,
  search,
  setIsFetching,
  setScreen,
  updateCases,
  updateCurrentCase,
  updateNewCasesSort,
  updatePill,
}: NewCasesProps) => {
  const { pendingCount, reroutedCount, submittedCount } = edd;
  const { filter, page, cases, sort, pill } = edd.new;
  // const fetching = useRef<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [showDateBy, setShowDateBy] = useState<IShowDateBy>({ type: "Last Updated", key: "descending" });

  const handleShowDateBy = (text: TDateType, key: TSortType) => {
    setShowDateBy({ type: text, key: key });
    const sortColumns = sort.map((eachSortType) => eachSortType.column);
    const sortType = text === "Case Created On" ? "caseCreated" : "lastUpdated";
    const newSort: IEDDDashboardSort = sortColumns.includes(sortType) ? { ...sort[0], value: key } : { column: sortType, value: key };
    updateNewCasesSort([newSort]);
  };

  const handleShowRemarks = (item: ITableRowData) => {
    const { remark } = item.rawData as IEDDDashboardCase;
    if (pill === "rerouted" && remark) {
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

  const tableAccordion = (item: ITableData) => {
    const { remark, status } = item as IEDDDashboardCase;
    return (
      <Fragment>
        {remark ? <OrderRemarks remarks={remark} remarkTitle={DASHBOARD_EDD.LABEL_REROUTE_REASON} status={status} /> : null}
      </Fragment>
    );
  };

  const handleSortCaseId = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("caseNo")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "caseNo", value: "descending" };
    updateNewCasesSort([newSort]);
  };

  const handleSortName = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("clientName")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "clientName", value: "descending" };
    updateNewCasesSort([newSort]);
  };

  const handleSortAccountNo = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("accountNo")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "accountNo", value: "descending" };
    updateNewCasesSort([newSort]);
  };

  const handleSortCreatedOn = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("caseCreated")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "caseCreated", value: "descending" };
    updateNewCasesSort([newSort]);
  };

  const handleSortDueDate = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("targetDate")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "targetDate", value: "descending" };
    updateNewCasesSort([newSort]);
  };

  const handleSortStatus = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: IEDDDashboardSort = sortColumns.includes("status")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "status", value: "descending" };
    updateNewCasesSort([newSort]);
  };

  const handleSeen = async () => {
    setIsFetching(true);
    const request: IUpdateSeenRequest = { dashboard: "edddashboard", tab: [pill] };
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

  const handlePill = async (index: number) => {
    let updatedPill: EDDNewCaseTagKey;
    switch (index) {
      case 1:
        updatedPill = "rerouted";
        break;
      case 2:
        updatedPill = "submitted";
        break;
      default:
        updatedPill = "pending";
    }
    handleSeen();
    updateCases({ ...edd, new: { ...edd.new, page: 1, pages: 1 } });
    updatePill(updatedPill);
  };

  const handleView = async (item: ITableData) => {
    updateCurrentCase(item.rawData as IEDDDashboardCase);
    handleSeen();
    switch (pill) {
      case "submitted":
        setScreen("ViewCase");
        break;
      case "rerouted":
        setScreen("RerouteCase");
        break;
      default:
        setScreen("NewCase");
    }
  };

  const handlePressCase = (item: ITableData) => {
    updateCurrentCase(item as IEDDDashboardCase);
    switch (pill) {
      case "submitted":
        setScreen("ViewCase");
        break;
      case "rerouted":
        setScreen("RerouteCase");
        break;
      default:
        setScreen("NewCase");
    }
  };

  const pills: TagData[] = [
    { text: "Pending", pillCount: pendingCount },
    { text: "Rerouted", pillCount: reroutedCount },
    { text: "Submitted", pillCount: submittedCount },
  ];

  const showDatePopupContent: IHeaderPopupContent[] = [
    { icon: { name: "arrow-up" }, key: "descending", text: DASHBOARD_EDD.LABEL_CASE_CREATED_ON },
    { icon: { name: "arrow-down" }, key: "ascending", text: DASHBOARD_EDD.LABEL_CASE_CREATED_ON },
    { icon: { name: "arrow-up" }, key: "descending", text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
    { icon: { name: "arrow-down" }, key: "ascending", text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
  ];

  const popupContentIndex = showDatePopupContent.findIndex(
    (content: IHeaderPopupContent) => content.text === showDateBy.type && content.key === showDateBy.key,
  );

  const findCaseId = sort.filter((sortType) => sortType.column === "caseNo");
  const findName = sort.filter((sortType) => sortType.column === "clientName");
  const findAccountNo = sort.filter((sortType) => sortType.column === "accountNo");
  const findDueDate = sort.filter((sortType) => sortType.column === "targetDate");
  const findStatus = sort.filter((sortType) => sortType.column === "status");
  const sortCaseId = findCaseId.length > 0 ? findCaseId[0].value : "ascending";
  const sortName = findName.length > 0 ? findName[0].value : "ascending";
  const sortAccountNo = findAccountNo.length > 0 ? findAccountNo[0].value : "ascending";
  const sortDueDate = findDueDate.length > 0 ? findDueDate[0].value : "ascending";
  const sortStatus = findStatus.length > 0 ? findStatus[0].value : "ascending";

  const columns: ITableColumn[] = [
    {
      icon: { name: sortCaseId === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "caseNo", textStyle: { ...fs12RegBlue1, ...fsTransformNone } }],
      onPressHeader: handleSortCaseId,
      title: DASHBOARD_EDD.LABEL_EDD_CASE_ID,
      viewStyle: { width: sw112 },
    },
    {
      customItem: true,
      icon: { name: sortName === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "clientName" }],
      onPressHeader: handleSortName,
      title: DASHBOARD_EDD.LABEL_INVESTOR_NAME,
      viewStyle: { width: sw159 },
    },
    {
      icon: { name: sortAccountNo === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "accountNo", textStyle: fs12RegBlue1 }],
      onPressHeader: handleSortAccountNo,
      textStyle: fsTransformNone,
      title: DASHBOARD_EDD.LABEL_ACCOUNT_NO,
      titleStyle: fsTransformNone,
      viewStyle: { width: sw103 },
    },
    {
      customHeader: true,
      customItem: true,
      icon: { name: "caret-down" },
      itemStyle: { ...justifyContentStart, ...px(sw8) },
      key: [{ key: showDateBy.type === DASHBOARD_EDD.LABEL_CASE_CREATED_ON ? "createdOn" : "lastUpdated" }],
      onPressHeader: handleSortCreatedOn,
      title: showDateBy.type,
      titleStyle: fs10BoldBlue1,
      viewStyle: { width: sw119, ...px(0), ...centerHorizontal },
    },
    {
      customItem: true,
      icon: { name: sortDueDate === "descending" ? "arrow-up" : "arrow-down" },
      key: [
        { key: "targetDate", textStyle: fs12RegBlue1 },
        { key: "daysRemaining", textStyle: fs10RegBlue6 },
      ],
      onPressHeader: handleSortDueDate,
      title: DASHBOARD_EDD.LABEL_DUE_DATE,
      viewStyle: { width: sw95 },
    },
    {
      customItem: true,
      icon: { name: sortStatus === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "status" }],
      onPressHeader: handleSortStatus,
      onPressItem: handleShowRemarks,
      title: DASHBOARD_EDD.LABEL_STATUS,
      viewStyle: { width: sw143 },
      withAccordion: true,
    },
    {
      itemIcon: { name: "eye-show", size: sw20 },
      key: [],
      onPressItem: handleView,
      title: DASHBOARD_EDD.LABEL_VIEW,
      viewStyle: { ...centerHV, width: sw64 },
    },
  ];

  const renderAccordion = cases.length !== 0 ? tableAccordion : undefined;

  const handleFetch = async () => {
    setIsFetching(true);
    const filterStatus = filter.caseStatus!.map((value) => ({ column: "status", value: value }));
    const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    const defaultSort: IEDDDashboardSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : sort;

    const request: IEDDDashboardRequest = {
      tab: pill,
      page: page,
      search: search,
      sort: defaultSort,
      filter: [
        {
          column: filter.dateSorting === "Case Created On" ? "caseCreated" : "lastUpdated",
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
          new: {
            ...edd.new,
            cases: data.result.cases,
            page: data.result.page,
            pages: data.result.pages,
          },
          pendingCount: data.result.pendingCount,
          submittedCount: data.result.submittedCount,
          reroutedCount: data.result.reroutedCount,
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

  useEffect(() => {
    return () => {
      if (isLogout !== true) {
        handleSeen();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogout]);

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeTab, sort, page, filter, pill]);

  const noResults = search !== undefined && search !== "";
  const title = noResults === true ? EMPTY_STATE.LABEL_NO_RESULTS : DASHBOARD_EDD.LABEL_EMPTY_TITLE;
  const subtitle = noResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : DASHBOARD_EDD.LABEL_EMPTY_SUBTITLE;
  const hintText = noResults === true ? EMPTY_STATE.SUBTITLE : undefined;
  const illustration = noResults === true ? undefined : LocalAssets.illustration.eddEmpty;

  return (
    <View style={{ ...flexChild, ...px(sw16), backgroundColor: colorWhite._2, borderRadius: sw24 }}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <Text style={fs12RegGray4}>{DASHBOARD_EDD.LABEL_TYPES}</Text>
        <CustomSpacer isHorizontal={true} space={sw8} />
        {pills.map((currentPill: TagData, index: number) => {
          const { text, pillCount } = currentPill;
          const handlePress = () => {
            if (isFetching === false) {
              handlePill(index);
            }
          };

          return (
            <View key={index} style={flexRow}>
              <Tag
                color={text.toLowerCase() === pill ? "primary" : "secondary"}
                onPress={handlePress}
                style={{ ...px(sw16) }}
                text={`${text} (${pillCount})`}
              />
              <CustomSpacer isHorizontal={true} space={sw8} />
            </View>
          );
        })}
      </View>
      <CustomSpacer space={sh18} />
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
          titleStyle: fs10BoldBlue1,
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

export const NewCasesTab = connect(EDDMapStateToProps, EDDMapDispatchToProps)(NewCasesTabComponent);
