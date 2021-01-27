import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer } from "../../../../../components";
import { FILTER_RISK } from "../../../../../data/dictionary";
import { usePrevious } from "../../../../../hooks";
import { getProductList } from "../../../../../network-actions/products";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { colorWhite, flexChild, shadowBlack116, sw24 } from "../../../../../styles";
import { ProductHeader } from "../Header";
import { ProductListView } from "../Listing";

interface UnitTrustProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  shareSuccess?: boolean;
}

const UnitTrustComponent: FunctionComponent<UnitTrustProps> = ({
  addSelectedFund,
  addUtAllFunds,
  addUtFilters,
  addUtRecommendedFunds,
  addUtSearch,
  addUtSort,
  addViewFund,
  // details,
  products,
  productType,
  resetSelectedFund,
  riskScore,
  scrollEnabled,
  selectedFunds,
  setLoading,
  setScrollEnabled,
  shareSuccess,
  updateUtShowBy,
}: UnitTrustProps) => {
  const { all, filters, page, pages, recommended, search, showBy, sort, totalCount } = products.ut;
  const list = showBy === "recommended" ? recommended : all;
  const [filterTemp, setFilterTemp] = useState<IProductFilter>(filters);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);
  const [showMore, setShowMore] = useState<boolean>(false);
  const prevPageRef = usePrevious<string>(page);
  const defaultPage = page !== "" ? parseInt(page, 10) : 0;
  const defaultPages = pages !== "" ? parseInt(pages, 10) : 0;

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskScore.appetite);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex + 1);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const req: IProductListRequest = {
      // age: moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "years").toString(),
      fundCurrency: filters.fundCurrency || [],
      fundType: filters.fundType![0] || "",
      isConventional: filters.conventional![0],
      isEpf: filters.epfApproved![0] || "",
      issuingHouse: filters.issuingHouse || [],
      isSyariah: filters.shariahApproved![0] || "",
      // netWorth: riskScore.netWorth,
      page: newPage,
      riskCategory: riskCategory || [],
      search: search,
      showBy: showBy,
      sort: sort,
      tab: "ut",
    };
    // eslint-disable-next-line no-console
    console.log("productList", req);
    const productListResponse: IProductListResponse = await getProductList(req);
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
        addUtAllFunds(funds);
      } else {
        addUtRecommendedFunds(funds);
      }
    }
  };

  const handleShowFilter = () => {
    if (filterVisible && showMore) {
      setShowMore(false);
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

  const handleCancelFilter = () => {
    setFilterTemp(filters);
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
    const sectionIndex = selectedFunds.findIndex((fund) => fund.fundId === product.fundId);
    const newSelectedFunds = [...selectedFunds];
    if (sectionIndex === -1) {
      newSelectedFunds.push(product);
    } else if (sectionIndex > -1) {
      newSelectedFunds.splice(sectionIndex, 1);
    }
    addSelectedFund(newSelectedFunds);
  };

  const handleNext = async () => {
    const nextPage = parseInt(page, 10) < parseInt(pages, 10) ? parseInt(page, 10) + 1 : parseInt(pages, 10);
    handleFetchUT(nextPage.toString());
  };

  const handlePrev = () => {
    const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
    handleFetchUT(prevPage.toString());
  };

  useEffect(() => {
    // when sort, search, filter is updated
    if (prevPageRef !== undefined && prevPageRef !== "") {
      handleFetchUT("1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters]);

  useEffect(() => {
    // initial fetch
    if ((showBy === "recommended" && recommended.length === 0) || (showBy === "all" && all.length === 0)) {
      handleFetchUT("1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBy]);

  return (
    <View style={{ ...flexChild, borderRadius: sw24, backgroundColor: colorWhite._1, margin: sw24, ...shadowBlack116 }}>
      <ProductHeader
        filter={filterTemp}
        filterVisible={filterVisible}
        handleCancel={handleCancelFilter}
        handleConfirm={handleConfirmFilter}
        handleSearch={handleSearch}
        handleShowFilter={handleShowFilter}
        inputSearch={inputSearch}
        productType={productType}
        setFilter={setFilterTemp}
        setInputSearch={setInputSearch}
      />
      <CustomSpacer space={248} />
      <ProductListView
        filter={filterTemp}
        handleAllFunds={handleAllFunds}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleRecommendedFunds={handleRecommendedFunds}
        handleResetSelected={resetSelectedFund}
        handleSelectProduct={handleSelectProduct}
        list={list}
        page={defaultPage}
        pages={defaultPages}
        productType={productType}
        selectedFunds={selectedFunds}
        setViewFund={addViewFund}
        shareSuccess={shareSuccess}
        showBy={showBy}
        sort={sort}
        totalCount={totalCount}
        updateFilter={addUtFilters}
        updateSort={addUtSort}
      />
    </View>
  );
};

export const UnitTrust = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(UnitTrustComponent);
