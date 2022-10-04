import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../../assets/images/LocalAssets";
import { AdvanceTable, CustomSpacer, EmptyTable, StatusBadge } from "../../../../../components";
import { NunitoBold, NunitoRegular } from "../../../../../constants";
import { Language } from "../../../../../constants/language";
import { updateSeen } from "../../../../../network-actions/dashboard/UpdateSeen";
import { getEDDDashboard } from "../../../../../network-actions/edd";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../../store/EDD";
import {
  centerHorizontal,
  centerHV,
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  fs10RegBlue6,
  fs12BoldGray6,
  fs12RegBlue1,
  fs12RegGray4,
  fs12RegGray5,
  fsTransformNone,
  justifyContentStart,
  px,
  py,
  sh12,
  sh13,
  sh16,
  sh18,
  sh32,
  sw104,
  sw16,
  sw160,
  sw168,
  sw20,
  sw24,
  sw56,
  sw8,
  sw96,
} from "../../../../../styles";
import { AnimationUtils, isNotEmpty } from "../../../../../utils";
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
  navigation: IStackNavigationProp;
  setIsFetching: (value: boolean) => void;
  setScreen: (route: EDDPageType) => void;
}

const NewCasesTabComponent: FunctionComponent<NewCasesProps> = ({
  activeTab,
  edd,
  global,
  isFetching,
  navigation,
  search,
  setIsFetching,
  setScreen,
  updateCases,
  updateCurrentCase,
  updateNewCasesSort,
  updateEDDPill,
}: NewCasesProps) => {
  const { pendingCount, reroutedCount, submittedCount } = edd;
  const { filter, page, cases, sort, pill } = edd.new;
  // const fetching = useRef<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [showDateBy, setShowDateBy] = useState<IEDDShowDateBy>({ type: "Last Updated", key: "descending" });

  const handleShowDateBy = (text: TEDDDateType, key: TSortType) => {
    const newKey = key === "ascending" ? "descending" : "ascending";
    setShowDateBy({ type: text, key: newKey });
    const sortColumns = sort.map((eachSortType) => eachSortType.column);
    const sortType = text === "Created On" ? "caseCreated" : "lastUpdated";
    const newSort: IEDDDashboardSort = sortColumns.includes(sortType) ? { ...sort[0], value: newKey } : { column: sortType, value: newKey };
    updateNewCasesSort([newSort]);
  };

  const handleShowRemarks = (item: ITableRowData) => {
    const newSections: number[] = [...activeAccordion];
    const sectionIndex = newSections.indexOf(item.index);
    if (sectionIndex > -1) {
      newSections.splice(sectionIndex, 1);
    } else {
      newSections.splice(0, 1, item.index);
    }
    setActiveAccordion(newSections);
  };

  const tableAccordion = (item: ITableData) => {
    const { label, rerouteReason, status } = item as unknown as IEDDDashboardCase;
    const containerStyle: ViewStyle = {
      ...px(sw16),
      ...py(sh12),
      backgroundColor: colorBlue._2,
      borderBottomLeftRadius: sw8,
      borderBottomRightRadius: sw8,
    };
    let rerouteData: IDashboardReason[] = [];
    if (isNotEmpty(rerouteReason)) {
      rerouteData = rerouteReason!.map((eachReason: IEDDReason) => {
        return {
          title: eachReason.title,
          content: isNotEmpty(eachReason.remark) ? [eachReason.remark] : [],
        };
      });
    }
    return (
      <Fragment>
        <View style={containerStyle}>
          <Text style={fs12BoldGray6}>{status}</Text>
          <Text style={fs12RegGray5}>{label}</Text>
          {isNotEmpty(rerouteReason) && rerouteReason!.length > 0 ? (
            <Fragment>
              <CustomSpacer space={sh16} />
              <OrderRemarks remarkTitle={DASHBOARD_EDD.LABEL_REROUTE_REASON} remarks={rerouteData} status={status} />
            </Fragment>
          ) : null}
        </View>
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
    const request: IUpdateSeenRequest = { dashboard: "eddDashboardV2", tab: [pill] };
    const updateSeenResponse: IUpdateSeenResponse = await updateSeen(request, navigation);
    setIsFetching(false);
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
    updateEDDPill(updatedPill);
  };

  const handleView = async (item: ITableRowData) => {
    updateCurrentCase(item.rawData as unknown as IEDDDashboardCase);
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
    updateCurrentCase(item as unknown as IEDDDashboardCase);
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
    { icon: { name: "arrow-down" }, key: "descending", text: DASHBOARD_HOME.LABEL_CREATED_ON },
    { icon: { name: "arrow-down" }, key: "descending", text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
  ];

  const popupContentIndex = showDatePopupContent.findIndex((content: IHeaderPopupContent) => content.text === showDateBy.type);

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
  const sortedColumns = sort.map((currentSortType) => currentSortType.column);

  const checkLoading = (functionToBeCalled: () => void) => {
    if (isFetching === false) {
      functionToBeCalled();
    }
  };

  const columns: ITableColumn[] = [
    {
      icon: { name: sortCaseId === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "caseNo",
          textStyle: { ...fs12RegBlue1, ...fsTransformNone, fontFamily: sortedColumns.includes("caseNo") ? NunitoBold : NunitoRegular },
        },
      ],
      onPressHeader: () => checkLoading(handleSortCaseId),
      title: DASHBOARD_EDD.LABEL_EDD_CASE_ID,
      titleStyle: sortedColumns.includes("caseNo") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw96 },
    },
    {
      customItem: true,
      icon: { name: sortName === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "clientName", textStyle: { fontFamily: sortedColumns.includes("clientName") ? NunitoBold : NunitoRegular } }],
      onPressHeader: () => checkLoading(handleSortName),
      title: DASHBOARD_EDD.LABEL_INVESTOR_NAME,
      titleStyle: sortedColumns.includes("clientName") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw168 },
    },
    {
      icon: { name: sortAccountNo === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        { key: "accountNo", textStyle: { ...fs12RegBlue1, fontFamily: sortedColumns.includes("accountNo") ? NunitoBold : NunitoRegular } },
      ],
      onPressHeader: () => checkLoading(handleSortAccountNo),
      textStyle: fsTransformNone,
      title: DASHBOARD_EDD.LABEL_ACCOUNT_NO,
      titleStyle: sortedColumns.includes("accountNo") ? { ...fsTransformNone, ...fs10BoldBlue1, lineHeight: sh13 } : fsTransformNone,
      viewStyle: { width: sw104 },
    },
    {
      customHeader: true,
      customItem: true,
      icon: { name: "caret-down" },
      itemStyle: { ...justifyContentStart, ...px(sw8) },
      key: [
        {
          key: showDateBy.type === DASHBOARD_EDD.LABEL_CASE_CREATED_ON ? "createdOn" : "lastUpdated",
        },
      ],
      onPressHeader: () => checkLoading(handleSortCreatedOn),
      title: showDateBy.type,
      viewStyle: { width: sw104, ...px(0), ...centerHorizontal },
    },
    {
      customItem: true,
      icon: { name: sortDueDate === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "targetDate",
        },
        { key: "daysRemaining", textStyle: fs10RegBlue6 },
      ],
      onPressHeader: () => checkLoading(handleSortDueDate),
      title: DASHBOARD_EDD.LABEL_DUE_DATE,
      titleStyle: sortedColumns.includes("targetDate") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw104 },
    },
    {
      customItem: true,
      icon: { name: sortStatus === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "status", textStyle: { fontFamily: sortedColumns.includes("status") ? NunitoBold : NunitoRegular } }],
      onPressHeader: () => checkLoading(handleSortStatus),
      onPressItem: handleShowRemarks,
      title: DASHBOARD_EDD.LABEL_STATUS,
      titleStyle: sortedColumns.includes("status") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw160 },
      withAccordion: true,
    },
    {
      itemIcon: { name: "eye-show", size: sw20 },
      key: [],
      onPressItem: handleView,
      title: DASHBOARD_EDD.LABEL_VIEW,
      viewStyle: { ...centerHV, width: sw56 },
    },
  ];

  const renderAccordion = cases.length !== 0 ? tableAccordion : undefined;

  const handleFetch = async () => {
    setIsFetching(true);
    const filterStatus = filter.caseStatus!.map((value) => ({ column: "status", value: value }));
    const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    const checkStatusSort: IEDDDashboardSort[] =
      findStatus.length !== 0 ? [...sort, { column: "lastUpdated", value: "descending" }] : [...sort];
    const defaultSort: IEDDDashboardSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : checkStatusSort;

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
      if (global.isLogout === false) {
        handleSeen();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global.isLogout]);

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
              <StatusBadge
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
        data={isFetching === true ? [] : (cases as unknown as ITableData[])}
        handleRowNavigation={handlePressCase}
        headerPopup={{
          content: showDatePopupContent.map((_content, contentIndex) =>
            contentIndex === popupContentIndex
              ? {
                  ..._content,
                  icon: { ..._content.icon, name: showDateBy.key === "ascending" ? "arrow-up" : "arrow-down" },
                  key: showDateBy.key,
                }
              : _content,
          ),
          onPressContent: ({ hide, text, key }) => {
            handleShowDateBy(text as TEDDDateType, key as TSortType);
            AnimationUtils.layout({ duration: 400 });
            setTimeout(() => {
              hide();
            }, 1000);
          },
          selectedIndex: [popupContentIndex],
          title: showDateBy.type,
          titleStyle:
            sortedColumns.includes("lastUpdated") || sortedColumns.includes("caseCreated")
              ? { ...fs10BoldBlue1, lineHeight: sh13 }
              : { fontFamily: NunitoRegular },
          viewStyle: { width: sw104 },
        }}
        RenderAccordion={renderAccordion}
        RenderCustomItem={(data: ITableCustomItem) => <EDDCustomTableItem {...data} sortedColumns={sortedColumns} />}
        RenderEmptyState={() => (
          <EmptyTable hintText={hintText} illustration={illustration} loading={isFetching} title={title} subtitle={subtitle} />
        )}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const NewCasesTab = connect(EDDMapStateToProps, EDDMapDispatchToProps)(NewCasesTabComponent);
