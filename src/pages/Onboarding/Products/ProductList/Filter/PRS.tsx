import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CheckBoxDropdown, CheckBoxGroup, CustomSpacer, TextSpaceArea } from "../../../../../components";
import { Language } from "../../../../../constants";
import { FILTER_CONVENTIONAL, FILTER_ISSUING_HOUSE, FILTER_SHARIAH_LABEL } from "../../../../../data/dictionary";
import { centerVertical, flexRow, fs16BoldBlack1, px, sh32, sh8, sw24, sw240, sw64 } from "../../../../../styles";

const { PRODUCT_FILTER } = Language.PAGE;
interface PRSFilterProps {
  filter: IProductFilter;
  setFilter: (value: IProductFilter) => void;
}

export const PRSFilter: FunctionComponent<PRSFilterProps> = ({ filter, setFilter }: PRSFilterProps) => {
  const { conventional, shariahApproved, issuingHouse } = filter;

  const conventionalOnly = conventional![0] === "No" ? 0 : -1;
  const shariahApprovedOnly = shariahApproved![0] === "No" ? 0 : -1;
  const disabledShariah = [shariahApproved![0] === "Yes" ? 1 : -1, shariahApprovedOnly];
  const disabledConventional = [conventional![0] === "No" ? 1 : -1, conventionalOnly];

  const handleConventional = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...conventional!];
    tmp.splice(0, tmp.includes(value) ? 1 : 0, tmp.includes(value) ? "" : value);
    filterClone.conventional = tmp;
    setFilter(filterClone);
  };

  const handleShariah = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...shariahApproved!];
    tmp.splice(0, tmp.includes(value) ? 1 : 0, tmp.includes(value) ? "" : value);
    filterClone.shariahApproved = tmp;
    setFilter(filterClone);
  };

  const handleIssuingHouse = (value: string[]) => {
    setFilter({ ...filter, issuingHouse: value });
  };

  return (
    <View>
      <View style={{ ...px(sw24) }}>
        <View style={{ ...centerVertical, ...flexRow }}>
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} style={fs16BoldBlack1} text={PRODUCT_FILTER.LABEL_FILTER_PRS} />
        </View>
      </View>
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            disabledIndex={disabledConventional}
            disabled={conventional![0] === FILTER_CONVENTIONAL![1]}
            label={PRODUCT_FILTER.LABEL_CONVENTIONAL}
            labels={FILTER_CONVENTIONAL}
            selected={conventional!}
            setSelected={handleConventional}
          />
        </View>
        <View style={{ width: sw240 }}>
          <TextSpaceArea spaceToBottom={sh8} text={PRODUCT_FILTER.LABEL_SHARIAH} />
          <CheckBoxGroup
            disabledIndex={disabledShariah}
            labels={FILTER_SHARIAH_LABEL}
            selected={shariahApproved!}
            setSelected={handleShariah}
          />
        </View>
      </View>
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh8} text={PRODUCT_FILTER.LABEL_ISSUING} />
        <CheckBoxDropdown handleChange={handleIssuingHouse} items={FILTER_ISSUING_HOUSE} value={issuingHouse!} />
      </View>
      <CustomSpacer space={sw64} />
    </View>
  );
};
