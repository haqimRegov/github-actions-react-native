import React, { Fragment, FunctionComponent } from "react";
import { ScrollView, Text, View } from "react-native";

import { CheckBox, ColorCard, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants";
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
  sw32,
  sw8,
} from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

interface FATCATermsProps {
  acceptFatca: boolean;
  handleAcceptFatca: () => void;
}

export const FATCATerms: FunctionComponent<FATCATermsProps> = ({ acceptFatca, handleAcceptFatca }: FATCATermsProps) => {
  const checkBoxStyle = { fontSize: sh16 };
  const containerStyle = { ...border(colorBlue._2, sw1, sw8), height: sh240, ...py(sh8), backgroundColor: colorWhite._2 };
  const definitionStyle = { height: sh240, ...px(sw16) };

  return (
    <Fragment>
      <CustomSpacer space={sh24} />
      <ColorCard
        header={{ label: DECLARATIONS.FATCA_DECLARATION_TERMS }}
        content={
          <View>
            <View style={containerStyle}>
              <ScrollView style={definitionStyle}>
                <CustomSpacer space={sh8} />
                <Text style={fs12BoldGray6}>{DECLARATIONS.DECLARATION}</Text>
                {DECLARATIONS.DECLARATION_CONTENT_YES.map((item, index) => (
                  <Fragment key={index}>
                    <CustomSpacer space={index === 0 ? sh8 : sh16} />
                    <Text style={fs12RegGray6}>{item}</Text>
                  </Fragment>
                ))}
                <CustomSpacer space={sh16} />
                <Text style={fs12BoldGray6}>{DECLARATIONS.DEFINITIONS}</Text>
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
                      <CustomSpacer space={index === 0 ? sh8 : sh16} />
                      <Text style={{ ...fs12RegGray6, paddingLeft: indent }}>{item}</Text>
                    </Fragment>
                  );
                })}
                <CustomSpacer space={sh8} />
              </ScrollView>
            </View>
            <CustomSpacer space={sh16} />
            <CheckBox toggle={acceptFatca} onPress={handleAcceptFatca} label={DECLARATIONS.LABEL_ACCEPT_FATCA} labelStyle={checkBoxStyle} />
          </View>
        }
      />
    </Fragment>
  );
};
