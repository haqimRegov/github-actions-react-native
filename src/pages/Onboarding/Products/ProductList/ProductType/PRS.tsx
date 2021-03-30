import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer } from "../../../../../components";
import { FILTER_RISK } from "../../../../../data/dictionary";
import { getProductList } from "../../../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { colorWhite, flexChild, sh248, sh296, shadowBlack116, sw24 } from "../../../../../styles";
import { ProductHeader } from "../Header";
import { ProductListView } from "../Listing";

interface PRSProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  shareSuccess?: boolean;
}

const PRSComponent: FunctionComponent<PRSProps> = ({
  addPrsFilters,
  addPrsRecommendedFunds,
  addPrsAllFunds,
  addPrsSearch,
  addPrsSort,
  addSelectedFund,
  addViewFund,
  products,
  productType,
  resetSelectedFund,
  riskScore,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  shareSuccess,
  updatePrsShowBy,
}: PRSProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { all, filters, page, pages, recommended, search, showBy, sort, totalCount } = products.prs;
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

  const absoluteHeaderSpace = filterValues.length > 0 ? sh296 : sh248;

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskScore.appetite);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex + 1);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const request = {
      tab: "prs",
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: filters.shariahApproved![0] || "",
      recommendedRisk: riskScore.appetite,
      riskCategory: riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      isConventional: filters.conventional![0],
      page: newPage,
      sort: sort,
      showBy: showBy,
      search: search,
    };
    // eslint-disable-next-line no-console
    console.log("productList request", request);
    const productListResponse: IProductListResponse = await getProductList(request, navigation);
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

  const handleFetchPRS = async (newPage: string) => {
    Keyboard.dismiss();
    const funds = await handleFetch(newPage);
    if (funds !== undefined) {
      if (showBy === "all") {
        addPrsAllFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            recommended: totalCount.recommended === "" ? funds.totalCount.recommended : totalCount.recommended,
          },
        });
      } else {
        addPrsRecommendedFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            all: totalCount.all === "" ? funds.totalCount.all : totalCount.all,
          },
        });
      }
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
      handleFetchPRS(nextPage.toString());
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
      handleFetchPRS(prevPage.toString());
    }
  };

  useEffect(() => {
    // when sort, search, filter is updated
    handleFetchPRS(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters, showBy]);

  return (
    <View style={{ ...flexChild, borderRadius: sw24, backgroundColor: colorWhite._1, margin: sw24, ...shadowBlack116 }}>
      <ProductHeader
        filter={filterTemp}
        filterVisible={filterVisible}
        handleCancel={handleCancelFilter}
        handleConfirm={handleConfirmFilter}
        handleSearch={handleSearch}
        handleShowFilter={handleShowFilter}
        handleUpdateFilter={handleUpdateFilter}
        inputSearch={inputSearch}
        productType={productType}
        setFilter={setFilterTemp}
        setInputSearch={setInputSearch}
      />
      <CustomSpacer space={absoluteHeaderSpace} />
      <ProductListView
        filter={filterTemp}
        handleAllFunds={handleAllFunds}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleRecommendedFunds={handleRecommendedFunds}
        handleResetSelected={resetSelectedFund}
        handleSelectProduct={handleSelectProduct}
        list={loading === true ? [] : list}
        loading={loading}
        page={defaultPage}
        pages={defaultPages}
        // recommendedRisk={showBy === "recommended" ? recommendedRisk : undefined}
        search={search}
        productType={productType}
        selectedFunds={selectedFunds}
        setViewFund={addViewFund}
        shareSuccess={shareSuccess}
        showBy={showBy}
        sort={sort}
        totalCount={totalCount}
        updateFilter={handleUpdateFilter}
        updateSort={addPrsSort}
      />
    </View>
  );
};

export const PRS = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(PRSComponent);
