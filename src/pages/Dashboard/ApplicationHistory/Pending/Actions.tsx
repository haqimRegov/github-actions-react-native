import React, { FunctionComponent } from "react";
import { Alert, View, ViewStyle } from "react-native";

import { IconText } from "../../../../components";
import { Language } from "../../../../constants/language";
import { DICTIONARY_ORDER_STATUS } from "../../../../data/dictionary";
import { borderBottomGray4, colorBlue, fs12BoldBlue2, px, sh48, sw16, sw232, sw8 } from "../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

export interface PendingOrderActionsProps extends ITableOptions {
  handleRoute: (text: string) => void;
  setCurrentOrder: (orderNo: string) => void;
}

export const PendingOrderActions: FunctionComponent<PendingOrderActionsProps> = ({
  data,
  handleRoute,
  onClose,
  setCurrentOrder,
}: PendingOrderActionsProps) => {
  const { orderNo, status } = data.rawData as IApplicationHistoryTable;

  const handlePrintAccountOpening = () => {
    Alert.alert("Print Accoutn Opening");
    onClose();
  };

  const handlePrintSubmissionSummary = () => {
    Alert.alert("Print Submission Summary");
    onClose();
  };

  const handleUploadDocs = () => {
    setCurrentOrder(orderNo);
    handleRoute("UploadDocuments");
    onClose();
  };

  const handleSubmitHardCopy = () => {
    setCurrentOrder(orderNo);
    handleRoute("UploadHardCopy");
    onClose();
  };

  const handleUploadPayment = () => {
    handleRoute("");
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
        name="upload"
        onPress={handleUploadPayment}
        text={DASHBOARD_HOME.LABEL_UPLOAD_PROOF}
        style={itemStyle}
      />
      <IconText color={colorBlue._2} name="upload" onPress={handleUploadDocs} text={DASHBOARD_HOME.LABEL_UPLOAD} style={itemStyle} />
      {status === DICTIONARY_ORDER_STATUS.submitted ? (
        <IconText
          color={colorBlue._2}
          name="file"
          onPress={handleSubmitHardCopy}
          text={DASHBOARD_HOME.LABEL_SUBMIT_HARD_COPY}
          style={itemStyle}
        />
      ) : null}
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
