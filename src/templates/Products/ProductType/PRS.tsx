import React, { FunctionComponent, ReactNode, useState } from "react";
import { View } from "react-native";

import { ProductHeader, ProductListView } from "..";
import { CustomFlexSpacer, CustomSpacer, Pagination } from "../../../components";
import { productsState } from "../../../store";
import { borderBottomGray2, colorWhite, flexChild, flexRow, sh152, sh192, shadow12Black116, sw24 } from "../../../styles";
import { isNotEmpty } from "../../../utils";

interface PRSTemplateProps {
  accountDetails?: INewSalesAccountDetails;
  addPrsAllFunds: (funds: IProductListResult) => void;
  addPrsFilters: (filters: IProductFilter) => void;
  addPrsRecommendedFunds: (funds: IProductListResult) => void;
  addPrsSearch: (value: string) => void;
  addPrsSort: (sort: IProductSort[]) => void;
  addSelectedFund: (fund: IProduct[]) => void;
  addViewFund: (fund: IProduct) => void;
  handleCancelOnboarding?: () => void;
  handleFetchPrs: (page: string) => Promise<void>;
  loading: boolean;
  products: productsState;
  productType: ProductType;
  resetPrsFilter: () => void;
  resetSelectedFund: () => void;
  scrollEnabled: boolean;
  selectedFunds: IProduct[];
  setScrollEnabled: (toggle: boolean) => void;
  tabsContent?: ReactNode;
  updatePrsShowBy: (show: ProductListShowByType) => void;
}

export const PRSTemplate: FunctionComponent<PRSTemplateProps> = ({
  accountDetails,
  addSelectedFund,
  addPrsFilters,
  addPrsSearch,
  addPrsSort,
  addViewFund,
  // details,
  handleFetchPrs,
  loading,
  products,
  productType,
  resetSelectedFund,
  resetPrsFilter,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  tabsContent,
  updatePrsShowBy,
}: PRSTemplateProps) => {
  const { availableFilters } = products;
  const { all, filters, page, pages, recommended, search, showBy, sort, totalCount } = products.prs;
  const list = showBy === "recommended" ? recommended : all;
  const [filterTemp, setFilterTemp] = useState<IProductFilter>(filters);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);
  const defaultPage = page !== "" ? parseInt(page, 10) : 0;
  const defaultPages = pages !== "" ? parseInt(pages, 10) : 0;

  const filterValues = Object.values(filters)
    .flat(1)
    .filter((value) => value !== "");

  const absoluteHeaderSpace = filterValues.length > 0 ? sh192 : sh152;

  const handleShowFilter = () => {
    if (filterVisible === false) {
      setFilterTemp(filters);
    }
    setFilterVisible(!filterVisible);
    setScrollEnabled(!scrollEnabled);
  };

  const handleSearch = () => {
    if (filterVisible === false) {
      addPrsSearch(inputSearch);
    }
  };

  const handleConfirmFilter = () => {
    addPrsFilters(filterTemp);
    addPrsSearch(inputSearch);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filters);
  };

  const handleUpdateFilter = (newFilter: IProductFilter) => {
    setFilterTemp(newFilter);
    addPrsFilters(newFilter);
  };

  const handleAllFunds = () => {
    if (showBy === "recommended") {
      updatePrsShowBy("all");
    }
  };

  const handleRecommendedFunds = () => {
    if (showBy === "all") {
      updatePrsShowBy("recommended");
    }
  };

  const handleSelectProduct = (product: IProduct) => {
    const sectionIndex = selectedFunds.findIndex((fund) => fund.fundCode === product.fundCode);
    const newSelectedFunds = [...selectedFunds];
    if (sectionIndex === -1) {
      newSelectedFunds.push(product);
    } else if (sectionIndex > -1) {
      newSelectedFunds.splice(sectionIndex, 1);
    }
    addSelectedFund(newSelectedFunds);
  };

  const handleNext = async () => {
    if (loading === false) {
      const nextPage = parseInt(page, 10) < parseInt(pages, 10) ? parseInt(page, 10) + 1 : parseInt(pages, 10);
      handleFetchPrs(nextPage.toString());
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
      handleFetchPrs(prevPage.toString());
    }
  };

  const isNotFiltered =
    filters.conventional?.length === 0 &&
    filters.fundType?.length === 0 &&
    filters.issuingHouse?.length === 0 &&
    filters.riskCategory?.length === 0 &&
    filters.shariahApproved?.length === 0;

  return (
    <View style={{ ...flexChild, borderRadius: sw24, backgroundColor: colorWhite._1, margin: sw24, ...shadow12Black116 }}>
      <ProductHeader
        accountDetails={accountDetails}
        availableFilters={availableFilters}
        currentFilter={filters}
        filter={filterTemp}
        filterVisible={filterVisible}
        handleCancel={handleCancelFilter}
        handleConfirm={handleConfirmFilter}
        handleResetFilter={resetPrsFilter}
        handleSearch={handleSearch}
        handleShowFilter={handleShowFilter}
        handleUpdateFilter={handleUpdateFilter}
        inputSearch={inputSearch}
        isNotFiltered={isNotFiltered}
        prevSearch={search}
        productType={productType}
        setFilter={setFilterTemp}
        setInputSearch={setInputSearch}
      />
      <CustomSpacer space={absoluteHeaderSpace} />
      {accountDetails === undefined || (isNotEmpty(accountDetails) && accountDetails.accountNo === "") ? (
        <View>
          <View style={flexRow}>
            {tabsContent}
            <CustomFlexSpacer />
            <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={defaultPage} totalPages={defaultPages} />
            <CustomSpacer isHorizontal={true} space={sw24} />
          </View>
          <View style={borderBottomGray2} />
        </View>
      ) : null}
      <ProductListView
        accountDetails={accountDetails}
        addFunds={addSelectedFund}
        filter={filterTemp}
        handleAllFunds={handleAllFunds}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleRecommendedFunds={handleRecommendedFunds}
        handleResetSelected={resetSelectedFund}
        handleSelectProduct={handleSelectProduct}
        list={loading === true ? [] : (list as unknown as ITableData[])}
        loading={loading}
        page={defaultPage}
        pages={defaultPages}
        // recommendedRisk={showBy === "recommended" ? recommendedRisk : undefined}
        search={search}
        productType={productType}
        selectedFunds={selectedFunds as unknown as ITableData[]}
        setViewFund={addViewFund}
        showBy={showBy}
        sort={sort}
        totalCount={totalCount}
        updateFilter={handleUpdateFilter}
        updateSort={addPrsSort}
      />
    </View>
  );
};
