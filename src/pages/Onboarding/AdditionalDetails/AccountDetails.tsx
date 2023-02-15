import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";

import { AdvanceToggleButton, ColorCard, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { alignSelfCenter, centerHV, fs16BoldBlack2, sh24, sw12, sw14, sw18, sw24, sw240 } from "../../../styles";

const { ADDITIONAL_DETAILS } = Language.PAGE;

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

  const fundsWithPayout = investmentDetails.filter(({ fundDetails, investment }) => {
    return (
      (fundDetails.fundType !== "PRS" && investment.fundPaymentMethod !== "EPF") ||
      (investment.fundPaymentMethod === "Cash" && fundDetails.fundType !== "PRS")
    );
  });

  const distributionOptions: ICheckBoxWithSubLabel[] = [
    { label: ADDITIONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST, value: ADDITIONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST },
  ];

  if (fundsWithPayout.length !== 0) {
    distributionOptions.push({
      label: ADDITIONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT,
      value: ADDITIONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT,
    });
  }

  const jointAge = accountType === "Joint" ? moment().diff(personalInfo.joint!.personalDetails!.dateOfBirth, "years") : undefined;
  const operatingControl: ICheckBoxWithSubLabel[] = [
    { label: ADDITIONAL_DETAILS.OPTION_CONTROL_PRINCIPAL, value: ADDITIONAL_DETAILS.OPTION_CONTROL_PRINCIPAL },
  ];
  if (accountType === "Joint" && jointAge !== undefined && jointAge >= 18) {
    operatingControl.push(
      { label: ADDITIONAL_DETAILS.OPTION_CONTROL_BOTH, value: ADDITIONAL_DETAILS.OPTION_CONTROL_BOTH },
      { label: ADDITIONAL_DETAILS.OPTION_CONTROL_EITHER, value: ADDITIONAL_DETAILS.OPTION_CONTROL_EITHER },
    );
  }
  const handleInputDistribution = (index: number) => {
    const value = index !== -1 ? distributionOptions[index].value : "";
    setPersonalInfo({ incomeDistribution: value });
  };
  const handleInputSignatory = (index: number) => {
    const value = index !== -1 ? operatingControl[index].value : "";
    setPersonalInfo({ signatory: value });
  };

  return (
    <Fragment>
      <ColorCard
        header={{ label: ADDITIONAL_DETAILS.LABEL_DISTRIBUTION, title: ADDITIONAL_DETAILS.HINT_DISTRIBUTION }}
        content={
          <AdvanceToggleButton
            buttonContainerStyle={alignSelfCenter}
            buttonStyle={{ ...centerHV, height: sw18, width: sw18 }}
            contentToRadioSpace={sw12}
            direction="row"
            iconSize={sw14}
            labels={distributionOptions}
            labelStyle={fs16BoldBlack2}
            onSelect={handleInputDistribution}
            space={sw24}
            style={{ width: sw240 }}
            value={distributionOptions.findIndex((eachIndex) => eachIndex.value === inputDistribution)}
          />
        }
      />
      {accountType === "Individual" ? null : (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ label: ADDITIONAL_DETAILS.LABEL_SIGN }}
            content={
              <Fragment>
                <AdvanceToggleButton
                  buttonContainerStyle={alignSelfCenter}
                  buttonStyle={{ ...centerHV, height: sw18, width: sw18 }}
                  contentToRadioSpace={sw12}
                  direction="row"
                  iconSize={sw14}
                  labels={operatingControl}
                  labelStyle={fs16BoldBlack2}
                  onSelect={handleInputSignatory}
                  space={sw24}
                  style={{ width: sw240 }}
                  value={operatingControl.findIndex((eachIndex) => eachIndex.value === inputSignatory)}
                />
              </Fragment>
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
};
