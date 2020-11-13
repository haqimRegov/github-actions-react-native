import React, { FunctionComponent } from "react";
import { Alert, View, ViewStyle } from "react-native";

import { IconText } from "../../../../components";
import { Language } from "../../../../constants/language";
import { borderBottomGray4, colorBlue, fs12BoldBlue2, px, sh48, sw16, sw232, sw8 } from "../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

export interface ApprovedOrderActionsProps extends ITableOptions {
  handleRoute: (text: string) => void;
  setCurrentOrder: (orderNo: string) => void;
}

export const ApprovedOrderActions: FunctionComponent<ApprovedOrderActionsProps> = ({ onClose }: ApprovedOrderActionsProps) => {
  const handlePrintAccountOpening = () => {
    Alert.alert("Print Account Opening");
    onClose();
  };

  const handlePrintSubmissionSummary = () => {
    Alert.alert("Print Submission Summary");
    onClose();
  };

  const itemStyle: ViewStyle = {
    ...borderBottomGray4,
    ...fs12BoldBlue2,
    ...px(sw16),
    height: sh48,
    width: sw232,
  };

  return (
    <View style={{ borderRadius: sw8 }}>
      <IconText
        color={colorBlue._2}
        name="print"
        onPress={handlePrintAccountOpening}
        text={DASHBOARD_HOME.LABEL_PRINT_ACCOUNT_OPENING}
        style={itemStyle}
      />
      <IconText
        color={colorBlue._2}
        name="print"
        onPress={handlePrintSubmissionSummary}
        text={DASHBOARD_HOME.LABEL_PRINT_SUBMISSION_SUMMARY}
        style={itemStyle}
      />
    </View>
  );
};
