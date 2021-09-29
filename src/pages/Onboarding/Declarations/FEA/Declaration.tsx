import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CheckBox, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants";
import {
  borderBottomGray4,
  fs11RegBlack2,
  fs12BoldBlack2,
  fs16SemiBoldBlack2,
  px,
  sh16,
  sh20,
  sh32,
  sw24,
  sw648,
} from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

interface FeaTermsProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
}

export const FeaTerms: FunctionComponent<FeaTermsProps> = ({ accepted, setAccepted }: FeaTermsProps) => {
  const handleAccept = () => {
    setAccepted(!accepted);
  };

  return (
    <View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray4} />
      <View style={{ ...px(sw24), width: sw648 }}>
        <CustomSpacer space={sh32} />
        <Text style={fs16SemiBoldBlack2}>{DECLARATIONS.DECLARATION}</Text>
        <CustomSpacer space={sh16} />
        <Text style={fs12BoldBlack2}>{DECLARATIONS.DECLARATION_UNDERTAKING}</Text>
        {DECLARATIONS.DECLARATION_UNDERTAKING_CONTENT.map((content, index) => (
          <Fragment key={index}>
            <CustomSpacer space={sh16} />
            <Text style={fs11RegBlack2}>{content}</Text>
          </Fragment>
        ))}
        <CustomSpacer space={sh16} />
        <Text style={{ ...fs12BoldBlack2, lineHeight: sh20 }}>{DECLARATIONS.DECLARATION_FOREIGN}</Text>
        {DECLARATIONS.DECLARATION_FOREIGN_CONTENT.map((content, index) => (
          <Fragment key={index}>
            <CustomSpacer space={sh16} />
            <Text style={fs11RegBlack2}>{content}</Text>
          </Fragment>
        ))}
        <CustomSpacer space={sh32} />
        <CheckBox toggle={accepted} onPress={handleAccept} label={DECLARATIONS.LABEL_ACCEPT_FEA} />
      </View>
    </View>
  );
};
