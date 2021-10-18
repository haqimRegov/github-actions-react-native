import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CheckBox, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_LINK_TAX_RESIDENT } from "../../../../data/dictionary";
import {
  borderBottomGray4,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs16SemiBoldBlack2,
  px,
  sh16,
  sh32,
  sh40,
  sh8,
  sw24,
  sw648,
} from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

interface CrsTermsProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
}

export const CrsTerms: FunctionComponent<CrsTermsProps> = ({ accepted, setAccepted }: CrsTermsProps) => {
  const handleAccept = () => {
    setAccepted(!accepted);
  };

  // const handleTaxResidentLink = () => {
  //   RNInAppBrowser.openLink(DICTIONARY_LINK_TAX_RESIDENT);
  // };

  return (
    <View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray4} />
      <View style={{ ...px(sw24), width: sw648 }}>
        <CustomSpacer space={sh32} />
        <Text style={fs16SemiBoldBlack2}>{DECLARATIONS.CRS_DECLARATION_TERMS}</Text>
        <CustomSpacer space={sh16} />
        <Text style={fs12BoldBlack2}>{DECLARATIONS.DECLARATION}</Text>
        {DECLARATIONS.DECLARATION_CONTENT_MALAYSIA.map((item, index) => (
          <View key={index}>
            {index === 0 ? null : <CustomSpacer space={sh16} />}
            <Text style={fs12RegBlack2}>{item}</Text>
          </View>
        ))}
        <CustomSpacer space={sh32} />
        <Text style={fs12BoldBlack2}>{DECLARATIONS.DEFINITIONS_SELECTED}</Text>
        <CustomSpacer space={sh16} />
        <Text style={fs12RegBlack2}>{DECLARATIONS.DEFINITIONS_SELECTED_HEADING_A}</Text>
        <CustomSpacer space={sh8} />
        <Text style={{ ...fs12RegBlack2, paddingLeft: sw24 }}>{DECLARATIONS.DEFINITIONS_SELECTED_TEXT_A}</Text>
        <CustomSpacer space={sh16} />
        <Text style={fs12RegBlack2}>{DECLARATIONS.DEFINITIONS_SELECTED_HEADING_B}</Text>
        <CustomSpacer space={sh8} />
        <Text style={{ ...fs12RegBlack2, paddingLeft: sw24 }}>
          {`${DECLARATIONS.DEFINITIONS_SELECTED_TEXT_B}${DICTIONARY_LINK_TAX_RESIDENT}`}
        </Text>
        <CustomSpacer space={sh40} />
        <CheckBox toggle={accepted} onPress={handleAccept} label={DECLARATIONS.LABEL_ACCEPT_CRS} />
      </View>
    </View>
  );
};
