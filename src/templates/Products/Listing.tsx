import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { AdvanceTable, CustomFlexSpacer, CustomSpacer, EmptyTable, Pagination, StatusBadge } from "../../components";
import { Language, NunitoBold, NunitoRegular } from "../../constants";
import {
  borderBottomGray2,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  disabledOpacity5,
  flexChild,
  flexRow,
  fs12RegBlue1,
  fs12RegGray5,
  fsTransformNone,
  fsUppercase,
  px,
  sh12,
  sh16,
  sh2,
  sw1,
  sw12,
  sw18,
  sw20,
  sw224,
  sw24,
  sw4,
  sw48,
  sw56,
  sw64,
  sw8,
  sw88,
  sw96,
} from "../../styles";
import { isArrayNotEmpty, isNotEmpty, titleCaseString } from "../../utils";
import { ProductsGroupBy } from "./GroupBy";

const { EMPTY_STATE, PRODUCT_LIST, DASHBOARD_EDD } = Language.PAGE;

interface ProductListViewProps {
  accountDetails?: INewSalesAccountDetails;
  addFunds: (data: IProduct[]) => void;
  filter: IProductFilter;
  handleAllFunds?: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleRecommendedFunds?: () => void;
  handleResetSelected: () => void;
  handleSelectProduct: (product: IProduct) => void;
  isMultiUtmc?: boolean;
  list: ITableData[];
  loading: boolean;
  page: number;
  pages: number;
  productType: ProductType;
  recommendedRisk?: string[];
  search: string;
  selectedFunds: ITableData[];
  setViewFund: (fund: IProduct) => void;
  showBy?: ProductListShowByType;
  sort: IProductSort[];
  totalCount: IProductTotalCount;
  transactionType?: TTransactionType;
  updateFilter: (filter: IProductFilter) => void;
  updateSort: (sort: IProductSort[]) => void;
  withEpf?: boolean;
}

