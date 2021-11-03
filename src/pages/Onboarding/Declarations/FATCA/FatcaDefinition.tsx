import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { CustomSpacer, PromptModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { fs10RegGray6, fs14BoldGray6, fsAlignLeft, sh16, sh8, sw16, sw452 } from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

declare interface IFatcaPrompt {
  setVisible: (toggle: boolean) => void;
  visible: boolean;
}

export const FatcaDefinition: FunctionComponent<IFatcaPrompt> = ({ setVisible, visible }: IFatcaPrompt) => {
  const handleClose = () => {
    setVisible(!visible);
  };

  const titleStyle: TextStyle = {
    ...fs14BoldGray6,
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
      label={DECLARATIONS.LABEL_FATCA_DEFINITION}
      labelStyle={labelStyle}
      spaceToTitle={sh8}
      title={DECLARATIONS.LABEL_DEFINITION}
      titleStyle={titleStyle}
      visible={visible}>
      <View style={fsAlignLeft}>
        {DECLARATIONS.FATCA_DEFINITION.map((item, index) => {
          let indent = 0;
          if (index > 5) {
            indent = sw16;
          }
          return (
            <Fragment key={index}>
              <CustomSpacer space={sh16} />
              <Text style={{ ...fs10RegGray6, paddingLeft: indent }}>{item}</Text>
            </Fragment>
          );
        })}
      </View>
    </PromptModal>
  );
};
