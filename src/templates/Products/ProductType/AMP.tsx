import React, { FunctionComponent, ReactNode, useState } from "react";
import { View } from "react-native";

import { ProductHeader, ProductListView } from "..";
import { CustomFlexSpacer, CustomSpacer, Pagination } from "../../../components";
import { productsState } from "../../../store";
import { borderBottomGray2, colorWhite, flexChild, flexRow, sh152, sh192, shadow12Black116, sw24 } from "../../../styles";
import { isNotEmpty } from "../../../utils";

interface AMPTemplateProps {
  accountDetails?: INewSalesAccountDetails;
  addAmpAllFunds: (funds: IProductListResult) => void;
  addAmpFilters: (filters: IProductFilter) => void;
  addAmpRecommendedFunds: (funds: IProductListResult) => void;
  addAmpSearch: (value: string) => void;
  addAmpSort: (sort: IProductSort[]) => void;
  addSelectedFund: (fund: IProduct[]) => void;
  addViewFund: (fund: IProduct) => void;
  handleCancelOnboarding?: () => void;
  handleDisabledFundIdRef: (value: string[] | undefined) => void;
  handleFetchAMP: (page: string) => Promise<void>;
  investmentDetails: IProductSales[];
  isMultiUtmc: boolean;
  loading: boolean;
  products: productsState;
  productType: ProductType;
  resetAMPFilter: () => void;
  resetSelectedFund: () => void;
  scrollEnabled: boolean;
  selectedFunds: IProduct[];
  setScrollEnabled: (toggle: boolean) => void;
  tabsContent?: ReactNode;
  transactionType: TTransactionType | undefined;
  updateAmpShowBy: (show: ProductListShowByType) => void;
}

export const AMPTemplate: FunctionComponent<AMPTemplateProps> = ({
  accountDetails,
  addAmpFilters,
  addAmpSearch,
  addAmpSort,
  addSelectedFund,
  addViewFund,
  handleDisabledFundIdRef,
  handleFetchAMP,
  investmentDetails,
  isMultiUtmc,
  loading,
  products,
  productType,
  resetAMPFilter,
  resetSelectedFund,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  tabsContent,
  transactionType,
  updateAmpShowBy,
}: AMPTemplateProps) => {
  const { availableFilters } = products;
  const { all, filters, page, pages, recommended, search, showBy, sort, totalCount } = products.amp;
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
      addAmpSearch(inputSearch);
    }
  };

  const handleConfirmFilter = () => {
    addAmpFilters(filterTemp);
    addAmpSearch(inputSearch);
  };

  const handleUpdateFilter = (newFilter: IProductFilter) => {
    setFilterTemp(newFilter);
    addAmpFilters(newFilter);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filters);
  };

  const handleResetFilter = () => {
    const epfAccountType =
      transactionType === "Sales" && isNotEmpty(accountDetails) && accountDetails!.fundType === "amp" && accountDetails!.isEpf === true;
    if (epfAccountType === true) {
      addAmpFilters({
        fundCurrency: [],
        fundType: [],
        issuingHouse: [],
        riskCategory: [],
        shariahApproved: [],
        conventional: [],
        epfApproved: ["Yes"],
      });
    } else {
      resetAMPFilter();
    }
  };

  const handleAllFunds = () => {
    if (showBy === "recommended") {
      updateAmpShowBy("all");
    }
  };

  const handleRecommendedFunds = () => {
    if (showBy === "all") {
      updateAmpShowBy("recommended");
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
      handleFetchAMP(nextPage.toString());
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
      handleFetchAMP(prevPage.toString());
    }
  };

  const isNotFiltered =
    filters.conventional?.length === 0 &&
    filters.epfApproved?.length === 0 &&
    filters.fundCurrency?.length === 0 &&
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
        handleResetFilter={handleResetFilter}
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
        handleDisabledFundIdRef={handleDisabledFundIdRef}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleRecommendedFunds={handleRecommendedFunds}
        handleResetSelected={resetSelectedFund}
        handleSelectProduct={handleSelectProduct}
        investmentDetails={investmentDetails}
        isMultiUtmc={isMultiUtmc}
        list={loading === true ? [] : (list as unknown as ITableData[])}
        loading={loading}
        page={defaultPage}
        pages={defaultPages}
        productType={productType}
        search={search}
        selectedFunds={selectedFunds as unknown as ITableData[]}
        setViewFund={addViewFund}
        showBy={showBy}
        sort={sort}
        totalCount={totalCount}
        transactionType={transactionType}
        updateFilter={handleUpdateFilter}
        updateSort={addAmpSort}
      />
    </View>
  );
};
