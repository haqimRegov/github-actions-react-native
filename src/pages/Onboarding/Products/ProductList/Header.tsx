import React, { Fragment, FunctionComponent, useState } from "react";
import { TextInput, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { ActionButtons, CustomSpacer, IconButton, IconInput, LinkText, Tag } from "../../../../components";
import { Language } from "../../../../constants";
import {
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  flexWrap,
  fs12BoldBlue2,
  fs12SemiBoldBlue38,
  fs16SemiBoldBlack2,
  fullWidth,
  px,
  sh120,
  sh16,
  sh24,
  sh32,
  sh48,
  shadowBlack5,
  sw1,
  sw100,
  sw218,
  sw24,
  sw30,
  sw32,
  sw40,
  sw696,
  sw8,
} from "../../../../styles";
import { ProductFilter, ProductFilterProps } from "./Filter";

const { PRODUCT_LIST, PRODUCT_FILTER } = Language.PAGE;
interface ProductHeaderProps extends ProductFilterProps {
  filterVisible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleSearch: () => void;
  handleShowFilter: () => void;
  handleUpdateFilter: (value: IProductFilter) => void;
  inputSearch: string;
  setInputSearch: (value: string) => void;
}

export const ProductHeader: FunctionComponent<ProductHeaderProps> = ({
  handleShowFilter,
  filterVisible,
  handleCancel,
  handleConfirm,
  handleUpdateFilter,
  handleSearch,
  inputSearch,
  setInputSearch,
  ...filterProps
}: ProductHeaderProps) => {
  const { filter } = filterProps;
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);
  const [showMorePills, setShowMorePills] = useState<boolean>(false);
  // const [showMore, setShowMore] = useState<{ active: boolean; number: number }>({ active: false, number: 0 });
  // const [filter, setFilter] = useState<IProductFilter>();
  // const [filterLabelShow, setFilterLabelShow] = useState<boolean>(true);

  const filterKeys = Object.keys(filter);

  const generatePillLabel = (filterKey: string, value: string) => {
    switch (filterKey as ProductFilterType) {
      case "epfApproved":
        return `${PRODUCT_FILTER.LABEL_EPF}: ${value}`;
      case "shariahApproved":
        return `${PRODUCT_FILTER.LABEL_TYPE}: ${value === "Yes" ? "Shariah" : "Conventional"}`;
      case "fundType":
        return `${PRODUCT_FILTER.LABEL_FUND_TYPE}: ${value}`;
      case "fundCurrency":
        return `${PRODUCT_FILTER.LABEL_FUND_CURRENCY}: ${value}`;
      case "issuingHouse":
        return `${PRODUCT_FILTER.LABEL_ISSUING}: ${value}`;
      case "riskCategory":
        return `${PRODUCT_FILTER.LABEL_RISK}: ${value}`;
      case "conventional":
        return `${PRODUCT_FILTER.LABEL_TYPE}: ${value === "Yes" ? "Conventional" : "Shariah"}`;

      default:
        return "";
    }
  };

  const newPills = filterKeys.map((key) => {
    const filtered = filter[key].filter((value) => value !== "");
    const pillValues = filtered.map((value) => generatePillLabel(key, value));
    return { key: key, values: filtered, pillValues: pillValues };
  });

  const handlePressFilter = () => {
    if (searchInputRef !== null) {
      searchInputRef.blur();
    }
    handleShowFilter();
    setShowMorePills(false);
  };

  // const handleFilterLabel = () => {
  //   setFilterLabelShow(!filterLabelShow);
  // };

  // const handleShowAllFilter = () => {
  //   setShowMorePills(!showMorePills);
  // };

  const handleCancelFilter = () => {
    handleCancel();
    handleShowFilter();
  };

  // const handlePills = async () => {
  //   const count = await CalculateCount(filterTags, 688, 32);
  //   setShowMore({ ...showMore, number: count });
  // };

  const handleApplyFilter = () => {
    handleConfirm();
    handleShowFilter();
    // handlePills();
  };

  // const overlay = filterVisible ? fullHeight : {};
  // const overflow: ViewStyle = showMorePills ? {} : { height: sh48, overflow: "hidden" };

  const handleShowAllFilter = () => {
    setShowMorePills(!showMorePills);
  };
  const pillList = newPills.map(({ pillValues }) => pillValues).flat();

  const handleRemoveFilter = (pill: string) => {
    const findPill = newPills.findIndex(({ pillValues }) => pillValues.includes(pill));
    const { key, pillValues, values } = newPills[findPill];
    const filterClone: IProductFilter = { ...filter };
    const updatedFilter = filterClone[key].filter((filterValue: string) => filterValue !== values[pillValues.indexOf(pill)]);
    filterClone[key] = updatedFilter;
    handleUpdateFilter(filterClone);
  };

  // const overlay = filterVisible ? fullHeight : {};
  const overflow: ViewStyle = showMorePills ? {} : { height: sh48, overflow: "hidden" };

  const container: ViewStyle = {
    ...shadowBlack5,
    ...fullWidth,
    backgroundColor: colorWhite._1,
    marginBottom: sh24,
    borderBottomLeftRadius: sw24,
    borderBottomRightRadius: sw24,
    position: "absolute",
    top: sh120,
    zIndex: 1,
  };

  const filterBGColor = filterVisible ? colorBlue._2 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._2 : colorGray._3;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._2;

  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw40, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const inputStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.39 };

  const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  // useEffect(() => {
  //   // setFilter(selectedFilter);
  //   const filterTimer = setTimeout(() => {
  //     setFilterLabelShow(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(filterTimer);
  //   };
  // }, []);

  // const handleWidth = async (event: LayoutChangeEvent) => {
  //   const { height, width } = event.nativeEvent.layout;
  //   if (showMore.active === false) {
  //     if (width >= 826) {
  //       setShowMore({ ...showMore, active: true });
  //     }
  //   } else if ((height < sh24 && showMore.active === true) || width < 826) {
  //     setShowMore({ ...showMore, active: false, number: 0 });
  //   }
  // };
  // const showMoreText = `+${showMore.number} More`;
  // console.log("showMore", showMore);
  // useEffect(() => {
  //   handlePills();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <View style={container}>
      <CustomSpacer space={sh32} />
      <View style={{ ...centerVertical, ...flexRow }}>
        <CustomSpacer isHorizontal={true} space={sw24} />
        <IconInput
          autoCorrect={false}
          icon="search"
          iconInputRef={searchInputRef}
          onChangeText={setInputSearch}
          onSubmitEditing={handleSearch}
          placeholder={PRODUCT_LIST.INPUT_SEARCH_PLACEHOLDER}
          placeholderTextColor={colorBlack._2_5}
          returnKeyType="search"
          setIconInputRef={setSearchInputRef}
          style={inputStyle}
          value={inputSearch}
          viewStyle={{ borderRadius: sw100, height: sh48 }}
        />
        {/* <CustomTooltip
          color={colorWhite._1}
          topAdjustment={32}
          contentStyle={{ ...px(0), ...py(0), height: sh28, width: sw84, ...centerHV }}
          showChild={false}
          overlayColor={colorTransparent}
          tooltipStyle={shadow}
          isVisible={false}
          content={<Text style={{ ...fs12RegBlue2, letterSpacing: -sw033 }}>Filter</Text>}
          placement="top"
          onClose={handleFilterLabel}> */}
        <View style={{ ...centerVertical, ...flexRow }}>
          <CustomSpacer isHorizontal={true} space={sw32} />
          <TouchableWithoutFeedback onPress={handlePressFilter}>
            <IconButton color={filterColor} onPress={handlePressFilter} name="filter" size={sh24} style={filterContainer} />
          </TouchableWithoutFeedback>
          <CustomSpacer isHorizontal={true} space={sw40} />
        </View>
        {/* </CustomTooltip> */}
        {/* <CustomSpacer isHorizontal={true} space={sw2} /> */}
      </View>
      {filterVisible || pillList.length === 0 ? null : (
        <View style={px(sw24)}>
          <View style={flexRow}>
            <View style={{ ...flexRow, ...flexWrap, ...overflow, width: sw696 }}>
              {pillList.map((pill: string, index: number) => {
                const handlePress = () => {
                  handleRemoveFilter(pill);
                };
                return (
                  <Fragment key={index}>
                    {index === 0 ? null : <CustomSpacer isHorizontal={true} space={sw8} />}
                    <Tag
                      color="secondary"
                      icon="close"
                      onPress={handlePress}
                      text={pill}
                      textStyle={fs12SemiBoldBlue38}
                      style={{ marginRight: undefined, marginTop: sh16 }}
                    />
                  </Fragment>
                );
              })}
            </View>
            <CustomSpacer isHorizontal={true} space={sw30} />
            <View style={{ ...centerHorizontal, height: sh48 }}>
              <LinkText onPress={handleShowAllFilter} text={showLabel} style={{ ...fs12BoldBlue2, height: sh24, lineHeight: sh24 }} />
            </View>
          </View>
        </View>
      )}
      <Collapsible collapsed={!filterVisible} duration={300}>
        <ProductFilter {...filterProps} />
        <CustomSpacer space={sh32} />
        <ActionButtons
          buttonContainerStyle={centerHorizontal}
          cancelButtonStyle={{ width: sw218 }}
          continueButtonStyle={{ width: sw218 }}
          labelContinue={PRODUCT_FILTER.BUTTON_APPLY}
          handleCancel={handleCancelFilter}
          handleContinue={handleApplyFilter}
        />
        <CustomSpacer space={sh32} />
      </Collapsible>
      <CustomSpacer space={sh24} />
    </View>
  );
};
