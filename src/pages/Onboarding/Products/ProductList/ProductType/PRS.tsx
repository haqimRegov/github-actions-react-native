import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer } from "../../../../../components";
import { usePrevious } from "../../../../../hooks";
import { getProductList } from "../../../../../network-actions/products";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { colorWhite, flexChild, shadowBlack116, sw24 } from "../../../../../styles";
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
  addPrsSearch,
  addPrsSort,
  addSelectedFund,
  addViewFund,
  products,
  productType,
  resetSelectedFund,
  scrollEnabled,
  selectedFunds,
  setLoading,
  setScrollEnabled,
  shareSuccess,
}: PRSProps) => {
  const { filters, page, pages, recommended, search, sort, totalCount } = products.prs;
  const [filterTemp, setFilterTemp] = useState<IProductFilter>(filters);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");
  const prevPageRef = usePrevious<string>(page);
  const defaultPage = page !== "" ? parseInt(page, 10) : 0;
  const defaultPages = pages !== "" ? parseInt(pages, 10) : 0;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const req = {
      tab: "prs",
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: filters.shariahApproved![0] || "",
      riskCategory: filters.riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      isConventional: filters.conventional![0],
      page: newPage,
      sort: sort,
      showBy: "recommended",
      search: search,
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

  const handleFetchPRS = async (newPage: string) => {
    Keyboard.dismiss();
    // if (recommended.length === 0) {
    const funds = await handleFetch(newPage);
    if (funds !== undefined) {
      addPrsRecommendedFunds(funds);
    }
    // }
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
    handleFetchPRS(nextPage.toString());
  };

  const handlePrev = () => {
    const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
    handleFetchPRS(prevPage.toString());
  };

  useEffect(() => {
    // when sort, search, filter is updated
    if (prevPageRef !== undefined && prevPageRef !== "") {
      handleFetchPRS(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters]);

  useEffect(() => {
    // initial fetch
    if (recommended.length === 0) {
      handleFetchPRS("0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleResetSelected={resetSelectedFund}
        handleSelectProduct={handleSelectProduct}
        list={recommended}
        page={defaultPage}
        pages={defaultPages}
        productType={productType}
        selectedFunds={selectedFunds}
        setViewFund={addViewFund}
        shareSuccess={shareSuccess}
        sort={sort}
        totalCount={totalCount}
        updateFilter={addPrsFilters}
        updateSort={addPrsSort}
      />
    </View>
  );
};

export const PRS = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(PRSComponent);
