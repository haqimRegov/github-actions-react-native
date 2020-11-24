import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CheckBox, CustomFlexSpacer, CustomSpacer, CustomTooltip, ToggleButton } from "../../../../components";
import { Language } from "../../../../constants";
import {
  borderBottomRed4,
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12BoldWhite1,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  px,
  sh24,
  sh32,
  sh64,
  sh8,
  shadowBlue204,
  sw12,
  sw24,
  sw8,
} from "../../../../styles";
import { FatcaTerms } from "./Declaration";
import { FatcaUSBorn } from "./USBorn";

const { DECLARATIONS } = Language.PAGE;

interface IFatcaValidations {
  citizenNoBornNo?: boolean;
  citizenNoBornYes: boolean;
  showTerms: boolean;
  uploadNoLostNo: boolean;
  uploadNoLostNoAddressNo?: boolean;
  uploadNoLostNoAddressYes: boolean;
  uploadNoLostYes: boolean;
  uploadNoLostYesAddressNo?: boolean;
  uploadNoLostYesAddressYes: boolean;
  uploadYesAddressNo?: boolean;
  uploadYesAddressYes: boolean;
}

interface FatcaDeclarationDetailsProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  address: string;
  fatca: IFatcaState;
  handleFatcaDeclaration: (declaration: IFatcaState) => void;
  name: string;
  validations: IFatcaValidations;
}

const initialState: IFatcaState = {
  acceptFatca: false,
  agreeToFill: false,
  certificate: undefined,
  confirmAddress: -1,
  explanation: "",
  explanationSaved: true,
  noCertificate: false,
  reason: -1,
  usBorn: -1,
  usCitizen: -1,
};

export const FatcaDeclarationDetails: FunctionComponent<FatcaDeclarationDetailsProps> = ({
  accountHolder,
  accountType,
  address,
  fatca,
  handleFatcaDeclaration,
  name,
  validations,
}: FatcaDeclarationDetailsProps) => {
  const {
    acceptFatca,
    agreeToFill,
    certificate,
    confirmAddress,
    explanation,
    explanationSaved,
    noCertificate,
    reason,
    usBorn,
    usCitizen,
  } = fatca;

  const {
    citizenNoBornYes,
    uploadYesAddressYes,
    uploadNoLostYes,
    uploadNoLostYesAddressYes,
    uploadNoLostNo,
    uploadNoLostNoAddressYes,
    showTerms,
  } = validations;

  const setExplanationSaved = (value: boolean) => handleFatcaDeclaration({ ...fatca, explanationSaved: value });

  const handleUsCitizen = (value: TypeToggleButtonValue) => {
    handleFatcaDeclaration({ ...initialState, usCitizen: value });
  };

  const handleUsBorn = (value: TypeToggleButtonValue) => {
    handleFatcaDeclaration({ ...initialState, usBorn: value, usCitizen: usCitizen });
  };

  const handleCertificate = (uploaded?: FileBase64) => {
    handleFatcaDeclaration({ ...initialState, usBorn: usBorn, usCitizen: usCitizen, certificate: uploaded });
  };

  const handleNoCertificate = () => {
    handleFatcaDeclaration({ ...initialState, usBorn: usBorn, usCitizen: usCitizen, noCertificate: !noCertificate });
  };

  const handleReason = (value: TypeAdvanceToggleButtonValue) => {
    handleFatcaDeclaration({ ...initialState, usBorn: usBorn, usCitizen: usCitizen, noCertificate: true, reason: value });
  };

  const handleExplanation = (value: string) => {
    const newFatca: IFatcaState = { ...fatca };
    if (value === "") {
      newFatca.confirmAddress = -1;
      newFatca.agreeToFill = false;
      newFatca.acceptFatca = false;
    }
    handleFatcaDeclaration({ ...newFatca, explanation: value, explanationSaved: true });
  };

  const handleConfirmAddress = (value: TypeToggleButtonValue) => {
    handleFatcaDeclaration({ ...fatca, acceptFatca: false, agreeToFill: false, confirmAddress: value });
  };

  const handleAgreeToFill = () => handleFatcaDeclaration({ ...fatca, acceptFatca: false, agreeToFill: !agreeToFill });
  const handleAcceptFatca = () => handleFatcaDeclaration({ ...fatca, acceptFatca: !acceptFatca });

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
          <Text style={fs16SemiBoldBlack2}>{DECLARATIONS.LABEL_CITIZEN}</Text>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <CustomTooltip
            content={
              <View>
                <Text style={fs12BoldWhite1}>{DECLARATIONS.TOOLTIP_US_CITIZEN}</Text>
              </View>
            }
          />
        </View>
        <CustomSpacer space={sh8} />
        <ToggleButton value={usCitizen!} onSelect={handleUsCitizen} />
        {usCitizen === 1 ? (
          <FatcaUSBorn
            address={address}
            certificate={certificate}
            confirmed={confirmAddress!}
            explanation={explanation!}
            explanationSaved={explanationSaved!}
            handleSave={setExplanationSaved}
            noCertificate={noCertificate!}
            reason={reason!}
            setCertificate={handleCertificate}
            setConfirmation={handleConfirmAddress}
            setExplanation={handleExplanation}
            setNoCertificate={handleNoCertificate}
            setReason={handleReason}
            setUsBorn={handleUsBorn}
            uploadNoLostNo={uploadNoLostNo}
            uploadNoLostYes={uploadNoLostYes}
            usBorn={usBorn!}
          />
        ) : null}

        {usCitizen === 0 ||
        (citizenNoBornYes && uploadYesAddressYes) ||
        (citizenNoBornYes && uploadNoLostYesAddressYes) ||
        (citizenNoBornYes && uploadNoLostNoAddressYes) ? (
          <Fragment>
            <CustomSpacer space={sh32} />
            <CheckBox toggle={agreeToFill!} onPress={handleAgreeToFill} label={DECLARATIONS.LABEL_CHECK_FILL} labelStyle={fs12BoldBlack2} />
          </Fragment>
        ) : null}
      </View>
      {showTerms ? (
        <Fragment>
          <FatcaTerms accepted={acceptFatca!} setAccepted={handleAcceptFatca} />
        </Fragment>
      ) : null}
    </View>
  );
};
