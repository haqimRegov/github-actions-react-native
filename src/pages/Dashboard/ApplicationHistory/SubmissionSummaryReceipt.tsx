import React, { FunctionComponent } from "react";

import { LocalAssets } from "../../../assets/LocalAssets";
import { PromptModal } from "../../../components";
import { Language } from "../../../constants/language";

const { DASHBOARD_HOME } = Language.PAGE;

export interface SubmissionSummaryReceiptProps {
  visible: boolean;
  handlePress: () => void;
  selectedOrders: number;
}

export const SubmissionSummaryReceiptModal: FunctionComponent<SubmissionSummaryReceiptProps> = ({
  visible,
  handlePress,
  selectedOrders,
}: SubmissionSummaryReceiptProps) => {
  const submissionSummary = `${selectedOrders} ${DASHBOARD_HOME.LABEL_SUBMISSION_SUMMARY_DOWNLOADED}`;

  return (
    <PromptModal
      labelContinue={DASHBOARD_HOME.BUTTON_DONE}
      handleContinue={handlePress}
      illustration={LocalAssets.illustration.submissionSummary}
      label={submissionSummary}
      title={DASHBOARD_HOME.LABEL_SUBMISSION_REPORT_DOWNLOADED}
      visible={visible}
    />
  );
};