export const ProductListView: FunctionComponent<ProductListViewProps> = ({
  accountDetails,
  addFunds,
  filter,
  handleAllFunds,
  handleNext,
  handlePrev,
  handleRecommendedFunds,
  handleResetSelected,
  handleSelectProduct,
  isMultiUtmc,
  list,
  loading,
  page,
  pages,
  productType,
  recommendedRisk,
  search,
  selectedFunds,
  setViewFund,
  showBy,
  sort,
  totalCount,
  transactionType,
  updateFilter,
  updateSort,
  withEpf,
}: ProductListViewProps) => {
  const findAbbr = sort.filter((sortType) => sortType.column === "fundAbbr" && sortType.value !== "");
  const findName = sort.filter((sortType) => sortType.column === "fundName" && sortType.value !== "");
  const findRisk = sort.filter((sortType) => sortType.column === "riskCategory" && sortType.value !== "");
  const sortAbbr = findAbbr.length > 0 ? findAbbr[0].value : "ascending";
  const sortName = findName.length > 0 ? findName[0].value : "ascending";
  const sortRisk = findRisk.length > 0 ? findRisk[0].value : "ascending";
  const sortedColumns = sort.filter((eachSort) => eachSort.value !== "").map((currentSortType) => currentSortType.column);

  const singleUtmcOnly =
    isMultiUtmc === false && transactionType === "Sales" && isNotEmpty(accountDetails) && accountDetails!.isEpf === true;
  const findSelectedEpfFund = selectedFunds.findIndex((eachFund) => eachFund.isEpf === "Yes");
  const selectedUtmc = findSelectedEpfFund !== -1 ? selectedFunds[findSelectedEpfFund].issuingHouse : undefined;
  const checkUtmcIndex =
    singleUtmcOnly === true && isArrayNotEmpty(selectedFunds) && selectedUtmc !== undefined
      ? list.map((eachRow, index) => (eachRow.issuingHouse !== selectedUtmc ? index : null))
      : undefined;

  const checkEpf =
    isNotEmpty(withEpf) && withEpf === false
      ? list
          .map((eachRow: ITableData, index) => (eachRow.isEpf === "Yes" ? index : null))
          .filter((eachUtmcIndex: number | null) => eachUtmcIndex !== null)
          .map((eachIndex) => eachIndex!)
      : [];
  const disabledIndex: number[] | undefined =
    checkUtmcIndex !== undefined
      ? checkUtmcIndex.filter((eachUtmcIndex: number | null) => eachUtmcIndex !== null).map((eachIndex) => eachIndex!)
      : checkEpf;

  const handleSortAbbr = async () => {
    const updatedAbbrSort: IProductSort[] = sort.map((abbrSort) =>
      abbrSort.column === "fundAbbr" ? { ...abbrSort, value: abbrSort.value === "desc" ? "asc" : "desc" } : { ...abbrSort, value: "" },
    );
    updateSort(updatedAbbrSort);
  };

  const handleSortName = async () => {
    const updatedAbbrName: IProductSort[] = sort.map((nameSort) =>
      nameSort.column === "fundName" ? { ...nameSort, value: nameSort.value === "desc" ? "asc" : "desc" } : { ...nameSort, value: "" },
    );
    updateSort(updatedAbbrName);
  };

  const handleSortRisk = async () => {
    const updatedRisk: IProductSort[] = sort.map((riskSort) =>
      riskSort.column === "riskCategory" ? { ...riskSort, value: riskSort.value === "desc" ? "asc" : "desc" } : { ...riskSort, value: "" },
    );
    updateSort(updatedRisk);
  };

  const handleView = (item: ITableRowData) => {
    setViewFund(item.rawData as unknown as IProduct);
  };

  const columns: ITableColumn[] = [
    {
      icon: { name: sortAbbr === "desc" ? "arrow-up" : "arrow-down" },
      key: [
        {
          key: "fundAbbr",
          textStyle: {
            ...fs12RegBlue1,
            ...fsUppercase,
            fontFamily: sortedColumns.includes("fundAbbr") ? NunitoBold : NunitoRegular,
          },
        },
      ],
      viewStyle: { width: sw88 },
      onPressHeader: handleSortAbbr,
      title: PRODUCT_LIST.LABEL_COLUMN_FUND_CODE,
    },
    {
      key: [
        {
          key: "fundName",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
            fontFamily: sortedColumns.includes("fundName") ? NunitoBold : NunitoRegular,
          },
        },
      ],
      icon: { name: sortName === "desc" ? "arrow-up" : "arrow-down" },
      viewStyle: { width: sw224 },
      onPressHeader: handleSortName,
      title: productType === "amp" ? PRODUCT_LIST.LABEL_COLUMN_PORTFOLIO : PRODUCT_LIST.LABEL_COLUMN_NAME,
    },
    {
      customItem: true,
      key: [
        {
          key: "fundCurrencies",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
          },
        },
      ],
      viewStyle: { width: sw88 },
      title: PRODUCT_LIST.LABEL_COLUMN_CURRENCY,
    },
    {
      customItem: true,
      key: [
        {
          key: "fundCategory",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
          },
        },
      ],
      viewStyle: { width: sw96 },
      title: PRODUCT_LIST.LABEL_COLUMN_FUND_TYPE,
    },
    {
      customItem: true,
      key: [
        {
          key: "riskCategory",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
            fontFamily: sortedColumns.includes("riskCategory") ? NunitoBold : NunitoRegular,
          },
        },
      ],
      icon: { name: sortRisk === "desc" ? "arrow-up" : "arrow-down" },
      onPressHeader: handleSortRisk,
      viewStyle: { width: sw64 },
      title: PRODUCT_LIST.LABEL_COLUMN_RISK_NEW,
    },
    {
      customItem: true,
      key: [
        {
          key: "isEpf",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
          },
        },
      ],
      viewStyle: { width: sw48 },
      title: PRODUCT_LIST.LABEL_COLUMN_EPF,
    },
    {
      customItem: true,
      key: [
        {
          key: "isSyariah",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
          },
        },
      ],
      viewStyle: { width: sw88 },
      title: PRODUCT_LIST.LABEL_COLUMN_SHARIAH,
    },
    {
      itemIcon: { color: colorBlue._1, name: "eye-show", size: sw20 },
      key: [],
      onPressItem: handleView,
      viewStyle: { ...centerHV, width: sw56 },
      title: DASHBOARD_EDD.LABEL_VIEW,
    },
  ];

  const onRowSelect = (data: ITableData) => {
    handleSelectProduct(data as unknown as IProduct);
  };

  const checkboxDisabled = singleUtmcOnly === true && isArrayNotEmpty(selectedFunds) === false;

  const handleRowSelectionHeader = () => {
    if (checkboxDisabled === false) {
      if (selectedFunds.length > 0) {
        handleResetSelected();
      } else {
        addFunds(list as unknown as IProduct[]);
      }
    }
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
        <CustomSpacer space={sh12} />
        <View style={{ ...flexRow, ...centerVertical }}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <Text style={fs12RegGray5}>{PRODUCT_LIST.LABEL_TYPES}</Text>
          <CustomSpacer isHorizontal={true} space={sw8} />
          <StatusBadge
            color={showBy === "all" ? "secondary" : "primary"}
            onPress={handleRecommendedFunds}
            style={px(sw12)}
            text={recommendedLabel}
            textStyle={{ fontFamily: NunitoBold }}
          />
          <CustomSpacer isHorizontal={true} space={sw8} />
          {productType === "prsDefault" ? null : (
            <StatusBadge
              color={showBy === "all" ? "primary" : "secondary"}
              onPress={handleAllFunds}
              style={px(sw12)}
              text={allFundsLabel}
              textStyle={{ fontFamily: NunitoBold }}
            />
          )}
          {isNotEmpty(accountDetails) && isNotEmpty(accountDetails?.accountNo) && accountDetails!.accountNo !== "" ? (
            <Fragment>
              <CustomFlexSpacer />
              <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={page} totalPages={pages} />
              <CustomSpacer isHorizontal={true} space={sw24} />
            </Fragment>
          ) : null}
        </View>
        <CustomSpacer space={sh12} />
        <View style={borderBottomGray2} />
        <CustomSpacer space={sh16} />
        <View style={tableContainer}>
          <AdvanceTable
            // activeAccordion={activeAccordion}
            columns={columns}
            data={list}
            disabledIndex={disabledIndex}
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
              const { isSyariah, masterList } = customItem.item.rawData as unknown as IProduct;
              const fundEpf = masterList.map((eachMasterList) => eachMasterList.isEpf);
              const updatedFundEpf = fundEpf.filter((item, index) => fundEpf.indexOf(item) === index);
              const type = isSyariah === "Yes" ? "Shariah" : "Conventional";
              const sortFontFamily: TextStyle = sortedColumns.includes("riskCategory")
                ? { fontFamily: NunitoBold }
                : { fontFamily: NunitoRegular };
              switch (customItem.keyName.key) {
                case "isEpf":
                  return (
                    <View style={centerHV}>
                      <Text style={fs12RegBlue1}>{updatedFundEpf.join(", ")}</Text>
                    </View>
                  );
                case "isSyariah":
                  return (
                    <View style={centerHV}>
                      <Text style={fs12RegBlue1}>{type}</Text>
                    </View>
                  );
                case "riskCategory":
                  return (
                    <View style={centerHV}>
                      <Text style={{ ...fs12RegBlue1, ...sortFontFamily }}>
                        {titleCaseString(customItem.item.rawData.riskCategory as string)}
                      </Text>
                    </View>
                  );
                case "fundCurrencies":
                  return (
                    <View style={centerHV}>
                      <Text style={fs12RegBlue1}>{(customItem.item.rawData.fundCurrencies as string[]).join(",")}</Text>
                    </View>
                  );
                default:
                  return (
                    <View style={centerHV}>
                      <Text style={fs12RegBlue1}>{titleCaseString(customItem.item.rawData.fundCategory as string)}</Text>
                    </View>
                  );
              }
            }}
            RenderEmptyState={() => (
              <EmptyTable hintText={EMPTY_STATE.SUBTITLE} loading={loading} title={EMPTY_STATE.LABEL_NO_RESULTS} subtitle={subtitle} />
            )}
            RenderGroupByLabel={(props: ITableGroupBy) => {
              return <ProductsGroupBy {...props} />;
            }}
            RowSelectionItem={() => {
              const disabledCheckbox = checkboxDisabled === true ? disabledOpacity5 : {};
              const disabledBackground = checkboxDisabled === true ? { backgroundColor: colorGray._4 } : {};
              const checkBoxStyle: ViewStyle = {
                backgroundColor: selectedFunds.length > 0 ? colorRed._1 : colorWhite._1,
                borderWidth: sw1,
                borderColor: selectedFunds.length > 0 ? colorRed._1 : colorBlue._1,
                ...disabledBackground,
                ...disabledCheckbox,
              };
              return (
                <TouchableWithoutFeedback onPress={handleRowSelectionHeader}>
                  <View style={{ width: sw56, ...centerHV }}>
                    <View
                      style={{
                        ...centerHV,
                        backgroundColor: colorRed._1,
                        borderRadius: sw4,
                        height: sw18,
                        width: sw18,
                        ...checkBoxStyle,
                      }}>
                      {checkboxDisabled === true ? null : (
                        <View style={{ backgroundColor: colorWhite._1, height: sh2, width: sw8, borderRadius: sw1 }} />
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
            // RenderAccordion={renderAccordion}
            rowSelection={selectedFunds}
            rowSelectionKey="fundCode"
          />
          <CustomSpacer space={sh16} />
        </View>
      </View>
    </View>
  );
};
