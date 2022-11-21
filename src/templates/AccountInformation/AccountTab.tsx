import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { ColorCard, CustomSpacer, IconText, TextCard } from "../../components";
import { Language } from "../../constants";
import { getStructuredAccountInformation } from "../../pages/Dashboard/Investors/helpers";
import {
  borderBottomBlue4,
  flexChild,
  fs16BoldBlack2,
  px,
  rowCenterVertical,
  sh12,
  sh16,
  sh24,
  sh8,
  sw16,
  sw24,
  sw328,
} from "../../styles";
import { isArrayNotEmpty, isNotEmpty } from "../../utils";
import { SummaryColorCard, summaryColorCardStyleProps } from "../Dashboard";
import { InvestorOverviewCard } from "./InvestorOverviewCard";

const { ACCOUNT_INFORMATION } = Language.PAGE;

declare interface AccountTabProps {
  data: IInvestorAccount;
  handleViewProfile: (clientId: string) => void;
  setFile: (value?: FileBase64) => void;
}

export const AccountTab: FunctionComponent<AccountTabProps> = ({ data, handleViewProfile, setFile }: AccountTabProps) => {
  const { investorOverview } = data;
  const investor = investorOverview[0];
  const investorJoint = investorOverview.length > 1 ? investorOverview[1] : undefined;
  const { accountDetails, correspondenceAddress, foreignBank, localBank } = getStructuredAccountInformation(data);

  const handleViewProfilePrincipal = () => {
    handleViewProfile(investor.clientId);
  };

  const handleViewProfileJoint = () => {
    if (investorJoint !== undefined) {
      handleViewProfile(investorJoint.clientId);
    }
  };

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <ColorCard
        {...summaryColorCardStyleProps}
        content={
          <Fragment>
            <InvestorOverviewCard
              accountHolder="Principal"
              accountType={investorJoint !== undefined ? "Joint" : "Individual"}
              handleViewProfile={handleViewProfilePrincipal}
              info={investor}
              setFile={setFile}
            />
            {investorJoint !== undefined ? (
              <Fragment>
                <CustomSpacer space={sh8} />
                <InvestorOverviewCard
                  accountHolder="Joint"
                  accountType="Joint"
                  handleViewProfile={handleViewProfileJoint}
                  info={investorJoint}
                  setFile={setFile}
                />
              </Fragment>
            ) : null}
          </Fragment>
        }
        header={{ label: ACCOUNT_INFORMATION.CARD_TITLE_INVESTOR_OVERVIEW }}
      />
      <SummaryColorCard data={accountDetails} headerTitle={ACCOUNT_INFORMATION.CARD_TITLE_ACCOUNT_DETAILS} spaceToTop={sh24} />
      <SummaryColorCard data={correspondenceAddress} headerTitle={ACCOUNT_INFORMATION.CARD_TITLE_CORRESPONDENCE} spaceToTop={sh24} />
      {isNotEmpty(data.bankInformation) &&
      (isArrayNotEmpty(data.bankInformation!.localBank) || isArrayNotEmpty(data.bankInformation!.foreignBank)) ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            {...summaryColorCardStyleProps}
            content={
              <View>
                {isArrayNotEmpty(data.bankInformation!.localBank) ? (
                  <Fragment>
                    {localBank.data.map((textCardData: LabeledTitleProps[], index: number) => {
                      const iconTitle = localBank.data.length > 1 ? `${localBank.text} ${index + 1}` : localBank.text;

                      return (
                        <View key={index}>
                          <CustomSpacer space={sh8} />
                          <View style={rowCenterVertical}>
                            <IconText name={localBank.iconName} iconSize={sw24} text={iconTitle} textStyle={fs16BoldBlack2} />
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            <View style={{ ...borderBottomBlue4, ...flexChild }} />
                            <CustomSpacer isHorizontal={true} space={sw24} />
                          </View>
                          <CustomSpacer space={sh12} />
                          <TextCard data={textCardData} itemStyle={{ width: sw328 }} />
                        </View>
                      );
                    })}
                  </Fragment>
                ) : null}
                {isArrayNotEmpty(data.bankInformation!.foreignBank) ? (
                  <Fragment>
                    <CustomSpacer space={sh16} />
                    {foreignBank!.data.map((textCardData: LabeledTitleProps[], index: number) => {
                      const iconTitle = foreignBank!.data.length > 1 ? `${foreignBank!.text} ${index + 1}` : foreignBank!.text;
                      return (
                        <View key={index}>
                          <CustomSpacer space={sh8} />
                          <View style={rowCenterVertical}>
                            <IconText name={foreignBank!.iconName} iconSize={sw24} text={iconTitle} textStyle={fs16BoldBlack2} />
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            <View style={{ ...borderBottomBlue4, ...flexChild }} />
                            <CustomSpacer isHorizontal={true} space={sw24} />
                          </View>
                          <CustomSpacer space={sh12} />
                          <TextCard data={textCardData} itemStyle={{ width: sw328 }} />
                        </View>
                      );
                    })}
                  </Fragment>
                ) : null}
              </View>
            }
            header={{ label: ACCOUNT_INFORMATION.CARD_TITLE_BANKING }}
          />
        </Fragment>
      ) : null}
    </View>
  );
};
