import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CheckBoxGroup, CustomSpacer, NewCheckBoxDropdown, TextSpaceArea } from "../../../../../components";
import { Language } from "../../../../../constants";
import { FILTER_ISSUING_HOUSE, FILTER_RISK_CATEGORY, FILTER_TYPE } from "../../../../../data/dictionary";
import { flexRow, fs16BoldGray6, px, sh16, sh24, sh32, sw24, sw240, sw64 } from "../../../../../styles";

const { PRODUCT_FILTER } = Language.PAGE;
interface PRSFilterProps {
  filter: IProductFilter;
  productType: ProductType;
  setFilter: (value: IProductFilter) => void;
}

export const PRSFilter: FunctionComponent<PRSFilterProps> = ({ filter, productType, setFilter }: PRSFilterProps) => {
  const { conventional, shariahApproved, issuingHouse, riskCategory } = filter;

  const handleType = (value: string) => {
    const filterClone = { ...filter };

    if (value === "Conventional") {
      filterClone.conventional = conventional!.includes("Yes") ? [] : ["Yes"];
    } else if (value === "Shariah") {
      filterClone.shariahApproved = shariahApproved!.includes("Yes") ? [] : ["Yes"];
    } else {
      filterClone.conventional = [];
      filterClone.shariahApproved = [];
    }
    setFilter(filterClone);
  };

  const handleIssuingHouse = (value: string[]) => {
    setFilter({ ...filter, issuingHouse: value });
  };

  const handleRiskCategory = (value: string[]) => {
    setFilter({ ...filter, riskCategory: value });
  };

  const conventionalSelected = conventional![0] === "Yes";
  const shariahSelected = shariahApproved![0] === "Yes";
  const disabledConventionalType = conventionalSelected ? [1] : [];
  const disabledType = shariahSelected ? [0] : disabledConventionalType;
  let selectedType: string[] = [];
  if (conventionalSelected === true) {
    selectedType = [FILTER_TYPE[0].label];
  }
  if (shariahSelected === true) {
    selectedType = [FILTER_TYPE[1].label];
  }

  return (
    <View>
      <TextSpaceArea
        spaceToBottom={sh16}
        spaceToTop={sh32}
        style={{ ...fs16BoldGray6, ...px(sw24) }}
        text={PRODUCT_FILTER.LABEL_FILTER_PRS}
      />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            disabledIndex={disabledType}
            label={PRODUCT_FILTER.LABEL_TYPE}
            labels={FILTER_TYPE}
            selected={selectedType}
            setSelected={handleType}
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
        {productType === "prs" ? (
          <View>
            <NewCheckBoxDropdown
              handleChange={handleRiskCategory}
              items={FILTER_RISK_CATEGORY}
              label={PRODUCT_FILTER.LABEL_RISK}
              value={riskCategory!}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
