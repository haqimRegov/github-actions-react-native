import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal } from "../../components";
import { FORCE_UPDATE_ROUTES, Language } from "../../constants";
import { ForceUpdateMapDispatchToProps, ForceUpdateMapStateToProps, ForceUpdateStoreProps } from "../../store";
import { fs16RegGray6 } from "../../styles";
import { Signatures, TermsAndConditions } from "./Acknowledgement";
import { ContactContent } from "./Contact";
import { ContactSummaryContent } from "./ContactSummary";
import { CRSContent, DeclarationSummaryContent, FATCAContent } from "./Declarations";
import { RiskAssessmentContent } from "./RiskAssessment";

const { FORCE_UPDATE } = Language.PAGE;

interface ForceUpdateProps extends ForceUpdateContentProps, ForceUpdateStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}

const ForceUpdateContentComponent = ({
  handleCancelForceUpdate,
  handleResetForceUpdate,
  cancelForceUpdate,
  ...props
}: ForceUpdateProps) => {
  const newProps = {
    ...props,
    handleCancelForceUpdate: handleCancelForceUpdate,
    handleResetForceUpdate: handleResetForceUpdate,
  };

  let content: JSX.Element;
  const backToDashboardLabel = FORCE_UPDATE.LABEL_BACK_FORCE_UPDATE;

  switch (newProps.route) {
    case FORCE_UPDATE_ROUTES.Contact:
      content = <ContactContent {...newProps} />;
      break;
    case FORCE_UPDATE_ROUTES.ContactSummary:
      content = <ContactSummaryContent {...newProps} />;
      break;
    case FORCE_UPDATE_ROUTES.RiskAssessment:
      content = <RiskAssessmentContent {...newProps} />;
      break;
    case FORCE_UPDATE_ROUTES.FATCADeclaration:
      content = <FATCAContent {...newProps} />;
      break;
    case FORCE_UPDATE_ROUTES.CRSDeclaration:
      content = <CRSContent {...newProps} />;
      break;
    case FORCE_UPDATE_ROUTES.DeclarationSummary:
      content = <DeclarationSummaryContent {...newProps} />;
      break;
    case FORCE_UPDATE_ROUTES.TermsAndConditions:
      content = <TermsAndConditions {...newProps} />;
      break;
    case FORCE_UPDATE_ROUTES.Signatures:
      content = <Signatures {...newProps} />;
      break;

    default:
      content = <View />;
      break;
  }

  return (
    <Fragment>
      {content}
      <ConfirmationModal
        handleCancel={handleCancelForceUpdate}
        handleContinue={handleResetForceUpdate}
        labelCancel={FORCE_UPDATE.BUTTON_NO}
        labelContinue={FORCE_UPDATE.BUTTON_YES}
        title={FORCE_UPDATE.EDIT_TITLE}
        visible={cancelForceUpdate!}>
        <Text style={fs16RegGray6}>{backToDashboardLabel}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};
export const ForceUpdateContent = connect(ForceUpdateMapStateToProps, ForceUpdateMapDispatchToProps)(ForceUpdateContentComponent);
