import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import { borderBottomGray2, colorWhite, flexRow, noBorder } from "../../../../styles";

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
      <TabGroup
        activeTab={activeTab}
        containerStyle={borderBottomGray2}
        setActiveTab={handleTabs}
        tabs={productTabs}
        unSelectedViewStyle={noBorder}
      />
    </View>
  );
};
