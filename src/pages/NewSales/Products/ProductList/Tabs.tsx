import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import { colorWhite, flexRow, fullWidth, noBorder, px, sh24, sw24 } from "../../../../styles";

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
    productTabs.splice(1, 0, { text: PRODUCT_LIST.TAB_LABEL_PRS_NEW }, { text: PRODUCT_LIST.TAB_LABEL_PRS_DEFAULT_NEW });
    tabs.splice(1, 0, "prs", "prsDefault");
  }

  const activeTab = tabs.indexOf(productType);

  return (
    <View style={{ ...flexRow, backgroundColor: colorWhite._1 }}>
      <TabGroup activeTab={activeTab} setActiveTab={handleTabs} tabs={productTabs} unSelectedViewStyle={noBorder} />
    </View>
  );
};
