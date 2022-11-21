import React, { FunctionComponent } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { AdvanceTable, CustomFlexSpacer, CustomSpacer, EmptyTable, Pagination, StatusBadge } from "../../../../components";
import { Language } from "../../../../constants";
import {
  borderBottomGray2,
  centerHV,
  centerVertical,
  colorRed,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlue1,
  fsUppercase,
  sh16,
  sh2,
  sh32,
  sh8,
  sw1,
  sw136,
  sw16,
  sw18,
  sw20,
  sw24,
  sw323,
  sw4,
  sw56,
  sw8,
  sw90,
  sw96,
} from "../../../../styles";
import { isNotEmpty } from "../../../../utils";
import { ProductOptions } from "./Actions";

const { EMPTY_STATE, PRODUCT_LIST } = Language.PAGE;

interface ProductListViewProps {
  filter: IProductFilter;
  handleAllFunds?: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleRecommendedFunds?: () => void;
  handleResetSelected: () => void;
  handleSelectProduct: (product: IProduct) => void;
  list: ITableData[];
  loading: boolean;
  page: number;
  pages: number;
  productType: ProductType;
  recommendedRisk?: string[];
  search: string;
  selectedFunds: ITableData[];
  setViewFund: (fund: IProduct) => void;
  shareSuccess?: boolean;
  showBy?: ProductListShowByType;
  sort: IProductSort[];
  totalCount: IProductTotalCount;
  updateFilter: (filter: IProductFilter) => void;
  updateSort: (sort: IProductSort[]) => void;
  withEpf?: boolean;
}

