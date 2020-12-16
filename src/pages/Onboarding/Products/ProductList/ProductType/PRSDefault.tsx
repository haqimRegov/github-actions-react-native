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

interface PRSDefaultProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  productType: ProductType;
  shareSuccess?: boolean;
}

const PRSDefaultComponent: FunctionComponent<PRSDefaultProps> = ({
  addPrsDefaultFilters,
  addPrsDefaultRecommendedFunds,
  addPrsDefaultSearch,
  addPrsDefaultSort,
  addSelectedFund,
  addViewFund,
  products,
  productType,
  resetSelectedFund,
  selectedFunds,
  setLoading,
  shareSuccess,
  updatePrsDefaultPage,
}: PRSDefaultProps) => {
  const { filters, page, pages, recommended, search, sort, totalCount } = products.prsDefault;
  const [filterTemp, setFilterTemp] = useState<IProductFilter>(filters);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const prevPage = usePrevious<string>(page);
  const [inputSearch, setInputSearch] = useState<string>("");
  const defaultPage = page !== "" ? parseInt(page, 10) : 0;
  const defaultPages = pages !== "" ? parseInt(pages, 10) : 0;

  const handleFetch = async () => {
    setLoading(true);
    const req = {
      tab: productType,
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: filters.shariahApproved![0] || "",
      riskCategory: filters.riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      isConventional: filters.conventional![0],
      sort: sort,
      showBy: "recommended",
      search: search,
      page: page,
    };
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

  const handleFetchPRSDefault = async () => {
    Keyboard.dismiss();
    const funds = await handleFetch();
    if (funds !== undefined) {
      addPrsDefaultRecommendedFunds(funds);
    }
  };

  const handleShowFilter = () => {
    if (filterVisible && showMore) {
      setShowMore(false);
    }
    setFilterVisible(!filterVisible);
  };

  const handleSearch = () => {
    updatePrsDefaultPage("0");
    addPrsDefaultSearch(inputSearch);
  };

  const handleConfirmFilter = () => {
    updatePrsDefaultPage("0");
    addPrsDefaultFilters(filterTemp);
    addPrsDefaultSearch(inputSearch);
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

  // const scrollEnabled = !filterVisible || (filterVisible && showMore);

  useEffect(() => {
    // when sort, page, search, filter is updated
    if (prevPage !== undefined && prevPage !== "") {
      handleFetchPRSDefault();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page, search, filters]);

  useEffect(() => {
    // initial fetch
    if (recommended.length === 0) {
      handleFetchPRSDefault();
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
        updateFilter={addPrsDefaultFilters}
        updatePage={updatePrsDefaultPage}
        updateSort={addPrsDefaultSort}
      />
    </View>
  );
};

export const PRSDefault = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(PRSDefaultComponent);
