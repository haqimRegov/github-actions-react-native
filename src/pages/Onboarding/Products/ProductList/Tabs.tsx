import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomSpacer, TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import {
  borderBottomGray2,
  colorWhite,
  flexChild,
  flexRow,
  fs24BoldBlue1,
  fullWidth,
  justifyContentEnd,
  px,
  sh24,
  sh32,
  sh8,
  sw24,
} from "../../../../styles";

const { PRODUCT_LIST } = Language.PAGE;
export interface ProductTabsProps {
  accountType: TypeAccountChoices;
  licenseType: string[];
  productType: ProductType;
  setProductType: (tab: ProductType) => void;
}

export const ProductTabs: FunctionComponent<ProductTabsProps> = ({
  accountType,
  licenseType,
  productType,
  setProductType,
}: ProductTabsProps) => {
  const container: ViewStyle = {
    ...fullWidth,
    ...px(sw24),
    borderTopLeftRadius: sw24,
    borderTopRightRadius: sw24,
    position: "absolute",
    top: sh24,
    zIndex: 2,
  };

  const tabs: ProductType[] = [];
  const handleTabs = (index: number) => {
    setProductType(tabs[index]);
  };

  const productTabs: { text: string }[] = [];

  if (licenseType.includes("UT")) {
    productTabs.push({ text: PRODUCT_LIST.TAB_LABEL_UT }, { text: PRODUCT_LIST.TAB_LABEL_AMP });
    tabs.push("ut", "amp");
  }

  if (licenseType.includes("PRS") && accountType === "Individual") {
    productTabs.splice(1, 0, { text: PRODUCT_LIST.TAB_LABEL_PRS }, { text: PRODUCT_LIST.TAB_LABEL_PRS_DEFAULT });
    tabs.splice(1, 0, "prs", "prsDefault");
  }

  const activeTab = tabs.indexOf(productType);

  return (
    <View style={container}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh32} />
        <Text style={fs24BoldBlue1}>{PRODUCT_LIST.HEADING}</Text>
      </View>
      <CustomSpacer space={sh8} />
      <View style={{ ...flexRow, backgroundColor: colorWhite._1 }}>
        <TabGroup activeTab={activeTab} containerStyle={borderBottomGray2} setActiveTab={handleTabs} tabs={productTabs} />
        <View style={{ ...flexChild, ...justifyContentEnd }}>
          <View style={borderBottomGray2} />
        </View>
      </View>
    </View>
  );
};
