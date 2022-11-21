import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { AccountHeader, AdvanceToggleButton, CustomSpacer, CustomTextInput, CustomTooltip, ToggleButton } from "../../../../components";
import { Language } from "../../../../constants";
import { ERROR, OPTIONS_FEA_FACILITY } from "../../../../data/dictionary";
import {
  flexChild,
  flexRow,
  fs12BoldWhite1,
  fs16SemiBoldGray6,
  px,
  sh16,
  sh24,
  sh32,
  sh8,
  sw12,
  sw24,
  sw317,
  sw32,
  sw600,
  sw7,
} from "../../../../styles";
import { formatAmount, isAmount } from "../../../../utils";
import { FeaTerms } from "./Declaration";

const { DECLARATIONS } = Language.PAGE;

interface FeaDeclarationDetailsProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  fea: IFeaState;
  handleFeaDeclaration: (declaration: IFeaState) => void;
  name: string;
}

export const FeaDeclarationDetails: FunctionComponent<FeaDeclarationDetailsProps> = ({
  accountHolder,
  accountType,
  fea,
  handleFeaDeclaration,
  name,
}: FeaDeclarationDetailsProps) => {
  const { acceptFea, balance, balanceError, facility, resident } = fea;

  const handleAcceptFea = () => handleFeaDeclaration({ ...fea, acceptFea: !acceptFea });

  const handleResident = (value: TypeToggleButtonValue) => {
    handleFeaDeclaration({ ...fea, resident: value });
  };

  const handleFacility = (value: TypeAdvanceToggleButtonValue) => {
    handleFeaDeclaration({ ...fea, facility: value });
  };

  const handleBalance = (value: string) => {
    handleFeaDeclaration({ ...fea, balance: value });
  };

  const validateAmount = (value: string) => {
    const amount: IAmountValueError = { value: value, error: undefined };
    if (isAmount(value) === false) {
      return { ...amount, error: ERROR.INVESTMENT_INVALID_AMOUNT };
    }
    return { ...amount, value: formatAmount(value) };
  };

  const checkNumber = () => {
    const { value, error } = validateAmount(balance!);
    handleFeaDeclaration({ ...fea, balance: value, balanceError: error });
  };

  const headerTitle = accountHolder === "Principal" ? DECLARATIONS.TITLE_PRINCIPAL : DECLARATIONS.TITLE_JOINT;

  return (
    <View>
      <View style={{ ...flexChild, ...px(sw24) }}>
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <AccountHeader spaceToBottom={0} subtitle={headerTitle} title={name} />
          </Fragment>
        )}
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <Text style={fs16SemiBoldGray6}>{DECLARATIONS.LABEL_MALAYSIAN}</Text>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <CustomTooltip
            arrowSize={{ width: sw12, height: sw7 }}
            content={
              <View>
                <Text style={fs12BoldWhite1}>{DECLARATIONS.TOOLTIP_RESIDENT}</Text>
              </View>
            }
            contentStyle={{ width: sw317 }}
          />
        </View>
        <CustomSpacer space={sh8} />
        <ToggleButton value={resident!} onSelect={handleResident} />
        <CustomSpacer space={sh32} />
        <Text style={{ ...fs16SemiBoldGray6, width: sw600 }}>{DECLARATIONS.LABEL_BANK_NEGARA}</Text>
        <CustomSpacer space={sh16} />
        <AdvanceToggleButton
          buttonStyle={{ borderRadius: sw12, height: sw24, width: sw24 }}
          labels={OPTIONS_FEA_FACILITY}
          labelStyle={{ lineHeight: sh24 }}
          onSelect={handleFacility}
          value={facility!}
        />
        <CustomSpacer space={sw32} />
        <CustomTextInput
          error={balanceError}
          keyboardType="numeric"
          label={DECLARATIONS.LABEL_REMAINING}
          onBlur={checkNumber}
          onChangeText={handleBalance}
          value={balance}
        />
      </View>
      <FeaTerms accepted={acceptFea!} setAccepted={handleAcceptFea} />
    </View>
  );
};
