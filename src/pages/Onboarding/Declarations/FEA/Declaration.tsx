import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CheckBox, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants";
import { borderBottomGray2, fs10RegGray6, fs12BoldGray6, fs16SemiBoldGray6, px, sh16, sh32, sw24, sw648 } from "../../../../styles";

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
      <View style={borderBottomGray2} />
      <View style={{ ...px(sw24), width: sw648 }}>
        <CustomSpacer space={sh32} />
        <Text style={fs16SemiBoldGray6}>{DECLARATIONS.DECLARATION}</Text>
        <CustomSpacer space={sh16} />
        <Text style={fs12BoldGray6}>{DECLARATIONS.DECLARATION_UNDERTAKING}</Text>
        {DECLARATIONS.DECLARATION_UNDERTAKING_CONTENT.map((content, index) => (
          <Fragment key={index}>
            <CustomSpacer space={sh16} />
            <Text style={fs10RegGray6}>{content}</Text>
          </Fragment>
        ))}
        <CustomSpacer space={sh16} />
        <Text style={fs12BoldGray6}>{DECLARATIONS.DECLARATION_FOREIGN}</Text>
        {DECLARATIONS.DECLARATION_FOREIGN_CONTENT.map((content, index) => (
          <Fragment key={index}>
            <CustomSpacer space={sh16} />
            <Text style={fs10RegGray6}>{content}</Text>
          </Fragment>
        ))}
        <CustomSpacer space={sh32} />
        <CheckBox toggle={accepted} onPress={handleAccept} label={DECLARATIONS.LABEL_ACCEPT_FEA} />
      </View>
    </View>
  );
};
