import React, { Fragment, FunctionComponent } from "react";
import { ScrollView, Text, View } from "react-native";

import { CheckBox, ColorCard, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_LINK_TAX_RESIDENT } from "../../../data/dictionary";
import {
  border,
  colorBlue,
  colorWhite,
  fs12BoldGray6,
  fs12RegGray6,
  px,
  py,
  sh16,
  sh24,
  sh240,
  sh8,
  sw1,
  sw16,
  sw24,
  sw8,
} from "../../../styles";

const { DECLARATIONS } = Language.PAGE;

interface CRSTermsProps {
  acceptCrs: boolean;
  handleAcceptCrs: () => void;
  taxResident?: string;
  tin?: ITinMultiple[];
}

export const CRSTerms: FunctionComponent<CRSTermsProps> = ({ acceptCrs, handleAcceptCrs, taxResident }: CRSTermsProps) => {
  const checkBoxStyle = { fontSize: sh16 };
  const containerStyle = { ...border(colorBlue._2, sw1, sw8), height: sh240, ...py(sh8), backgroundColor: colorWhite._2 };
  const definitionStyle = { height: sh240, ...px(sw16) };

  // const tinReason =
  //   tin !== undefined
  //     ? tin
  //         .map((multiTin, index) => {
  //           const reason = multiTin.reason !== -1 ? OPTIONS_CRS_TIN_REASONS[multiTin.reason!].label : OPTIONS_CRS_TIN_REASONS[0].label;
  //           const principalNoTinReason = multiTin.reason === 1 ? OPTION_CRS_NO_TIN_REQUIRED : reason;
  //           const principalTinReason = multiTin.reason === 2 ? multiTin.explanation! : principalNoTinReason;
  //           return index > 0 ? `; ${principalTinReason}` : principalTinReason; // undefined if taxResident === 0, required if noTin === true
  //         })
  //         .join("")
  //     : undefined;

  return (
    <Fragment>
      <CustomSpacer space={sh24} />
      <ColorCard
        header={{ label: DECLARATIONS.CRS_DECLARATION_TERMS }}
        content={
          <View>
            <View style={containerStyle}>
              <ScrollView style={definitionStyle}>
                <CustomSpacer space={sh8} />
                <Text style={fs12BoldGray6}>{DECLARATIONS.DECLARATION}</Text>
                {taxResident && (
                  <Fragment>
                    <CustomSpacer space={sh8} />
                    <Text style={fs12RegGray6}>{`${DECLARATIONS.TERMS_DYNAMIC_RESIDENT} ${taxResident}.`}</Text>
                  </Fragment>
                )}
                {/* {tinReason && (
                  <Fragment>
                    <CustomSpacer space={sh8} />
                    <Text style={fs12RegGray6}>{`${DECLARATIONS.TERMS_DYNAMIC_TIN} reasons provided.`}</Text>
                  </Fragment>
                )} */}
                {DECLARATIONS.DECLARATION_CONTENT_MALAYSIA.map((item, index) => (
                  <View key={index}>
                    <CustomSpacer space={index === 0 ? sh8 : sh16} />
                    <Text style={fs12RegGray6}>{item}</Text>
                  </View>
                ))}
                <CustomSpacer space={sh16} />
                <Text style={fs12BoldGray6}>{DECLARATIONS.DEFINITIONS_SELECTED}</Text>
                <CustomSpacer space={sh16} />
                <Text style={fs12RegGray6}>{DECLARATIONS.DEFINITIONS_SELECTED_HEADING_A}</Text>
                <CustomSpacer space={sh8} />
                <Text style={{ ...fs12RegGray6, paddingLeft: sw24 }}>{DECLARATIONS.DEFINITIONS_SELECTED_TEXT_A}</Text>
                <CustomSpacer space={sh16} />
                <Text style={fs12RegGray6}>{DECLARATIONS.DEFINITIONS_SELECTED_HEADING_B}</Text>
                <CustomSpacer space={sh8} />
                <Text style={{ ...fs12RegGray6, paddingLeft: sw24 }}>
                  {`${DECLARATIONS.DEFINITIONS_SELECTED_TEXT_B}${DICTIONARY_LINK_TAX_RESIDENT}`}
                </Text>
                <CustomSpacer space={sh8} />
              </ScrollView>
            </View>
            <CustomSpacer space={sh16} />
            <CheckBox toggle={acceptCrs} onPress={handleAcceptCrs} label={DECLARATIONS.LABEL_ACCEPT_CRS_NEW} labelStyle={checkBoxStyle} />
          </View>
        }
      />
    </Fragment>
  );
};
