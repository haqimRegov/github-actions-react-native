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

interface AMPProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  shareSuccess?: boolean;
}

const AMPComponent: FunctionComponent<AMPProps> = ({
  addAmpAllFunds,
  addAmpFilters,
  addAmpRecommendedFunds,
  addAmpSearch,
  addAmpSort,
  addSelectedFund,
  addViewFund,
  products,
  productType,
  resetSelectedFund,
  riskProfile,
  selectedFunds,
  setLoading,
  shareSuccess,
  updateAmpPage,
  updateAmpShowBy,
}: AMPProps) => {
  const { all, filters, page, pages, recommended, search, showBy, sort, totalCount } = products.amp;
  const list = showBy === "recommended" ? recommended : all;
  const [filterTemp, setFilterTemp] = useState<IProductFilter>(filters);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");
  const prevPage = usePrevious<string>(page);
  const defaultPage = page !== "" ? parseInt(page, 10) : 0;
  const defaultPages = pages !== "" ? parseInt(pages, 10) : 0;

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskProfile);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex + 1);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async () => {
    setLoading(true);
    const sortAllFunds = showBy === "all" ? [{ column: "fundAbbr", value: "asc" }] : [];
    const req = {
      tab: "amp",
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: filters.shariahApproved![0] || "",
      riskCategory: riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      isConventional: filters.conventional![0],
      sort: sortAllFunds,
      showBy: showBy,
      search: search,
      page: page,
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
      Alert.alert(JSON.stringify(error?.message));
    }
    return undefined;
  };

  const handleFetchAMP = async () => {
    Keyboard.dismiss();
    const funds = await handleFetch();
    if (funds !== undefined) {
      if (showBy === "all") {
        addAmpAllFunds(funds);
      } else {
        addAmpRecommendedFunds(funds);
      }
    }
  };

  const handleShowFilter = () => {
    if (filterVisible && showMore) {
      setShowMore(false);
    }
    setFilterVisible(!filterVisible);
  };

  const handleSearch = () => {
    updateAmpPage("0");
    addAmpSearch(inputSearch);
  };

  const handleConfirmFilter = () => {
    updateAmpPage("0");
    addAmpFilters(filterTemp);
    addAmpSearch(inputSearch);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filters);
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
    const sectionIndex = selectedFunds.findIndex((fund) => fund.fundId === product.fundId);
    const newSelectedFunds = [...selectedFunds];
    if (sectionIndex === -1) {
      newSelectedFunds.push(product);
    } else if (sectionIndex > -1) {
      newSelectedFunds.splice(sectionIndex, 1);
    }
    addSelectedFund(newSelectedFunds);
  };

  // const scrollEnabled = !filterVisible || (filterVisible && showMore);

  useEffect(() => {
    // when sort, page, search, filter is updated
    if (prevPage !== undefined && prevPage !== "") {
      handleFetchAMP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page, search, filters]);

  useEffect(() => {
    // initial fetch
    if ((showBy === "recommended" && recommended.length === 0) || (showBy === "all" && all.length === 0)) {
      handleFetchAMP();
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
        updateFilter={addAmpFilters}
        updatePage={updateAmpPage}
        updateSort={addAmpSort}
      />
    </View>
  );
};

export const AMP = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(AMPComponent);
