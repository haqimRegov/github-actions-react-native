import React, { Fragment, FunctionComponent } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { AdvanceTable, CustomFlexSpacer, CustomSpacer, LinkText, MenuPopup, Pagination, Tag } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  centerHV,
  centerVertical,
  colorRed,
  colorWhite,
  flexChild,
  flexRow,
  fs10RegBlue38,
  fs12BoldBlue2,
  fsUppercase,
  px,
  py,
  sh15,
  sh2,
  sh32,
  sh4,
  sh8,
  sw1,
  sw120,
  sw136,
  sw16,
  sw20,
  sw24,
  sw323,
  sw4,
  sw56,
  sw8,
  sw88,
  sw96,
} from "../../../../styles";
import { ProductOptions } from "./Actions";

const { PRODUCT_LIST } = Language.PAGE;

interface ProductListViewProps {
  handleAllFunds?: () => void;
  handleRecommendedFunds?: () => void;
  handleResetSelected: () => void;
  handleSelectProduct: (product: IProduct) => void;
  list: ITableData[];
  page: number;
  pages: number;
  totalCount: IProductTotalCount;
  productType: ProductType;
  selectedFunds: ITableData[];
  setViewFund: (fund: IProduct) => void;
  shareSuccess?: boolean;
  showBy?: ProductListShowByType;
  sort: IProductSort[];
  updateFilter: (filter: IProductFilter) => void;
  updatePage: (page: string) => void;
  updateSort: (sort: IProductSort[]) => void;
}

export const ProductListView: FunctionComponent<ProductListViewProps> = ({
  handleAllFunds,
  handleRecommendedFunds,
  handleResetSelected,
  handleSelectProduct,
  list,
  page,
  pages,
  productType,
  setViewFund,
  selectedFunds,
  totalCount,
  shareSuccess,
  showBy,
  sort,
  // updateFilter,
  updatePage,
  updateSort,
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

  const handleFilterRisk = () => {
    // TODO filter
    // updateFilter();
  };

  const columns: ITableColumn[] = [
    {
      icon: {
        name: sortAbbr === "desc" ? "arrow-up" : "arrow-down",
      },
      key: [{ key: "fundAbbr", textStyle: fsUppercase }],
      viewStyle: {
        width: sw136,
      },
      onPressHeader: handleSortAbbr,
      title: PRODUCT_LIST.LABEL_COLUMN_FUND_CODE,
    },
    {
      key: [{ key: "fundName", textStyle: fsUppercase }],
      icon: {
        name: sortName === "desc" ? "arrow-up" : "arrow-down",
      },
      viewStyle: {
        width: sw323,
      },
      onPressHeader: handleSortName,
      title: PRODUCT_LIST.LABEL_COLUMN_NAME,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: [{ key: "riskCategory" }],
      viewStyle: {
        width: sw96,
      },
      customHeader: true,
      onPressItem: handleFilterRisk,
      title: PRODUCT_LIST.LABEL_COLUMN_RISK,
    },
    {
      key: [{ key: "isEpf" }],
      viewStyle: {
        width: sw56,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_EPF,
    },
    {
      key: [{ key: "isSyariah" }],
      viewStyle: {
        width: sw88,
      },
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

  const handleNext = () => {
    const nextPage = page < pages ? page + 1 : pages;
    updatePage(nextPage.toString());
  };

  const handlePrev = () => {
    const prevPage = page > 1 ? page - 1 : 1;
    updatePage(prevPage.toString());
  };

  const onRowSelect = (data: ITableData) => {
    handleSelectProduct(data as IProduct);
  };

  const tableContainer: ViewStyle = {
    backgroundColor: colorWhite._2,
    ...flexChild,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };
  // const scrollEnabled = !filterVisible || (filterVisible && showMore);
  // const filterPills = Object.values(filters)
  //   .flat(1)
  //   .filter((value) => value !== "");

  // TODO temporary
  const recommendedLabel = `${PRODUCT_LIST.LABEL_RECOMMENDED} (${totalCount.recommended})`;
  const allFundsLabel = `${PRODUCT_LIST.LABEL_ALL_FUNDS} (${totalCount.all})`;

  return (
    <View style={{ ...flexChild, borderRadius: sw24 }}>
      <View
        style={{
          ...flexChild,
          backgroundColor: colorWhite._1,
          borderBottomRightRadius: sw24,
          borderBottomLeftRadius: sw24,
        }}>
        {/* <CustomSpacer space={sh234} /> */}
        {/* {filterPills.length === 0 ? null : <CustomSpacer space={sh48} />} */}
        <View style={flexRow}>
          <CustomSpacer isHorizontal={true} space={sw20} />
          <Tag color={showBy === "all" ? "secondary" : "primary"} onPress={handleRecommendedFunds} text={recommendedLabel} />
          <CustomSpacer isHorizontal={true} space={sw8} />
          {productType === "prs" || productType === "prsDefault" ? null : (
            <Tag color={showBy === "all" ? "primary" : "secondary"} onPress={handleAllFunds} text={allFundsLabel} />
          )}
          <CustomFlexSpacer />
          <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={page} totalPages={pages} />
          <CustomSpacer isHorizontal={true} space={sw24} />
        </View>
        <CustomSpacer space={sh15} />
        <View style={tableContainer}>
          <AdvanceTable
            // activeAccordion={activeAccordion}
            columns={columns}
            data={list}
            rowSelection={selectedFunds}
            rowSelectionKey="fundId"
            onRowSelect={onRowSelect}
            // RenderAccordion={renderAccordion}
            RenderCustomHeader={({ item }) => {
              return (
                <MenuPopup
                  RenderButton={({ show }) => {
                    const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...px(sw8) };
                    return (
                      <TouchableWithoutFeedback onPress={show}>
                        <View style={headerStyle}>
                          <Text style={fs10RegBlue38}>{item.title}</Text>
                          {item.icon === undefined ? null : (
                            <Fragment>
                              <CustomSpacer isHorizontal={true} space={sw4} />
                              <IcoMoon {...item.icon} />
                            </Fragment>
                          )}
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  }}
                  RenderContent={({ hide }) => {
                    return (
                      <View style={{ width: sw120, ...px(sw16), ...py(sh8) }}>
                        <LinkText onPress={hide} style={{ ...fs12BoldBlue2, ...py(sh4) }} text={"Low"} />
                        <LinkText onPress={hide} style={{ ...fs12BoldBlue2, ...py(sh4) }} text={"Medium"} />
                        <LinkText onPress={hide} style={{ ...fs12BoldBlue2, ...py(sh4) }} text={"High"} />
                      </View>
                    );
                  }}
                />
              );
            }}
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
                        height: sw16,
                        width: sw16,
                      }}>
                      <View style={{ backgroundColor: colorWhite._1, height: sh2, width: sw8, borderRadius: sw1 }} />
                    </View>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          <CustomSpacer space={sh32} />
        </View>
      </View>
      {/* <CustomSpacer space={sh32} /> */}
    </View>
  );
};
