import React, { Fragment, FunctionComponent } from "react";
import { Text } from "react-native";

import { CustomSpacer, ToggleButton } from "../../../../components";
import { Language } from "../../../../constants";
import { fs16SemiBoldGray6, sh16, sw600 } from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

export interface FatcaAddressProps {
  address: string;
  confirmed: TypeToggleButtonValue;
  setConfirmation: (value: TypeToggleButtonValue) => void;
}

export const FatcaAddress: FunctionComponent<FatcaAddressProps> = ({ address, confirmed, setConfirmation }: FatcaAddressProps) => {
  const label = `${DECLARATIONS.CONFIRM_ADDRESS} ("${address}")`;

  return (
    <Fragment>
      <Text style={{ ...fs16SemiBoldGray6, width: sw600 }}>{label}</Text>
      <CustomSpacer space={sh16} />
      <ToggleButton value={confirmed} onSelect={setConfirmation} />
    </Fragment>
  );
};
