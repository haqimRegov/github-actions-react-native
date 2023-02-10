import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import {
  AdvanceToggleButton,
  AdvanceToggleButtonProps,
  CheckBox,
  ColorCard,
  CustomSpacer,
  CustomTooltip,
  TextInputMultiline,
  UploadWithModal,
} from "../../../components";
import { Language } from "../../../constants";
import {
  borderBottomGray2,
  centerHV,
  flexRow,
  fs12BoldWhite1,
  fs16BoldBlack2,
  fs16RegBlack2,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sw12,
  sw136,
  sw20,
  sw24,
  sw7,
  sw8,
  sw96,
} from "../../../styles";
import { FATCATerms } from "./Terms";

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
  address?: string;
  fatca: IFatcaState;
  handleFatcaDeclaration: (declaration: IFatcaState) => void;
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
  address,
  fatca,
  handleFatcaDeclaration,
  validations,
}: FatcaDeclarationDetailsProps) => {
  const {
    acceptFatca,
    formW9,
    formW8Ben,
    certificate,
    confirmAddress,
    explanation,
    // explanationSaved,
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

  // const setExplanationSaved = (value: boolean) => handleFatcaDeclaration({ ...fatca, explanationSaved: value });

  const handleUsCitizen = (value: number) => {
    handleFatcaDeclaration({ ...initialState, usCitizen: value as TypeToggleButtonValue });
  };

  const handleUsBorn = (value: number) => {
    handleFatcaDeclaration({ ...initialState, usBorn: value as TypeToggleButtonValue, usCitizen: usCitizen });
  };

  const handleCertificate = (uploaded?: FileBase64) => {
    handleFatcaDeclaration({ ...initialState, usBorn: usBorn, usCitizen: usCitizen, certificate: uploaded });
  };

  const handleNoCertificate = () => {
    handleFatcaDeclaration({ ...initialState, usBorn: usBorn, usCitizen: usCitizen, noCertificate: !noCertificate });
  };

  const handleReason = (value: number) => {
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

  const handleConfirmAddress = (value: number) => {
    handleFatcaDeclaration({ ...fatca, acceptFatca: false, formW8Ben: false, confirmAddress: value as TypeToggleButtonValue });
  };

  const handleFormW9 = () => handleFatcaDeclaration({ ...fatca, acceptFatca: false, formW9: !formW9 });
  const handleFormW8Ben = () => handleFatcaDeclaration({ ...fatca, acceptFatca: false, formW8Ben: !formW8Ben });
  const handleAcceptFatca = () => handleFatcaDeclaration({ ...fatca, acceptFatca: !acceptFatca });

  const checkBoxStyle = { fontSize: sh16 };

  const advanceToggleProps: Partial<AdvanceToggleButtonProps> = {
    buttonContainerStyle: { ...centerHV, height: sw24, width: sw24 },
    buttonStyle: { borderRadius: sw12, height: sw20, width: sw20 },
    iconSize: sw12,
    labelStyle: { ...fs16RegBlack2, width: sw136 },
    space: sw96,
  };

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <ColorCard
        header="custom"
        customHeader={
          <View style={rowCenterVertical}>
            <Text style={fs16BoldBlack2}>{DECLARATIONS.LABEL_CITIZEN}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <CustomTooltip
              arrowSize={{ width: sw12, height: sw7 }}
              content={<Text style={fs12BoldWhite1}>{DECLARATIONS.TOOLTIP_US_CITIZEN}</Text>}
              theme="dark"
            />
          </View>
        }
        content={
          <View>
            <AdvanceToggleButton
              {...advanceToggleProps}
              labels={[{ label: "Yes" }, { label: "No" }]}
              value={usCitizen as number}
              onSelect={handleUsCitizen}
            />
            {usCitizen === 0 ? (
              <Fragment>
                <CustomSpacer space={sh16} />
                <View style={borderBottomGray2} />
                <CustomSpacer space={sh16} />
                <CheckBox toggle={formW9!} onPress={handleFormW9} label={DECLARATIONS.LABEL_FORM_W9} labelStyle={checkBoxStyle} />
              </Fragment>
            ) : null}
          </View>
        }
      />
      {usCitizen === 1 ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ label: DECLARATIONS.BORN_US_NEW }}
            content={
              <View>
                <AdvanceToggleButton
                  {...advanceToggleProps}
                  labels={[{ label: "Yes" }, { label: "No" }]}
                  value={usBorn as number}
                  onSelect={handleUsBorn}
                />
                {usBorn === 0 ? (
                  <Fragment>
                    <CustomSpacer space={sh16} />
                    <View style={borderBottomGray2} />
                    <CustomSpacer space={sh16} />
                    <UploadWithModal
                      // TODO disabled opacity to 0.6
                      disabled={noCertificate === true}
                      features={["camera", "gallery", "file"]}
                      label={DECLARATIONS.LABEL_LOSS}
                      value={certificate}
                      setValue={handleCertificate}
                      onSuccess={handleCertificate}
                    />
                    <CustomSpacer space={sh16} />
                    <CheckBox
                      disabled={certificate !== undefined}
                      toggle={noCertificate!}
                      onPress={handleNoCertificate}
                      label={DECLARATIONS.LABEL_CANT}
                      labelStyle={checkBoxStyle}
                    />
                  </Fragment>
                ) : null}
              </View>
            }
          />
        </Fragment>
      ) : null}
      {noCertificate ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ label: DECLARATIONS.LABEL_CANT_CONFIRM, title: DECLARATIONS.LABEL_REASON }}
            content={
              <View>
                <AdvanceToggleButton
                  {...advanceToggleProps}
                  space={undefined}
                  direction="column"
                  labels={[{ label: DECLARATIONS.LABEL_REASON_LOST }, { label: DECLARATIONS.LABEL_REASON_OTHER_NEW }]}
                  labelStyle={{ ...advanceToggleProps.labelStyle, width: undefined }}
                  value={reason as number}
                  onSelect={handleReason}
                />
                {usBorn === 0 ? (
                  <Fragment>
                    {noCertificate ? (
                      <Fragment>
                        {reason === 1 ? (
                          <View style={flexRow}>
                            <View>
                              <CustomSpacer space={sh16} />
                              <TextInputMultiline maxLength={100} onChangeText={handleExplanation} showLength={true} value={explanation} />
                            </View>
                          </View>
                        ) : null}
                      </Fragment>
                    ) : null}
                  </Fragment>
                ) : null}
              </View>
            }
          />
        </Fragment>
      ) : null}
      {certificate !== undefined || uploadNoLostYes || uploadNoLostNo ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ label: `${DECLARATIONS.CONFIRM_ADDRESS} ("${address}")` }}
            content={
              <View>
                <AdvanceToggleButton
                  {...advanceToggleProps}
                  labels={[{ label: "Yes" }, { label: "No" }]}
                  value={confirmAddress as number}
                  onSelect={handleConfirmAddress}
                />
                {(citizenNoBornYes && uploadNoLostYesAddressYes) ||
                (citizenNoBornYes && uploadNoLostNoAddressYes) ||
                (citizenNoBornYes && uploadYesAddressYes) ? (
                  <Fragment>
                    <CustomSpacer space={sh16} />
                    <View style={borderBottomGray2} />
                    <CustomSpacer space={sh16} />
                    <CheckBox
                      toggle={formW8Ben!}
                      onPress={handleFormW8Ben}
                      label={DECLARATIONS.LABEL_FORM_W8_BEN}
                      labelStyle={checkBoxStyle}
                    />
                  </Fragment>
                ) : null}
              </View>
            }
          />
        </Fragment>
      ) : null}
      {showTerms ? <FATCATerms acceptFatca={acceptFatca!} handleAcceptFatca={handleAcceptFatca} /> : null}
    </View>
  );
};
