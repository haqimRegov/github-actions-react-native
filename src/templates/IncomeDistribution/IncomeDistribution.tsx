import React, { Fragment, FunctionComponent } from "react";

import { ColorCard, RadioButtonGroup } from "../../components";
import { Language } from "../../constants";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IncomeDistributionProps {
  inputDistribution: string;
  setInputDistribution: (input: string) => void;
  withPayout: boolean;
}

export const IncomeDistribution: FunctionComponent<IncomeDistributionProps> = ({
  inputDistribution,
  setInputDistribution,
  withPayout,
}: IncomeDistributionProps) => {
  return (
    <ColorCard
      header={{ label: PERSONAL_DETAILS.LABEL_DISTRIBUTION, title: PERSONAL_DETAILS.HINT_DISTRIBUTION }}
      content={
        <Fragment>
          <RadioButtonGroup
            direction="row"
            disabledIndex={withPayout === true ? undefined : [1]}
            disabledTooltip={true}
            options={[PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST, PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT]}
            selected={inputDistribution}
            setSelected={setInputDistribution}
          />
        </Fragment>
      }
    />
  );
};
