import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { AdvanceToggleButton, CustomFlexSpacer, CustomSpacer, CustomTextInput, CustomTooltip, ToggleButton } from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_FEA_FACILITY } from "../../../../data/dictionary";
import {
  borderBottomRed4,
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldWhite1,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  px,
  sh16,
  sh24,
  sh32,
  sh64,
  sh8,
  shadowBlue204,
  sw12,
  sw24,
  sw317,
  sw32,
  sw600,
  sw8,
} from "../../../../styles";
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
  const { acceptFea, balance, facility, resident } = fea;

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

  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...borderBottomRed4,
    ...shadowBlue204,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh64,
    position: "relative",
    zIndex: 1,
  };

  const headerTitle = accountHolder === "Principal" ? DECLARATIONS.TITLE_PRINCIPAL : DECLARATIONS.TITLE_JOINT;

  return (
    <View>
      <View style={{ ...flexChild, ...px(sw24) }}>
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={headerStyle}>
              <Text style={fs24BoldBlack2}>{name}</Text>
              <CustomFlexSpacer />
              <Text style={fs16RegBlack2}>{headerTitle}</Text>
            </View>
          </Fragment>
        )}
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <Text style={fs16SemiBoldBlack2}>{DECLARATIONS.LABEL_MALAYSIAN}</Text>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <CustomTooltip
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
        <Text style={{ ...fs16SemiBoldBlack2, width: sw600 }}>{DECLARATIONS.LABEL_BANK_NEGARA}</Text>
        <CustomSpacer space={sh16} />
        <AdvanceToggleButton labels={OPTIONS_FEA_FACILITY} onSelect={handleFacility} value={facility!} />
        <CustomSpacer space={sw32} />
        <CustomTextInput label={DECLARATIONS.LABEL_REMAINING} onChangeText={handleBalance} value={balance!} />
      </View>
      <FeaTerms accepted={acceptFea!} setAccepted={handleAcceptFea} />
    </View>
  );
};
