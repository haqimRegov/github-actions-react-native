import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal, ContentPageProps } from "../../components";
import { Language, NEW_SALES_ROUTES } from "../../constants";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps } from "../../store/NewSales";
import { fs14RegGray5, fs16RegGray6, fs18BoldGray6, fs24BoldGray6, sh4, sh40, sh48 } from "../../styles";
import { AdditionalInfoSummary } from "./AccountInfoSummary";
import { AccountList } from "./AccountList";
import { OrderPreview, Signatures, TermsAndConditions } from "./Acknowledgement";
import { AdditionalInfo } from "./AdditionalDetails";
import { ProductConfirmation } from "./Confirmation";
import { NewSalesIdentityConfirmation } from "./IdentityVerification";
import { NewSalesPayment } from "./Payment";
import { Products } from "./Products";
import { NewSalesRiskAssessment } from "./RiskAssessment";
import { NewSalesRiskSummary } from "./RiskProfile";

const { NEW_SALES } = Language.PAGE;
interface NewSalesProps extends NewSalesContentProps, NewSalesStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}

export const defaultContentProps: Partial<ContentPageProps> = {
  headingStyle: fs24BoldGray6,
  spaceToBottom: sh48,
  spaceToButton: sh48,
  spaceToHeading: 0,
  spaceToTitle: sh4,
  spaceToTop: sh40,
  subheadingStyle: fs18BoldGray6,
  subtitleStyle: fs14RegGray5,
};

const NewSalesContentComponent = ({ handleCancelNewSales, handleResetNewSales, cancelNewSales, ...props }: NewSalesProps) => {
  const newProps = {
    ...props,
    handleCancelNewSales: handleCancelNewSales,
    handleResetNewSales: handleResetNewSales,
  };

  let content: JSX.Element;
  const backToDashboardLabel = NEW_SALES.LABEL_BACK_NEW_SALES;

  switch (newProps.route) {
    case NEW_SALES_ROUTES.AccountList:
      content = <AccountList {...newProps} />;
      break;
    case NEW_SALES_ROUTES.RiskSummary:
      content = <NewSalesRiskSummary {...newProps} />;
      break;
    case NEW_SALES_ROUTES.RiskAssessment:
      content = <NewSalesRiskAssessment {...newProps} />;
      break;
    case NEW_SALES_ROUTES.ProductsList:
      content = <Products {...newProps} />;
      break;
    case NEW_SALES_ROUTES.OrderPreview:
      content = <OrderPreview {...newProps} />;
      break;
    case NEW_SALES_ROUTES.TermsAndConditions:
      content = <TermsAndConditions {...newProps} />;
      break;
    case NEW_SALES_ROUTES.Signatures:
      content = <Signatures {...newProps} />;
      break;
    case NEW_SALES_ROUTES.ProductsConfirmation:
      content = <ProductConfirmation {...newProps} />;
      break;
    case NEW_SALES_ROUTES.IdentityVerification:
      content = <NewSalesIdentityConfirmation {...newProps} />;
      break;
    case NEW_SALES_ROUTES.AdditionalDetails:
      content = <AdditionalInfo {...newProps} />;
      break;
    case NEW_SALES_ROUTES.Summary:
      content = <AdditionalInfoSummary {...newProps} />;
      break;
    case NEW_SALES_ROUTES.Payment:
      content = <NewSalesPayment {...newProps} />;
      break;
    default:
      content = <View />;
  }

  return (
    <Fragment>
      {content}
      <ConfirmationModal
        handleCancel={handleCancelNewSales}
        handleContinue={handleResetNewSales}
        labelCancel={NEW_SALES.BUTTON_NO}
        labelContinue={NEW_SALES.BUTTON_YES}
        title={NEW_SALES.EDIT_TITLE}
        visible={cancelNewSales!}>
        <Text style={fs16RegGray6}>{backToDashboardLabel}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};
export const NewSalesContent = connect(NewSalesMapStateToProps, NewSalesMapDispatchToProps)(NewSalesContentComponent);
