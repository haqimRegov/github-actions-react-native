import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, LabeledTitle, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { borderBottomBlack21, fs10BoldBlack2, fs16SemiBoldBlack2, fs24BoldBlack2, px, sh16, sh24, sh32, sw24, sw48 } from "../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface AccountDetailsProps {
  accountType: TypeAccountChoices;
  personalInfo: IPersonalInfoState;
  setPersonalInfo: (value: IPersonalInfoState) => void;
}

const OPTION_SIGN = [
  PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL,
  PERSONAL_DETAILS.OPTION_CONTROL_BOTH,
  PERSONAL_DETAILS.OPTION_CONTROL_EITHER,
];

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

  const space = accountType === "Joint" ? sh24 : 0;

  return (
    <Fragment>
      <CustomSpacer space={sh32} />
      <View style={borderBottomBlack21} />
      <View style={px(sw24)}>
        <CustomSpacer space={sh32} />
        {accountType === "Individual" ? null : (
          <LabeledTitle label={names} labelStyle={fs10BoldBlack2} title={PERSONAL_DETAILS.LABEL_ADDITIONAL} titleStyle={fs24BoldBlack2} />
        )}
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
            <CustomSpacer space={sh32} />
            <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs16SemiBoldBlack2} text={PERSONAL_DETAILS.LABEL_SIGN} />
            <RadioButtonGroup
              direction="row"
              options={OPTION_SIGN}
              selected={inputSignatory}
              setSelected={setInputSignatory}
              space={sw48}
            />
          </Fragment>
        )}
      </View>
    </Fragment>
  );
};
