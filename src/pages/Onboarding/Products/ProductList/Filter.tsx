import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";

import { CheckBoxGroup, CustomFlexSpacer, CustomSpacer, IconText, LinkText, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import {
  FILTER_EPF,
  FILTER_EPF_LABEL,
  FILTER_FUND_CATEGORY,
  FILTER_FUND_CURRENCY,
  FILTER_ISSUING_HOUSE,
  FILTER_PRODUCT_TYPE,
  FILTER_PRS_TYPE,
  FILTER_RISK,
  FILTER_SHARIAH,
  FILTER_SHARIAH_LABEL,
  FILTER_UT_TYPE,
} from "../../../../data/dictionary";
import { productsInitialState } from "../../../../store";
import {
  borderBottomBlack21,
  borderLeftGray4,
  centerHV,
  centerVertical,
  flexRow,
  fs12RegBlue1,
  fs16BoldBlack1,
  px,
  py,
  sh16,
  sh24,
  sh32,
  sh8,
  sw16,
  sw24,
  sw240,
  sw72,
} from "../../../../styles";

const { PRODUCT_FILTER } = Language.PAGE;
interface ProductFilterProps {
  filter: IProductFilter;
  setFilter: (value: IProductFilter) => void;
  setShowMore: (value: boolean) => void;
  showMore: boolean;
}

export const ProductFilter: FunctionComponent<ProductFilterProps> = ({ filter, setFilter, setShowMore, showMore }: ProductFilterProps) => {
  const { fundType, utType, epfApproved, fundCurrency, prsType, fundCategory, riskCategory, shariahApproved, issuingHouse } = filter;
  const epfNo = epfApproved[0] === FILTER_EPF[1] ? ["No"] : [];
  const epfApprovedLabel = epfApproved[0] === FILTER_EPF[0] ? ["Yes"] : epfNo;
  const shariahNo = shariahApproved[0] === FILTER_SHARIAH[1] ? ["No"] : [];
  const shariahApprovedLabel = shariahApproved[0] === FILTER_SHARIAH[0] ? ["Yes"] : shariahNo;

  const disabledFundType = [fundType[0] === FILTER_PRODUCT_TYPE[0] ? 1 : -1, fundType[0] === FILTER_PRODUCT_TYPE[1] ? 0 : -1];
  const disabledUtType = [utType[0] === FILTER_UT_TYPE[0] ? 1 : -1, utType[0] === FILTER_UT_TYPE[1] ? 0 : -1];
  const disabledEpfApproved = [epfApproved[0] === FILTER_EPF[0] ? 1 : -1, epfApproved[0] === FILTER_EPF[1] ? 0 : -1];
  const disabledPrsType = [prsType[0] === FILTER_PRS_TYPE[0] ? 1 : -1, prsType[0] === FILTER_PRS_TYPE[1] ? 0 : -1];
  const shariahApprovedOnly = shariahApproved[0] === FILTER_SHARIAH[1] ? 0 : -1;
  const disabledShariah = [shariahApproved[0] === FILTER_SHARIAH[0] ? 1 : -1, prsType[0] === FILTER_PRS_TYPE[0] ? 1 : shariahApprovedOnly];

  const handleFundType = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...filterClone.fundType];
    tmp.splice(0, tmp.includes(value) ? 1 : 0, tmp.includes(value) ? "" : value);
    filterClone.fundType = tmp;
    setFilter(filterClone);
    if (value === FILTER_PRODUCT_TYPE[0]) {
      setFilter({ ...filterClone, prsType: [] });
    } else {
      setFilter({ ...filterClone, epfApproved: [], utType: [], fundCurrency: [] });
    }
  };

  const handleUtType = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...utType];
    tmp.splice(0, tmp.includes(value) ? 1 : 0, tmp.includes(value) ? "" : value);
    filterClone.utType = tmp;
    setFilter(filterClone);
  };

  const handlePrsType = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...prsType];
    tmp.splice(0, tmp.includes(value) ? 1 : 0, tmp.includes(value) ? "" : value);
    filterClone.prsType = tmp;
    setFilter(filterClone);
    if (value === FILTER_PRS_TYPE[0] && shariahApproved[0] === FILTER_SHARIAH[1]) {
      setFilter({ ...filterClone, shariahApproved: [] });
    }
  };

  const handleEpf = (value: string) => {
    const actualValue = value === FILTER_EPF_LABEL[0] ? FILTER_EPF[0] : FILTER_EPF[1];
    const filterClone = { ...filter };
    const tmp = [...epfApproved];
    tmp.splice(0, tmp.includes(actualValue) ? 1 : 0, tmp.includes(actualValue) ? "" : actualValue);
    filterClone.epfApproved = tmp;
    setFilter(filterClone);
  };

  const handleCurrency = (value: string) => {
    const filterClone = { ...filter };
    const index = fundCurrency.indexOf(value);
    const tmp = [...fundCurrency];
    tmp.splice(index, index === -1 ? 0 : 1, index === -1 ? value : "");
    filterClone.fundCurrency = tmp;
    setFilter(filterClone);
  };

  const handleFundCategory = (value: string) => {
    const filterClone = { ...filter };
    const index = fundCategory.indexOf(value);
    const tmp = [...fundCategory];
    tmp.splice(index, index === -1 ? 0 : 1, index === -1 ? value : "");
    filterClone.fundCategory = tmp;
    setFilter(filterClone);
  };

  const handleRiskCategory = (value: string) => {
    const filterClone = { ...filter };
    const index = riskCategory.indexOf(value);
    const tmp = [...riskCategory];
    tmp.splice(index, index === -1 ? 0 : 1, index === -1 ? value : "");
    filterClone.riskCategory = tmp;
    setFilter(filterClone);
  };

  const handleShariah = (value: string) => {
    const actualValue = value === FILTER_SHARIAH_LABEL[0] ? FILTER_SHARIAH[0] : FILTER_SHARIAH[1];
    const filterClone = { ...filter };
    const tmp = [...shariahApproved];
    tmp.splice(0, tmp.includes(actualValue) ? 1 : 0, tmp.includes(actualValue) ? "" : actualValue);
    filterClone.shariahApproved = tmp;
    setFilter(filterClone);
  };

  const handleIssuingHouse = (value: string) => {
    const filterClone = { ...filter };
    const index = issuingHouse.indexOf(value);
    const tmp = [...issuingHouse];
    tmp.splice(index, index === -1 ? 0 : 1, index === -1 ? value : "");
    filterClone.issuingHouse = tmp;
    setFilter(filterClone);
  };

  const handleResetFilter = () => {
    setFilter(productsInitialState.filters);
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <View>
      <View style={{ ...px(sw24), ...py(sh24) }}>
        <View style={{ ...centerVertical, ...flexRow }}>
          <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh8} style={fs16BoldBlack1} text={PRODUCT_FILTER.LABEL_FILTER_PRODUCTS} />
          <CustomFlexSpacer />
          <LinkText onPress={handleResetFilter} text={PRODUCT_FILTER.LABEL_RESET} />
        </View>
        <CheckBoxGroup
          checkBoxStyle={{ width: sw240 }}
          direction="row"
          disabledIndex={disabledFundType}
          labels={FILTER_PRODUCT_TYPE}
          selected={fundType}
          setSelected={handleFundType}
          space={0}
        />
      </View>
      <View style={borderBottomBlack21} />
      <View style={{ ...flexRow, ...px(sw24), ...py(sh24) }}>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            disabled={fundType[0] === FILTER_PRODUCT_TYPE[1]}
            disabledIndex={disabledUtType}
            label={PRODUCT_FILTER.LABEL_UT_TYPE}
            labels={FILTER_UT_TYPE}
            selected={utType}
            setSelected={handleUtType}
          />
          <CustomSpacer space={sh16} />
          <CheckBoxGroup
            disabledIndex={disabledEpfApproved}
            disabled={fundType[0] === FILTER_PRODUCT_TYPE[1]}
            label={PRODUCT_FILTER.LABEL_EPF}
            labels={FILTER_EPF_LABEL}
            selected={epfApprovedLabel}
            setSelected={handleEpf}
          />
        </View>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            checkBoxStyle={{ marginBottom: sh16, width: sw72 }}
            direction="row"
            disabled={fundType[0] === FILTER_PRODUCT_TYPE[1]}
            labels={FILTER_FUND_CURRENCY}
            label={PRODUCT_FILTER.LABEL_FUND}
            selected={fundCurrency}
            setSelected={handleCurrency}
          />
        </View>
        <View style={borderLeftGray4} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        <CheckBoxGroup
          disabled={fundType[0] === FILTER_PRODUCT_TYPE[0]}
          disabledIndex={disabledPrsType}
          label={PRODUCT_FILTER.LABEL_PRS}
          labels={FILTER_PRS_TYPE}
          selected={prsType}
          setSelected={handlePrsType}
        />
      </View>
      <View style={borderBottomBlack21} />
      {showMore ? null : (
        <Fragment>
          <CustomSpacer space={sh16} />
          <IconText
            iconSize={sh24}
            iconPosition="right"
            name="caret-down"
            onPress={handleShowMore}
            style={centerHV}
            text={PRODUCT_FILTER.LABEL_SHOW}
            textStyle={fs12RegBlue1}
          />
        </Fragment>
      )}
      <Collapsible collapsed={!showMore}>
        <CustomSpacer space={sh32} />
        <TextSpaceArea style={{ ...fs16BoldBlack1, ...px(sw24) }} text={PRODUCT_FILTER.LABEL_FILTER_CATEGORY} />
        <CustomSpacer space={sh16} />
        <View style={{ ...flexRow, ...px(sw24) }}>
          <View style={{ width: sw240 }}>
            <TextSpaceArea spaceToBottom={sh8} text={PRODUCT_FILTER.LABEL_FUND_TYPE} />
            <CheckBoxGroup labels={FILTER_FUND_CATEGORY} selected={fundCategory} setSelected={handleFundCategory} />
          </View>
          <View style={{ width: sw240 }}>
            <CheckBoxGroup
              label={PRODUCT_FILTER.LABEL_RISK}
              labels={FILTER_RISK}
              selected={riskCategory}
              setSelected={handleRiskCategory}
            />
          </View>
          <View style={{ width: sw240 }}>
            <TextSpaceArea spaceToBottom={sh8} text={PRODUCT_FILTER.LABEL_SHARIAH} />
            <CheckBoxGroup
              disabledIndex={disabledShariah}
              labels={FILTER_SHARIAH_LABEL}
              selected={shariahApprovedLabel}
              setSelected={handleShariah}
            />
          </View>
        </View>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <CheckBoxGroup
            checkBoxStyle={{ marginBottom: sh16, width: sw240 }}
            direction="row"
            label={PRODUCT_FILTER.LABEL_ISSUING}
            labels={FILTER_ISSUING_HOUSE}
            selected={issuingHouse}
            setSelected={handleIssuingHouse}
          />
        </View>
      </Collapsible>
    </View>
  );
};
