import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CheckBoxGroup, CustomSpacer, NewCheckBoxDropdown, TextSpaceArea } from "../../../../../components";
import { Language } from "../../../../../constants";
import {
  FILTER_EPF_LABEL,
  FILTER_FUND_CURRENCY,
  FILTER_FUND_TYPE,
  FILTER_ISSUING_HOUSE,
  FILTER_PRODUCT_TYPE,
  FILTER_RISK_CATEGORY,
  FILTER_TYPE,
} from "../../../../../data/dictionary";
import { flexRow, fs16BoldGray6, px, sh16, sh24, sh32, sw24, sw240, sw64 } from "../../../../../styles";

const { PRODUCT_FILTER } = Language.PAGE;
interface UTFilterProps {
  filter: IProductFilter;
  productType: ProductType;
  setFilter: (value: IProductFilter) => void;
}

export const UTFilter: FunctionComponent<UTFilterProps> = ({ filter, setFilter }: UTFilterProps) => {
  const { fundType, epfApproved, fundCurrency, riskCategory, shariahApproved, issuingHouse } = filter;
  const disabledEpfApproved = [epfApproved![0] === "Yes" ? 1 : -1, epfApproved![0] === "No" ? 0 : -1];
  const shariahApprovedOnly = shariahApproved![0] === "No" ? 1 : -1;
  const disabledShariah = [shariahApproved![0] === "Yes" ? 0 : -1, shariahApprovedOnly];
  const conventionalSelected = shariahApproved![0] === "No" ? ["Conventional"] : [];
  const shariahSelected = shariahApproved![0] === "Yes" ? ["Shariah"] : conventionalSelected;

  const handleEpf = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...epfApproved!];
    tmp.splice(0, tmp.includes(value) ? 1 : 0, tmp.includes(value) ? "" : value);
    filterClone.epfApproved = tmp;
    setFilter(filterClone);
  };

  const handleCurrency = (value: string[]) => {
    setFilter({ ...filter, fundCurrency: value });
  };

  const handleFundType = (value: string[]) => {
    setFilter({ ...filter, fundType: value });
  };

  const handleRiskCategory = (value: string[]) => {
    setFilter({ ...filter, riskCategory: value });
  };

  const handleShariah = (value: string) => {
    const actualValue = value === "Conventional" ? "No" : "Yes";
    const filterClone = { ...filter };
    const tmp = [...shariahApproved!];
    tmp.splice(0, tmp.includes(actualValue) ? 1 : 0, tmp.includes(actualValue) ? "" : actualValue);
    filterClone.shariahApproved = tmp;
    setFilter(filterClone);
  };

  const handleIssuingHouse = (value: string[]) => {
    setFilter({ ...filter, issuingHouse: value });
  };

  return (
    <View>
      <TextSpaceArea
        spaceToBottom={sh16}
        spaceToTop={sh32}
        style={{ ...fs16BoldGray6, ...px(sw24) }}
        text={PRODUCT_FILTER.LABEL_FILTER_UT}
      />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            disabledIndex={disabledEpfApproved}
            disabled={fundType![0] === FILTER_PRODUCT_TYPE[1]}
            label={PRODUCT_FILTER.LABEL_EPF}
            labels={FILTER_EPF_LABEL}
            selected={epfApproved!}
            setSelected={handleEpf}
          />
        </View>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            disabledIndex={disabledShariah}
            label={PRODUCT_FILTER.LABEL_TYPE}
            labels={FILTER_TYPE}
            selected={shariahSelected}
            setSelected={handleShariah}
          />
        </View>
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <NewCheckBoxDropdown
            handleChange={handleFundType}
            items={FILTER_FUND_TYPE}
            label={PRODUCT_FILTER.LABEL_FUND_TYPE}
            value={fundType!}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <View>
          <NewCheckBoxDropdown
            handleChange={handleCurrency}
            items={FILTER_FUND_CURRENCY}
            label={PRODUCT_FILTER.LABEL_FUND_CURRENCY}
            value={fundCurrency!}
          />
        </View>
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <NewCheckBoxDropdown
            handleChange={handleIssuingHouse}
            items={FILTER_ISSUING_HOUSE}
            label={PRODUCT_FILTER.LABEL_ISSUING}
            value={issuingHouse!}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <View>
          <NewCheckBoxDropdown
            handleChange={handleRiskCategory}
            items={FILTER_RISK_CATEGORY}
            label={PRODUCT_FILTER.LABEL_RISK}
            value={riskCategory!}
          />
        </View>
      </View>
    </View>
  );
};
