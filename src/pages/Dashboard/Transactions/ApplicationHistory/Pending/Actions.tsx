import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { IconText } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { borderBottomGray4, colorBlue, fs12BoldBlue2, px, sh48, sw16, sw232, sw8 } from "../../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

export interface PendingOrderActionsProps extends ITableOptions {
  handlePrintSummary: (orderNumber: string) => void;
  handleResubmitOrder: (orderNumber: string) => void;
  setScreen: (route: TransactionsPageType) => void;
  setCurrentOrder: (order: IDashboardOrder) => void;
}

export const PendingOrderActions: FunctionComponent<PendingOrderActionsProps> = ({
  data,
  handlePrintSummary,
  handleResubmitOrder,
  onClose,
  setCurrentOrder,
  setScreen,
}: PendingOrderActionsProps) => {
  const { canProceed, isScheduled, orderNumber, remark, status, withHardcopy } = data.rawData as IDashboardOrder;

  const canSubmitHardcopy = isScheduled === true ? canProceed === true : true;

  const handlePrintSubmissionSummary = () => {
    onClose();
    setTimeout(() => {
      handlePrintSummary(orderNumber);
    }, 300);
  };

  const handleResubmit = () => {
    handleResubmitOrder(orderNumber);
    onClose();
  };

  const handleViewOrder = () => {
    setCurrentOrder(data.rawData as IDashboardOrder);
    setScreen("OrderSummary");
    onClose();
  };

  const handleUploadDocs = () => {
    setCurrentOrder(data.rawData as IDashboardOrder);
    setScreen("UploadDocuments");
    onClose();
  };

  const handleSubmitHardCopy = () => {
    setCurrentOrder(data.rawData as IDashboardOrder);
    setScreen("UploadHardCopy");
    onClose();
  };

  const handleUploadPayment = () => {
    setCurrentOrder(data.rawData as IDashboardOrder);
    setScreen("DashboardPayment");
    onClose();
  };

  const itemStyle: ViewStyle = {
    ...borderBottomGray4,
    ...fs12BoldBlue2,
    ...px(sw16),
    height: sh48,
    width: sw232,
  };

  const labelUploadPayment = isScheduled ? DASHBOARD_HOME.LABEL_UPLOAD_RECURRING : DASHBOARD_HOME.LABEL_UPLOAD_PROOF;

  return (
    <View style={{ borderRadius: sw8 }}>
      <IconText color={colorBlue._2} name="eye-show" onPress={handleViewOrder} text="View Details" style={itemStyle} />
      {status === "Pending Payment" ||
      status === "Pending Doc & Payment" ||
      ((status === "BR - Rerouted" || status === "HQ - Rerouted") &&
        remark.findIndex((reason) => reason.label === "Payment" || reason.label === "Others") !== -1) ? (
        <IconText color={colorBlue._2} name="upload" onPress={handleUploadPayment} text={labelUploadPayment} style={itemStyle} />
      ) : null}
      {status === "Pending Doc" ||
      status === "Pending Doc & Payment" ||
      ((status === "BR - Rerouted" || status === "HQ - Rerouted") &&
        remark.findIndex((reason) => reason.label === "Document" || reason.label === "Others") !== -1) ? (
        <IconText color={colorBlue._2} name="upload" onPress={handleUploadDocs} text={DASHBOARD_HOME.LABEL_UPLOAD} style={itemStyle} />
      ) : null}
      {status === "Pending Physical Doc" && canSubmitHardcopy === true ? (
        <IconText
          color={colorBlue._2}
          name="file"
          onPress={handleSubmitHardCopy}
          text={DASHBOARD_HOME.LABEL_SUBMIT_PHYSICAL}
          style={itemStyle}
        />
      ) : null}
      {/* <IconText
        color={colorBlue._2}
        name="print"
        onPress={handlePrintAccountOpening}
        text={DASHBOARD_HOME.LABEL_PRINT_ACCOUNT_OPENING}
        style={itemStyle}
      /> */}
      {status === "Submitted" && withHardcopy === true ? (
        <IconText
          color={colorBlue._2}
          name="print"
          onPress={handlePrintSubmissionSummary}
          text={DASHBOARD_HOME.LABEL_PRINT_SUBMISSION_SUMMARY}
          style={itemStyle}
        />
      ) : null}
      {status === "BR - Rerouted" || status === "HQ - Rerouted" ? (
        <IconText color={colorBlue._2} name="print" onPress={handleResubmit} text={DASHBOARD_HOME.LABEL_RESUBMIT_ORDER} style={itemStyle} />
      ) : null}
    </View>
  );
};
