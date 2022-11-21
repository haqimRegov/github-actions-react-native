import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { AccountHeader, CustomSpacer, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { borderBottomGray2, fs12RegGray5, fs24BoldGray6, px, sh16, sh24, sh32, sh8, sw24, sw48, sw520 } from "../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface AccountDetailsProps {
  accountType: TypeAccountChoices;
  investmentDetails: IProductSales[];
  personalInfo: IPersonalInfoState;
  setPersonalInfo: (value: IPersonalInfoState) => void;
}

export const AccountDetails: FunctionComponent<AccountDetailsProps> = ({
  accountType,
  investmentDetails,
  personalInfo,
  setPersonalInfo,
}: AccountDetailsProps) => {
  const inputDistribution = personalInfo.incomeDistribution!;
  const inputSignatory = personalInfo.signatory!;
  const setInputDistribution = (value: string) => setPersonalInfo({ incomeDistribution: value });
  const setInputSignatory = (value: string) => setPersonalInfo({ signatory: value });
  const names =
    accountType === "Joint"
      ? `${personalInfo.principal!.personalDetails!.name!} ${PERSONAL_DETAILS.LABEL_AND} ${personalInfo.joint!.personalDetails!.name!}`
      : "";
  const subtitleLabel = `${PERSONAL_DETAILS.LABEL_PRINCIPAL} ${PERSONAL_DETAILS.LABEL_AND} ${PERSONAL_DETAILS.LABEL_JOINT}`;
  const space = accountType === "Joint" ? sh24 : 0;
  const padding: ViewStyle = accountType === "Joint" ? px(sw24) : {};
  const spaceToAdditional = accountType === "Joint" ? sh24 : sh32;
  const jointAge = accountType === "Joint" ? moment().diff(personalInfo.joint!.personalDetails!.dateOfBirth, "years") : undefined;

  const operatingControl = [PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL];
  if (accountType === "Joint" && jointAge !== undefined && jointAge >= 18) {
    operatingControl.push(PERSONAL_DETAILS.OPTION_CONTROL_BOTH, PERSONAL_DETAILS.OPTION_CONTROL_EITHER);
  }

  const fundsWithPayout = investmentDetails.filter(({ fundDetails, investment }) => {
    return (
      (fundDetails.fundType !== "PRS" && investment.fundPaymentMethod !== "EPF") ||
      (investment.fundPaymentMethod === "Cash" && fundDetails.fundType !== "PRS")
    );
  });

  const distributionOptions = [PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST];

  if (fundsWithPayout.length !== 0) {
    distributionOptions.push(PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT);
  }

  return (
    <Fragment>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={spaceToAdditional} />
      <View style={px(sw24)}>
        {accountType === "Individual" ? null : <AccountHeader subtitle={subtitleLabel} title={names} />}
        <View style={padding}>
          {accountType === "Joint" ? <Text style={fs24BoldGray6}>{PERSONAL_DETAILS.LABEL_ADDITIONAL}</Text> : null}
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={space} text={PERSONAL_DETAILS.LABEL_DISTRIBUTION} />
          <RadioButtonGroup
            direction="row"
            options={distributionOptions}
            selected={inputDistribution}
            setSelected={setInputDistribution}
            space={sw48}
          />
          <TextSpaceArea spaceToTop={sh16} style={{ ...fs12RegGray5, maxWidth: sw520 }} text={PERSONAL_DETAILS.HINT_DISTRIBUTION} />
          {accountType === "Individual" ? null : (
            <Fragment>
              <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh24} text={PERSONAL_DETAILS.LABEL_SIGN} />
              <RadioButtonGroup
                direction="row"
                options={operatingControl}
                selected={inputSignatory}
                setSelected={setInputSignatory}
                space={sw48}
              />
            </Fragment>
          )}
        </View>
      </View>
    </Fragment>
  );
};
