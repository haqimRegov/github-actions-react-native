import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { AccountHeader, CustomSpacer, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { OPTION_OPERATING_CONTROL } from "../../../data/dictionary";
import { borderBottomBlack21, fs16SemiBoldBlack2, fs24BoldBlack2, px, sh16, sh24, sh32, sw24, sw48 } from "../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface AccountDetailsProps {
  accountType: TypeAccountChoices;
  personalInfo: IPersonalInfoState;
  setPersonalInfo: (value: IPersonalInfoState) => void;
}

export const AccountDetails: FunctionComponent<AccountDetailsProps> = ({
  accountType,
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

  return (
    <Fragment>
      <CustomSpacer space={sh32} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={spaceToAdditional} />
      <View style={px(sw24)}>
        {accountType === "Individual" ? null : <AccountHeader subtitle={subtitleLabel} title={names} />}
        <View style={padding}>
          {accountType === "Joint" ? <Text style={fs24BoldBlack2}>{PERSONAL_DETAILS.LABEL_ADDITIONAL}</Text> : null}
          <TextSpaceArea spaceToBottom={sh16} spaceToTop={space} style={fs16SemiBoldBlack2} text={PERSONAL_DETAILS.LABEL_DISTRIBUTION} />
          <RadioButtonGroup
            direction="row"
            options={[PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT, PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST]}
            selected={inputDistribution}
            setSelected={setInputDistribution}
            space={sw48}
          />
          {accountType === "Individual" ? null : (
            <Fragment>
              <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs16SemiBoldBlack2} text={PERSONAL_DETAILS.LABEL_SIGN} />
              <RadioButtonGroup
                direction="row"
                options={OPTION_OPERATING_CONTROL}
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
