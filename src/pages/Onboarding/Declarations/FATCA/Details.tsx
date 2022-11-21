import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { AccountHeader, CheckBox, CustomSpacer, CustomTooltip, ToggleButton } from "../../../../components";
import { Language } from "../../../../constants";
import { flexChild, flexRow, fs12BoldWhite1, fs16SemiBoldGray6, px, sh24, sh32, sh8, sw12, sw24, sw7 } from "../../../../styles";
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
  formW9: false,
  formW8Ben: false,
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
    formW9,
    formW8Ben,
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
      newFatca.formW8Ben = false;
      newFatca.acceptFatca = false;
    }
    handleFatcaDeclaration({ ...newFatca, explanation: value, explanationSaved: true });
  };

  const handleConfirmAddress = (value: TypeToggleButtonValue) => {
    handleFatcaDeclaration({ ...fatca, acceptFatca: false, formW8Ben: false, confirmAddress: value });
  };

  const handleFormW9 = () => handleFatcaDeclaration({ ...fatca, acceptFatca: false, formW9: !formW9 });
  const handleFormW8Ben = () => handleFatcaDeclaration({ ...fatca, acceptFatca: false, formW8Ben: !formW8Ben });
  const handleAcceptFatca = () => handleFatcaDeclaration({ ...fatca, acceptFatca: !acceptFatca });

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
          <Text style={fs16SemiBoldGray6}>{DECLARATIONS.LABEL_CITIZEN}</Text>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <CustomTooltip
            arrowSize={{ width: sw12, height: sw7 }}
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
        {usCitizen === 0 ? (
          <Fragment>
            <CustomSpacer space={sh32} />
            <CheckBox toggle={formW9!} onPress={handleFormW9} label={DECLARATIONS.LABEL_FORM_W9} />
          </Fragment>
        ) : null}
        {(citizenNoBornYes && uploadYesAddressYes) ||
        (citizenNoBornYes && uploadNoLostYesAddressYes) ||
        (citizenNoBornYes && uploadNoLostNoAddressYes) ? (
          <Fragment>
            <CustomSpacer space={sh32} />
            <CheckBox toggle={formW8Ben!} onPress={handleFormW8Ben} label={DECLARATIONS.LABEL_FORM_W8_BEN} />
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
