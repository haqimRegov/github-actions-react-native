import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { Language } from "../../constants";
import { px, sh24, sw24 } from "../../styles";
import { getStructuredInvestorProfile } from "../../utils";
import { SummaryColorCard } from "../Dashboard";

const { INVESTOR_PROFILE } = Language.PAGE;

declare interface DeclarationsTabProps {
  data: IInvestorAccount;
  setFile: (value?: FileBase64) => void;
}

export const DeclarationsTab: FunctionComponent<DeclarationsTabProps> = ({ data }: DeclarationsTabProps) => {
  const { declarations } = getStructuredInvestorProfile(data);
  const { crs, crsTin, fatca } = declarations;

  // const isTaxResident = crs.taxResident === OPTIONS_CRS_TAX_RESIDENCY[0].label;

  // const fatcaSummary: LabeledTitleProps[] = [{ label: INVESTOR_PROFILE.LABEL_CITIZENSHIP, title: fatca.usCitizen || "-" }];

  // const address = `${Object.values(correspondenceAddress.address!).join("")}, ${correspondenceAddress.postCode}, ${
  //   correspondenceAddress.city
  // }, ${correspondenceAddress.state}, ${correspondenceAddress.country}`;

  // if (fatca.usCitizen === "No") {
  //   fatcaSummary.splice(1, 0, { label: INVESTOR_PROFILE.LABEL_US_BORN, title: fatca.usBorn || "-" });
  //   if (fatca.usBorn === "Yes") {
  //     if (fatca.certificate !== null) {
  //       fatcaSummary.push({
  //         label: INVESTOR_PROFILE.LABEL_CERTIFICATE,
  //         title: fatca.certificate.name || "-",
  //         titleIcon: "file",
  //         spaceToIcon: sw8,
  //         titleStyle: { ...fsTransformNone, maxWidth: sw216 },
  //         // onPress: handleView,
  //       });
  //     } else {
  //       fatcaSummary.push(
  //         { label: INVESTOR_PROFILE.LABEL_CERTIFICATE, title: "-", titleStyle: fsTransformNone },
  //         {
  //           label: INVESTOR_PROFILE.LABEL_CERTIFICATE_REASON,
  //           title: fatca.reason || "-",
  //           titleStyle: fsTransformNone,
  //         },
  //       );
  //     }
  //     fatcaSummary.push({
  //       label: INVESTOR_PROFILE.LABEL_CORRESPONDENCE_DECLARATION,
  //       title: fatca.confirmAddress || "-",
  //       titleStyle: fsTransformNone,
  //     });
  //     if (fatca.confirmAddress === "Yes") {
  //       fatcaSummary.push({ label: INVESTOR_PROFILE.LABEL_MALAYSIAN_ADDRESS, title: address, titleStyle: fsTransformNone });
  //     }
  //   }
  // }

  // if (fatca.formW9 !== null) {
  //   fatcaSummary.push({ label: INVESTOR_PROFILE.LABEL_W9, title: "Yes", titleStyle: fsTransformNone });
  // }

  // if (fatca.formW8Ben !== null) {
  //   fatcaSummary.push({ label: INVESTOR_PROFILE.LABEL_W8BEN, title: "Yes", titleStyle: fsTransformNone });
  // }

  // const crsSummary: LabeledTitleProps[] = [
  //   {
  //     label: INVESTOR_PROFILE.LABEL_JURISDICTION,
  //     labelStyle: { lineHeight: sh16, width: sw200 },
  //     spaceToLabel: sh2,
  //     title: crs.taxResident || "-",
  //   },
  // ];

  const crsSection: ISummaryColorCardSection = {
    iconName: "tax-card",
    text: INVESTOR_PROFILE.LABEL_TAXPAYER,
    textWithCount: true,
    data: crsTin,
  };

  return (
    <View style={px(sw24)}>
      <SummaryColorCard headerTitle={INVESTOR_PROFILE.CARD_TITLE_FATCA} data={fatca} spaceToTop={sh24} />
      <SummaryColorCard headerTitle={INVESTOR_PROFILE.CARD_TITLE_CRS} data={crs} section={crsSection} spaceToTop={sh24} />
    </View>
  );
};
