import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, SelectionBanner } from "../../components";
import { Language } from "../../constants";
import { flexCol, fs16BoldGray6, fs16RegGray6, rowCenterVertical, sw4 } from "../../styles";

const { INVESTMENT } = Language.PAGE;

interface ProductsBannerProps {
  cancelOnPress: () => void;
  continueDisabled: boolean;
  selectedFunds: IProduct[];
  label?: string;
  labelCancel?: string;
  labelSubmit: string;
  submitOnPress: () => void;
}

export const ProductsBanner: FunctionComponent<ProductsBannerProps> = ({
  cancelOnPress,
  continueDisabled,
  selectedFunds,
  label,
  labelCancel,
  labelSubmit,
  submitOnPress,
}: ProductsBannerProps) => {
  let utCount = 0;
  let prsCount = 0;
  let ampCount = 0;
  selectedFunds.forEach((fund: IProduct) => {
    if (fund.fundType === "UT" || fund.fundType === "UTF" || fund.fundType === "WSF") {
      utCount += 1;
    } else if (fund.fundType === "PRS") {
      prsCount += 1;
    } else if (fund.fundType === "AMP") {
      ampCount += 1;
    }
  });

  const utSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ", " : "";
  const prsSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const prsPrefix = prsCount > 0 && utCount > 0 && ampCount === 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const ampPrefix =
    (ampCount > 0 && utCount > 0 && prsCount === 0) || (ampCount > 0 && prsCount > 0 && utCount === 0) ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const utLabel = utCount > 0 ? `${utCount} ${INVESTMENT.LABEL_UT}` : "";
  const prsLabel = prsCount > 0 ? `${prsCount} ${INVESTMENT.LABEL_PRS}` : "";
  const ampLabel = ampCount > 0 ? `${ampCount} ${INVESTMENT.LABEL_AMP}` : "";

  const bannerTextPrefix = `${utLabel}${utSuffix}${prsPrefix}${prsLabel}${prsSuffix}${ampPrefix}${ampLabel}`;

  return (
    <View style={flexCol}>
      <SelectionBanner
        bottomContent={
          selectedFunds.length > 0 ? (
            <View style={rowCenterVertical}>
              <Text style={fs16BoldGray6}>{bannerTextPrefix}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <Text style={fs16RegGray6}>{INVESTMENT.LABEL_SELECTED}</Text>
            </View>
          ) : undefined
        }
        labelCancel={labelCancel !== undefined ? labelCancel : INVESTMENT.BUTTON_BACK}
        label={label !== undefined ? label : INVESTMENT.LABEL_FUND_SUMMARY}
        cancelOnPress={cancelOnPress}
        continueDisabled={continueDisabled}
        labelSubmit={labelSubmit}
        submitOnPress={submitOnPress}
      />
    </View>
  );
};
