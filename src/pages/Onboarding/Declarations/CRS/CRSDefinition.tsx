import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { CustomSpacer, PromptModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { RNInAppBrowser } from "../../../../integrations";
import { fs10RegBlack2, fs12RegBlack2, fs14BoldBlack2, fsAlignLeft, sh16, sh8, sw16, sw452 } from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

declare interface ICRSPrompt {
  setVisible: (toggle: boolean) => void;
  visible: boolean;
}

export const CRSDefinition: FunctionComponent<ICRSPrompt> = ({ setVisible, visible }: ICRSPrompt) => {
  const handleClose = () => {
    setVisible(!visible);
  };

  const handleLink = () => {
    setVisible(!visible);
    RNInAppBrowser.openLink(DECLARATIONS.CRS_LINK);
  };

  const titleStyle: TextStyle = {
    ...fs14BoldBlack2,
    ...fsAlignLeft,
    width: sw452,
    marginTop: sh8,
  };

  const labelStyle: TextStyle = {
    ...fsAlignLeft,
    width: sw452,
  };
  return (
    <PromptModal
      closable={true}
      handleClose={handleClose}
      label={DECLARATIONS.LABEL_CRS_DEFINITION}
      labelStyle={labelStyle}
      spaceToTitle={sh8}
      title={DECLARATIONS.LABEL_CRS_DEFINITION_SUBTITLE}
      titleStyle={titleStyle}
      visible={visible}>
      <View style={fsAlignLeft}>
        {DECLARATIONS.CRS_DEFINITION.map((item, index) => {
          const spaceTop = index % 2 !== 0 ? sh8 : sh16;
          const textStyle = index % 2 === 0 ? fs12RegBlack2 : fs10RegBlack2;
          const indent = index % 2 !== 0 ? sw16 : 0;
          return (
            <Fragment key={index}>
              <CustomSpacer space={spaceTop} />
              <Text style={{ ...textStyle, paddingLeft: indent }}>{item}</Text>
            </Fragment>
          );
        })}
        <TouchableWithoutFeedback onPress={handleLink}>
          <Text style={{ ...fs10RegBlack2, paddingLeft: sw16 }}>{DECLARATIONS.CRS_LINK}</Text>
        </TouchableWithoutFeedback>
      </View>
    </PromptModal>
  );
};
