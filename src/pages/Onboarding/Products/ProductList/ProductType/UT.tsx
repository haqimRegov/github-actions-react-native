import React, { FunctionComponent, useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer } from "../../../../../components";
import { FILTER_RISK } from "../../../../../data/dictionary";
import { usePrevious } from "../../../../../hooks";
import { getProductList } from "../../../../../network-actions/products";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { colorWhite, flexChild, shadowBlack116, sw24 } from "../../../../../styles";
import { AlertDialog } from "../../../../../utils";
import { ProductHeader } from "../Header";
import { ProductListView } from "../Listing";

interface UnitTrustProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
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
  products,
  productType,
  resetSelectedFund,
  riskProfile,
  selectedFunds,
  setLoading,
  shareSuccess,
  updateUtPage,
  updateUtShowBy,
}: UnitTrustProps) => {
  const { all, filters, page, pages, recommended, search, showBy, sort, totalCount } = products.ut;
  const list = showBy === "recommended" ? recommended : all;
  const [filterTemp, setFilterTemp] = useState<IProductFilter>(filters);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const prevPage = usePrevious<string>(page);
  const defaultPage = page !== "" ? parseInt(page, 10) : 0;
  const defaultPages = pages !== "" ? parseInt(pages, 10) : 0;

  const hideLoading = () => {
    setLoading(false);
  };

  const handleError = (e: any) => {
    // eslint-disable-next-line no-console
    console.log("handleError", e);
    AlertDialog("Error", hideLoading);
  };

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskProfile);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async () => {
    setLoading(true);
    const req = {
      tab: "ut",
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: filters.shariahApproved![0] || "",
      riskCategory: riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      isConventional: filters.conventional![0],
      sort: sort,
      showBy: showBy,
      search: search,
      page: page,
    };
    // eslint-disable-next-line no-console
    console.log("productList", req);
    const productListResponse: IProductListResponse = await getProductList(req, handleError);
    if (productListResponse !== undefined) {
      const { data, error } = productListResponse;
      if (error === null && data !== null) {
        return data.result;
      }
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error?.message));
      // Alert.alert(JSON.stringify(error?.message));
    }
    return undefined;
  };

  const handleFetchUT = async () => {
    Keyboard.dismiss();
    const funds = await handleFetch();
    if (funds !== undefined) {
      setLoading(false);
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
  };

  const handleSearch = () => {
    updateUtPage("0");
    addUtSearch(inputSearch);
  };

  const handleConfirmFilter = () => {
    updateUtPage("0");
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

  // const scrollEnabled = !filterVisible || (filterVisible && showMore);

  useEffect(() => {
    // when sort, page, search, filter is updated
    if (prevPage !== undefined && prevPage !== "") {
      handleFetchUT();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page, search, filters]);

  useEffect(() => {
    // initial fetch
    if ((showBy === "recommended" && recommended.length === 0) || (showBy === "all" && all.length === 0)) {
      handleFetchUT();
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
        updateFilter={addUtFilters}
        updatePage={updateUtPage}
        updateSort={addUtSort}
      />
    </View>
  );
};

export const UnitTrust = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(UnitTrustComponent);
