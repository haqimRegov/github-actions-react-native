import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps } from "../../../store";
import { flexRow, flexWrap, fs16RegGray5, fs18BoldGray6, px, sh24, sh4, sw24 } from "../../../styles";
import { AccountCard } from "../../../templates/Cards";

const { ACCOUNT_LIST } = Language.PAGE;

declare interface IAccountListProps extends NewSalesContentProps, NewSalesStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}

declare interface ITagStyle {
  container?: ViewStyle;
  text?: TextStyle;
}

const dummyData: INewSalesAccountList[] = [
  {
    accountType: "Individual",
    accountNo: "RI0000001",
    principalHolder: "Edgar Constantine Shevchenko",
    tags: ["UT", "Cash", "Low Risk"],
  },
  {
    accountType: "Individual",
    accountNo: "RI0000001",
    principalHolder: "Edgar Constantine Shevchenko",
    tags: ["PRS", "Cash", "Medium Risk"],
  },
  {
    accountType: "Individual",
    accountNo: "RI0000001",
    principalHolder: "Edgar Constantine Shevchenko",
    tags: ["UT", "Cash", "High Risk"],
  },
  {
    accountType: "Joint",
    accountNo: "RI0000001",
    principalHolder: "Edgar Constantine Shevchenko",
    jointHolder: "MArco Polo",
    tags: ["UT", "Cash", "Low Risk"],
  },
  {
    accountType: "Individual",
    accountNo: "RI0000001",
    principalHolder: "Edgar Constantine Shevchenko",
    tags: ["PRS", "Cash", "Low Risk"],
  },
  {
    accountType: "Individual",
    accountNo: "RI0000001",
    principalHolder: "Edgar Constantine Shevchenko",
    tags: ["UT", "Cash", "Low Risk"],
  },
];

const AccountListComponent: FunctionComponent<IAccountListProps> = ({
  handleNextStep,
  navigation,
  newSales,
  client,
  route,
  updateNewSales,
}: IAccountListProps) => {
  const { disabledSteps, finishedSteps } = newSales;

  const header = `${ACCOUNT_LIST.LABEL_WELCOME_BACK} ${client.details?.accountHolder}`;
  return (
    <ContentPage subheading={header}>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <LabeledTitle
          label={ACCOUNT_LIST.LABEL_HEADING}
          labelStyle={fs18BoldGray6}
          spaceToLabel={sh4}
          title={ACCOUNT_LIST.LABEL_SUBHEADING}
          titleStyle={fs16RegGray5}
        />
        <CustomSpacer space={sh24} />
        <View style={{ ...flexRow, ...flexWrap }}>
          {dummyData.map((eachAccount: INewSalesAccountList, index: number) => {
            const handleSelectAccount = () => {
              let updatedDisabledSteps = [...disabledSteps];
              let updatedFinishedSteps = [...finishedSteps];
              updatedDisabledSteps = [
                "Acknowledgement",
                "AdditionalDetails",
                "IdentityVerification",
                "OrderPreview",
                "Payment",
                "ProductsList",
                "ProductsConfirmation",
                "Signatures",
                "Summary",
                "TermsAndConditions",
              ];
              updatedFinishedSteps = ["AccountList"];
              updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });
              handleNextStep("RiskAssessment");
            };
            return (
              <Fragment key={index}>
                {index % 2 !== 0 ? <CustomSpacer isHorizontal={true} space={sw24} /> : null}
                <AccountCard data={eachAccount} handlePress={handleSelectAccount} />
              </Fragment>
            );
          })}
        </View>
      </View>
    </ContentPage>
  );
};

export const AccountList = connect(NewSalesMapStateToProps, NewSalesMapDispatchToProps)(AccountListComponent);
