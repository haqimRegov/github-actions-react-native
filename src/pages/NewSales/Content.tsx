import React, { Fragment } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal } from "../../components";
import { Language, NEW_SALES_ROUTES } from "../../constants";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps } from "../../store/NewSales";
import { fs16RegGray6 } from "../../styles";
import { Sample } from "../ForceUpdate/Sample";
import { AdditionalInfoSummary } from "./AccountInfoSummary";
import { AccountList } from "./AccountList";
import { NewSalesAcknowledgment } from "./Acknowledgement";
import { AdditionalInfo } from "./AdditionalDetails";
import { ProductConfirmation } from "./Confirmation";
import { NewSalesIdentityConfirmation } from "./IdentityVerification";
import { Products } from "./Products";
import { NewSalesRisk } from "./RiskAssessment";

const { NEW_SALES } = Language.PAGE;
interface NewSalesProps extends NewSalesContentProps, NewSalesStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}

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
    case NEW_SALES_ROUTES.RiskAssessment:
      content = <NewSalesRisk {...newProps} />;
      break;
    case NEW_SALES_ROUTES.ProductsList:
      content = <Products {...newProps} />;
      break;
    case NEW_SALES_ROUTES.OrderPreview:
      content = <NewSalesAcknowledgment {...newProps} />;
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
    case NEW_SALES_ROUTES.Acknowledgement:
      content = <Sample title="sample" {...newProps} />;
      break;
    default:
      content = <Sample title="sample" {...newProps} />;
      break;
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
