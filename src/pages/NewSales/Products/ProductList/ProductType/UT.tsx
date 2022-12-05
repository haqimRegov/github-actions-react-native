import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, Pagination } from "../../../../../components";
import { FILTER_RISK } from "../../../../../data/dictionary";
import { getProductList } from "../../../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { borderBottomGray2, colorWhite, flexChild, flexRow, sh152, sh192, shadow12Black116, sw24 } from "../../../../../styles";
import { isNotEmpty } from "../../../../../utils";
import { ProductHeader } from "../Header";
import { ProductListView } from "../Listing";

interface UnitTrustProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  shareSuccess?: boolean;
  tabsContent?: ReactNode;
}

const UnitTrustComponent: FunctionComponent<UnitTrustProps> = ({
  accountDetails,
  addSelectedFund,
  addUtAllFunds,
  addUtFilters,
  addUtRecommendedFunds,
  addUtSearch,
  addUtSort,
  addViewFund,
  // details,
  global,
  newSales,
  products,
  productType,
  resetSelectedFund,
  resetUTFilter,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  shareSuccess,
  tabsContent,
  updateUtShowBy,
  updateAvailableFilters,
}: UnitTrustProps) => {
  const { isMultiUtmc } = global;
  const { riskInfo, transactionType } = newSales;
  const navigation = useNavigation<IStackNavigationProp>();
  const { availableFilters } = products;
  const { all, filters, page, pages, recommended, search, showBy, sort, totalCount } = products.ut;
  const [loading, setLoading] = useState<boolean>(false);
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

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskInfo.appetite);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex + 1);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const request: IProductListRequest = {
      fundCurrency: filters.fundCurrency || [],
      fundType: filters.fundType![0] || "",
      // isConventional: filters.conventional![0], // Not used in BE
      isEpf: filters.epfApproved![0] || "",
      issuingHouse: filters.issuingHouse || [],
      isSyariah: isNotEmpty(filters.shariahApproved) && filters.shariahApproved!.length > 0 ? filters.shariahApproved![0] : "",
      netWorth: riskInfo.hnwStatus,
      page: newPage,
      recommendedRisk: riskInfo.appetite,
      riskCategory: riskCategory || [],
      search: search,
      showBy: showBy,
      sort: sort,
      tab: "ut",
    };
    const productListResponse: IProductListResponse = await getProductList(request, navigation, setLoading);
    setLoading(false);
    if (productListResponse !== undefined) {
      const { data, error } = productListResponse;
      if (error === null && data !== null) {
        return data.result;
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
    return undefined;
  };

  const handleFetchUT = async (newPage: string) => {
    Keyboard.dismiss();
    const funds = await handleFetch(newPage);
    if (funds !== undefined) {
      if (showBy === "all") {
        addUtAllFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            recommended: totalCount.recommended === "" ? funds.totalCount.recommended : totalCount.recommended,
          },
        });
      } else {
        addUtRecommendedFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            all: totalCount.all === "" ? funds.totalCount.all : totalCount.all,
          },
        });
      }
      const updatedFilters: IProductAvailableFilter = { ...funds.filters };
      if (funds.filters.fundCategory!.includes("BALANCE")) {
        const updatedFundCategory = [...funds.filters.fundCategory!];
        const findBalanceIndex = funds.filters.fundCategory!.findIndex((eachCategory: string) => eachCategory === "BALANCE");
        updatedFundCategory.splice(findBalanceIndex, 1, "BALANCED");
        updatedFilters.fundCategory = updatedFundCategory;
      }
      updateAvailableFilters(updatedFilters);
    }
  };

  const handleShowFilter = () => {
    if (filterVisible === false) {
      setFilterTemp(filters);
    }
    setFilterVisible(!filterVisible);
    setScrollEnabled(!scrollEnabled);
  };

  const handleSearch = () => {
    if (filterVisible === false) {
      addUtSearch(inputSearch);
    }
  };

  const handleConfirmFilter = () => {
    addUtFilters(filterTemp);
    addUtSearch(inputSearch);
  };

  const handleUpdateFilter = (newFilter: IProductFilter) => {
    setFilterTemp(newFilter);
    addUtFilters(newFilter);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filters);
  };

  const handleResetFilter = () => {
    const epfAccountType = transactionType === "Sales" && accountDetails.fundType === "ut" && accountDetails.isEpf === true;
    if (epfAccountType === true) {
      addUtFilters({
        fundCurrency: [],
        fundType: [],
        issuingHouse: [],
        riskCategory: [],
        shariahApproved: [],
        conventional: [],
        epfApproved: ["Yes"],
      });
    } else {
      resetUTFilter();
    }
  };

  const handleAllFunds = () => {
    if (showBy === "recommended") {
      updateUtShowBy("all");
    }
  };

  const handleRecommendedFunds = () => {
    if (showBy === "all") {
      updateUtShowBy("recommended");
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
      handleFetchUT(nextPage.toString());
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
      handleFetchUT(prevPage.toString());
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

  useEffect(() => {
    // when sort, search, filter is updated
    handleFetchUT(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters, showBy]);

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
      {accountDetails.accountNo === "" ? (
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
        isMultiUtmc={isMultiUtmc}
        loading={loading}
        list={loading === true ? [] : (list as unknown as ITableData[])}
        page={defaultPage}
        pages={defaultPages}
        productType={productType}
        // recommendedRisk={showBy === "recommended" ? recommendedRisk : undefined}
        search={search}
        selectedFunds={selectedFunds as unknown as ITableData[]}
        setViewFund={addViewFund}
        shareSuccess={shareSuccess}
        showBy={showBy}
        sort={sort}
        totalCount={totalCount}
        transactionType={transactionType}
        updateFilter={handleUpdateFilter}
        updateSort={addUtSort}
      />
    </View>
  );
};

export const UnitTrust = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(UnitTrustComponent);
