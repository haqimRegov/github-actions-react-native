import React from "react";
import { Text, TextStyle, View } from "react-native";

import { Language } from "../../constants";
import { flexRow, fs12BoldWhite1, fs12RegWhite1, px, py, sh16, sh20, sw16, sw296, sw4 } from "../../styles";
import { CustomTooltip } from "../Tooltip";

const { PASSWORD } = Language.PAGE;

export const PasswordInfo = () => {
  const lineHeight: TextStyle = { lineHeight: sh20 };
  const passwordRuleStyle: TextStyle = { ...fs12BoldWhite1, ...lineHeight, ...px(sw4) };
  const passwordLabeleStyle: TextStyle = { ...fs12RegWhite1, ...lineHeight };

  const infoContent = (
    <View style={{ ...px(sw16), ...py(sh16) }}>
      <Text style={fs12BoldWhite1}>{PASSWORD.LABEL_INFO}</Text>
      <View style={flexRow}>
        <Text style={passwordLabeleStyle}>{PASSWORD.LABEL_MINIMUM}</Text>
        <Text style={passwordRuleStyle}>{PASSWORD.LABEL_CHARACTER}</Text>
      </View>
      <View style={flexRow}>
        <Text style={passwordLabeleStyle}>{PASSWORD.LABEL_INCLUDE}</Text>
        <Text style={passwordRuleStyle}>{PASSWORD.LABEL_UPPERCASE}</Text>
      </View>
      <View style={flexRow}>
        <Text style={passwordLabeleStyle}>{PASSWORD.LABEL_INCLUDE}</Text>
        <Text style={passwordRuleStyle}>{PASSWORD.LABEL_LOWERCASE}</Text>
      </View>
      <View style={flexRow}>
        <Text style={passwordLabeleStyle}>{PASSWORD.LABEL_INCLUDE}</Text>
        <Text style={passwordRuleStyle}>{PASSWORD.LABEL_NUMBER}</Text>
      </View>
      <View style={flexRow}>
        <Text style={passwordLabeleStyle}>{PASSWORD.LABEL_INCLUDE}</Text>
        <Text style={passwordRuleStyle}>{PASSWORD.LABEL_SPECIAL}</Text>
      </View>
    </View>
  );
  return <CustomTooltip content={infoContent} contentStyle={{ width: sw296 }} />;
};