export const ProductListView: FunctionComponent<ProductListViewProps> = ({
  filter,
  handleAllFunds,
  handleNext,
  handlePrev,
  handleRecommendedFunds,
  handleResetSelected,
  handleSelectProduct,
  list,
  loading,
  page,
  pages,
  productType,
  recommendedRisk,
  search,
  selectedFunds,
  setViewFund,
  shareSuccess,
  showBy,
  sort,
  totalCount,
  updateFilter,
  updateSort,
  withEpf,
}: ProductListViewProps) => {
  // const performanceColumn = {
  //   icon: {
  //     name: "caret-down",
  //   },
  //   key: [{ key: "performance" }],
  //   viewStyle: {
  //     width: 98,
  //   },
  //   title: PRODUCT_LIST.LABEL_COLUMN_PERFORMANCE,
  //   onPressItem: () => Alert.alert("Show"),
  //   withAccordion: true,
  // };

  // const columns = [...PRODUCT_LIST_COLUMNS];
  // columns.push(performanceColumn);

  // const tableAccordion = (item: ITableData) => {
  //   return (
  //     <Fragment>
  //       <ProductGraph fund={item as IFund} />
  //       <CustomSpacer space={sh40} />
  //     </Fragment>
  //   );
  // };

  // const renderAccordion = list.length !== 0 ? tableAccordion : undefined;

  const sortAbbr = sort.filter((abbr) => abbr.column === "fundAbbr")[0].value;
  const sortName = sort.filter((name) => name.column === "fundName")[0].value;

  const handleSortAbbr = async () => {
    const updatedAbbrSort: IProductSort[] = sort.map((abbrSort) =>
      abbrSort.column === "fundAbbr"
        ? { ...abbrSort, value: abbrSort.value === "desc" ? "asc" : "desc" }
        : { column: "fundName", value: "" },
    );
    updateSort(updatedAbbrSort);
  };

  const handleSortName = async () => {
    const updatedAbbrName: IProductSort[] = sort.map((abbrSort) =>
      abbrSort.column === "fundName"
        ? { ...abbrSort, value: abbrSort.value === "desc" ? "asc" : "desc" }
        : { column: "fundAbbr", value: "" },
    );
    updateSort(updatedAbbrName);
  };

  const columns: ITableColumn[] = [
    {
      icon: { name: sortAbbr === "desc" ? "arrow-up" : "arrow-down" },
      key: [{ key: "fundAbbr", textStyle: fsUppercase }],
      viewStyle: { width: sw136 },
      onPressHeader: handleSortAbbr,
      title: PRODUCT_LIST.LABEL_COLUMN_FUND_CODE,
    },
    {
      key: [{ key: "fundName", textStyle: fsUppercase }],
      icon: { name: sortName === "desc" ? "arrow-up" : "arrow-down" },
      viewStyle: { width: sw323 },
      onPressHeader: handleSortName,
      title: productType === "amp" ? PRODUCT_LIST.LABEL_COLUMN_PORTFOLIO : PRODUCT_LIST.LABEL_COLUMN_NAME,
    },
    {
      icon: { name: "caret-down", size: sw16 },
      key: [{ key: "riskCategory" }],
      viewStyle: { width: sw96 },
      customHeader: true,
      title: PRODUCT_LIST.LABEL_COLUMN_RISK,
    },
    {
      key: [{ key: "isEpf" }],
      viewStyle: { width: sw56 },
      title: PRODUCT_LIST.LABEL_COLUMN_EPF,
    },
    {
      customItem: true,
      key: [{ key: "isSyariah" }],
      viewStyle: { width: sw90 },
      title: PRODUCT_LIST.LABEL_COLUMN_SHARIAH,
    },
  ];

  const handleShareDocuments = () => Alert.alert("handleShareDocuments");

  const handleViewDetails = (fund: IProduct) => {
    setViewFund(fund);
  };

  const handleShowPerformance = (item: ITableRowData) => {
    Alert.alert(`handleShowPerformance ${item.index}`);
    // const newSections: number[] = [...activeAccordion];
    // const sectionIndex = newSections.indexOf(item.index);
    // if (sectionIndex > -1) {
    //   newSections.splice(sectionIndex, 1);
    // } else {
    //   newSections.splice(0, 1, item.index);
    // }
    // setActiveAccordion(newSections);
  };

  const checkEpf =
    isNotEmpty(withEpf) && withEpf === false
      ? list
          .map((eachRow: ITableData, index) => (eachRow.isEpf === "Yes" ? index : null))
          .filter((eachUtmcIndex: number | null) => eachUtmcIndex !== null)
          .map((eachIndex) => eachIndex!)
      : [];

  const onRowSelect = (data: ITableData) => {
    handleSelectProduct(data as IProduct);
  };

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._1,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };
  const recommendedCount = totalCount.recommended !== "" ? `(${totalCount.recommended})` : "";
  const recommendedLabel = `${PRODUCT_LIST.LABEL_RECOMMENDED} ${recommendedCount}`;
  const allCount = totalCount.all !== "" ? `(${totalCount.all})` : "";
  const allFundsLabel = `${PRODUCT_LIST.LABEL_ALL_FUNDS} ${allCount}`;

  const subtitle = search !== undefined && search !== "" ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : undefined;
  const riskCategory = recommendedRisk !== undefined ? recommendedRisk : ["Low", "Medium", "High"];

  return (
    <View style={{ ...flexChild, borderRadius: sw24 }}>
      <View
        style={{
          ...flexChild,
          backgroundColor: colorWhite._1,
          borderBottomRightRadius: sw24,
          borderBottomLeftRadius: sw24,
        }}>
        <View style={{ ...flexRow, ...centerVertical }}>
          <CustomSpacer isHorizontal={true} space={sw20} />
          <StatusBadge color={showBy === "all" ? "secondary" : "primary"} onPress={handleRecommendedFunds} text={recommendedLabel} />
          <CustomSpacer isHorizontal={true} space={sw8} />
          {productType === "prsDefault" ? null : (
            <StatusBadge color={showBy === "all" ? "primary" : "secondary"} onPress={handleAllFunds} text={allFundsLabel} />
          )}
          <CustomFlexSpacer />
          <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={page} totalPages={pages} />
          <CustomSpacer isHorizontal={true} space={sw24} />
        </View>
        <CustomSpacer space={sh8} />
        <View style={borderBottomGray2} />
        <CustomSpacer space={sh16} />
        <View style={tableContainer}>
          <AdvanceTable
            // activeAccordion={activeAccordion}
            columns={columns}
            data={list}
            disabledIndex={checkEpf}
            headerPopup={{
              content: riskCategory.map((contentRisk) => ({ text: contentRisk })),
              onPressContent: ({ hide, text }) => {
                updateFilter({ ...filter, riskCategory: [text] });
                hide();
              },
              selectedIndex: riskCategory.map((contentRisk, index) => (filter.riskCategory!.includes(contentRisk) ? index : -1)),
            }}
            onRowSelect={onRowSelect}
            RenderCustomItem={(customItem: ITableCustomItem) => {
              const type = customItem.item.rawData.isSyariah === "Yes" ? "Shariah" : "Conventional";
              return (
                <View style={centerHV}>
                  <Text style={fs12BoldBlue1}>{type}</Text>
                </View>
              );
            }}
            RenderEmptyState={() => (
              <EmptyTable hintText={EMPTY_STATE.SUBTITLE} loading={loading} title={EMPTY_STATE.LABEL_NO_RESULTS} subtitle={subtitle} />
            )}
            RenderOptions={(props: ITableOptions) => (
              <ProductOptions
                {...props}
                handleShareDocuments={handleShareDocuments}
                handleShowPerformance={handleShowPerformance}
                handleViewDetails={handleViewDetails}
                shareSuccess={shareSuccess}
              />
            )}
            RowSelectionItem={() => (
              <TouchableWithoutFeedback onPress={handleResetSelected}>
                <View style={{ width: sw56, ...centerHV }}>
                  {selectedFunds.length > 0 ? (
                    <View
                      style={{
                        ...centerHV,
                        backgroundColor: colorRed._1,
                        borderRadius: sw4,
                        height: sw18,
                        width: sw18,
                      }}>
                      <View style={{ backgroundColor: colorWhite._1, height: sh2, width: sw8, borderRadius: sw1 }} />
                    </View>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            )}
            // RenderAccordion={renderAccordion}
            rowSelection={selectedFunds}
            rowSelectionKey="fundCode"
          />
          <CustomSpacer space={sh32} />
        </View>
      </View>
    </View>
  );
};
