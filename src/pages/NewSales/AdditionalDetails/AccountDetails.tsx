import React, { Fragment, FunctionComponent } from "react";

import { AdvanceToggleButton, ColorCard, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { fs16RegBlack2, sh24, sw12, sw16, sw200, sw24, sw36 } from "../../../styles";

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
  const distributionOptions = [
    {
      label: PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT,
      value: PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT,
    },
    { label: PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST, value: PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST },
  ];
  const operatingControl = [{ label: PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW, value: PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW }];

  const setInputDistribution = (index: number) => {
    const checkIndex = index !== -1 ? distributionOptions[index].value : "";
    setPersonalInfo({ incomeDistribution: checkIndex });
  };
  const setInputSignatory = (signatoryIndex: number) => {
    const checkSignatoryIndex = signatoryIndex !== -1 ? operatingControl[signatoryIndex].value : "";
    setPersonalInfo({ signatory: checkSignatoryIndex });
  };

  if (accountType === "Joint") {
    operatingControl.push(
      { label: PERSONAL_DETAILS.OPTION_CONTROL_BOTH_NEW, value: PERSONAL_DETAILS.OPTION_CONTROL_BOTH_NEW },
      { label: PERSONAL_DETAILS.OPTION_CONTROL_EITHER_NEW, value: PERSONAL_DETAILS.OPTION_CONTROL_EITHER_NEW },
    );
  }

  const fundsWithPayout = investmentDetails.filter(({ fundDetails, investment }) => {
    return (
      (fundDetails.fundType !== "PRS" && investment.fundPaymentMethod !== "EPF") ||
      (investment.fundPaymentMethod === "Cash" && fundDetails.fundType !== "PRS")
    );
  });

  const distributionDisabled: number[] = [];
  if (fundsWithPayout.length === 0) {
    distributionDisabled.push(0);
  }

  return (
    <Fragment>
      <CustomSpacer space={sh24} />
      <ColorCard
        header={{ label: PERSONAL_DETAILS.LABEL_DISTRIBUTION, title: PERSONAL_DETAILS.HINT_DISTRIBUTION }}
        content={
          <AdvanceToggleButton
            buttonStyle={{ borderRadius: sw12, height: sw24, width: sw24 }}
            direction="row"
            disabledIndex={distributionDisabled}
            iconSize={sw16}
            labels={distributionOptions}
            labelStyle={fs16RegBlack2}
            space={sw36}
            textContainer={{ width: sw200 }}
            value={distributionOptions.findIndex((eachIndex) => eachIndex.value === inputDistribution)}
            onSelect={setInputDistribution}
          />
        }
      />
      {accountType === "Individual" ? null : (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ label: PERSONAL_DETAILS.LABEL_SIGN }}
            content={
              <AdvanceToggleButton
                buttonStyle={{ borderRadius: sw12, height: sw24, width: sw24 }}
                direction="row"
                iconSize={sw16}
                labels={operatingControl}
                labelStyle={fs16RegBlack2}
                space={sw36}
                textContainer={{ width: sw200 }}
                value={operatingControl.findIndex((eachIndex) => eachIndex.value === inputSignatory)}
                onSelect={setInputSignatory}
              />
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
};
