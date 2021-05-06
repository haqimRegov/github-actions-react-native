import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CheckBox, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants";
import {
  borderBottomGray4,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs16SemiBoldBlack2,
  px,
  sh16,
  sh32,
  sh40,
  sw16,
  sw24,
  sw32,
  sw648,
} from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

interface FatcaTermsProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
}

export const FatcaTerms: FunctionComponent<FatcaTermsProps> = ({ accepted, setAccepted }: FatcaTermsProps) => {
  const handleAccept = () => {
    setAccepted(!accepted);
  };

  return (
    <View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray4} />
      <View style={{ ...px(sw24), width: sw648 }}>
        <CustomSpacer space={sh32} />
        <Text style={fs16SemiBoldBlack2}>{DECLARATIONS.FATCA_DECLARATION_TERMS}</Text>
        <CustomSpacer space={sh16} />
        <Text style={fs12BoldBlack2}>{DECLARATIONS.DECLARATION}</Text>
        {DECLARATIONS.DECLARATION_CONTENT_YES.map((item, index) => (
          <Fragment key={index}>
            <CustomSpacer space={sh16} />
            <Text style={fs12RegBlack2}>{item}</Text>
          </Fragment>
        ))}
        <CustomSpacer space={sh32} />
        <Text style={fs12BoldBlack2}>{DECLARATIONS.DEFINITIONS}</Text>
        {DECLARATIONS.DEFINITIONS_CONTENT.map((item, index) => {
          let indent = 0;
          if (index > 0 && index < 6) {
            indent = sw16;
          }
          if (index > 5) {
            indent = sw32;
          }
          return (
            <Fragment key={index}>
              <CustomSpacer space={sh16} />
              <Text style={{ ...fs12RegBlack2, paddingLeft: indent }}>{item}</Text>
            </Fragment>
          );
        })}
        <CustomSpacer space={sh40} />
        <CheckBox toggle={accepted} onPress={handleAccept} label={DECLARATIONS.LABEL_ACCEPT_FATCA} labelStyle={fs12BoldBlack2} />
      </View>
    </View>
  );
};
