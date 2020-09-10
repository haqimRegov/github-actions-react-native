import React, { Fragment } from "react";
import { Alert, Text, View } from "react-native";

import {
  CheckBox,
  CustomPopup,
  CustomSpacer,
  LinkText,
  RadioButtonGroup,
  TextInputArea,
  TextSpaceArea,
  UploadWithModal,
} from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_NO_CERTIFICATE, OPTIONS_US_BORN, OPTIONS_US_CITIZEN } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import {
  alignSelfStart,
  borderBottomBlack21,
  centerVertical,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs14BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  justifyContentEnd,
  px,
  py,
  sh12,
  sh16,
  sh24,
  sh32,
  sh4,
  sh40,
  sh8,
  sw12,
  sw200,
  sw208,
  sw24,
  sw32,
  sw464,
  sw48,
} from "../../../../styles";

const { DECLARATION } = Language.PAGE;

interface FATCADeclarationProps {
  inputAmerican: string;
  inputLossCertificate?: ILossCertificate;
  inputUSBorn: string;
  setInputAmerican: (input: string) => void;
  setInputLossCertificate: (input: ILossCertificate) => void;
  setInputUSBorn: (input: string) => void;
}

export const FATCADeclaration = ({
  inputAmerican,
  inputLossCertificate,
  inputUSBorn,
  setInputAmerican,
  setInputLossCertificate,
  setInputUSBorn,
}: FATCADeclarationProps) => {
  // TODO Note for FATCA from FRS
  // TODO US Citizen will be populated from Nationality
  // TODO Section Logic: This will not appear for the joint holder if joint holder is below 18 years old.

  const { acknowledgement, certificate, explanation, noCertificate, reason, uploadLater } = inputLossCertificate!;

  const handleFATCAPress = () => {
    Alert.alert("FATCA Declaration!");
  };

  const handleProof = (uploaded?: FileBase64) => {
    const updatedCertificate = { ...inputLossCertificate, certificate: uploaded };
    if (noCertificate) {
      updatedCertificate.noCertificate = false;
    }
    setInputLossCertificate(updatedCertificate);
  };

  const handleUploadLater = () => {
    const updatedCertificate = { ...inputLossCertificate, uploadLater: !uploadLater };
    if (!uploadLater) {
      updatedCertificate.noCertificate = false;
    }
    setInputLossCertificate(updatedCertificate);
  };

  const handleAcknowledgement = () => {
    setInputLossCertificate({ ...inputLossCertificate, acknowledgement: !acknowledgement });
  };

  const handleNoCertificate = () => {
    setInputLossCertificate({ ...inputLossCertificate, noCertificate: !noCertificate, reason: OPTIONS_NO_CERTIFICATE[0], explanation: "" });
  };

  const handleReason = (input: string) => {
    const updatedCertificate = { ...inputLossCertificate, reason: input };
    if (input !== OPTIONS_NO_CERTIFICATE[1]) {
      updatedCertificate.explanation = "";
    }
    setInputLossCertificate(updatedCertificate);
  };

  const handleOtherReason = (input: string) => {
    setInputLossCertificate({ ...inputLossCertificate, explanation: input });
  };

  const bottomSpace = inputUSBorn === OPTIONS_US_BORN[1] ? sh40 : sh24;

  return (
    <Fragment>
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh8} style={fs24BoldBlack2} text={DECLARATION.LABEL_FATCA} />
        <LinkText text={DECLARATION.LABEL_DECLARATION} onPress={handleFATCAPress} />
        <View style={flexRow}>
          <TextSpaceArea text={DECLARATION.LABEL_US_CITIZEN} spaceToTop={sh24} style={fs16RegBlack2} />
          <CustomSpacer isHorizontal={true} space={sw12} />
          <View style={justifyContentEnd}>
            <CustomPopup popupStyle={{ width: sw208 }} popupText={DECLARATION.INFO_US_CITIZEN} textStyle={{ width: sw200 }}>
              <IcoMoon name="info" size={sh24} />
            </CustomPopup>
          </View>
        </View>
        <CustomSpacer space={sh16} />
        <RadioButtonGroup
          direction="row"
          options={OPTIONS_US_CITIZEN}
          selected={inputAmerican}
          setSelected={setInputAmerican}
          space={sw48}
        />
        <TextSpaceArea text={DECLARATION.LABEL_US_BORN} spaceToTop={sh32} spaceToBottom={sh16} style={fs16RegBlack2} />
        <RadioButtonGroup direction="row" options={OPTIONS_US_BORN} selected={inputUSBorn} setSelected={setInputUSBorn} space={sw48} />
      </View>
      {inputUSBorn === OPTIONS_US_BORN[0] ? (
        <Fragment>
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs14BoldBlack2} text={DECLARATION.LABEL_UPLOAD} />
            <UploadWithModal
              features={["camera", "file", "gallery"]}
              label={DECLARATION.TITLE_CERTIFICATE}
              onSuccess={handleProof}
              setValue={handleProof}
              value={certificate}
            />
            {certificate === undefined ? (
              <Fragment>
                <CustomSpacer space={sh24} />
                <CheckBox
                  label={DECLARATION.LABEL_UPLOAD_LATER}
                  labelStyle={fs12BoldBlack2}
                  onPress={handleUploadLater}
                  toggle={uploadLater!}
                />
              </Fragment>
            ) : null}
          </View>
          <View style={{ ...centerVertical, ...flexRow, ...py(sh24) }}>
            <CustomSpacer isHorizontal={true} space={sw24} />
            <Text style={fs14BoldBlack2}>{DECLARATION.LABEL_OR}</Text>
            <CustomSpacer isHorizontal={true} space={sw12} />
            <View style={{ ...borderBottomBlack21, ...flexChild }} />
          </View>
          <View style={px(sw24)}>
            <CheckBox
              checkboxStyle={{ ...alignSelfStart, ...py(sh4) }}
              disabled={certificate !== undefined || uploadLater === true}
              label={DECLARATION.LABEL_NO_CERTIFICATE}
              labelStyle={{ ...fs12BoldBlack2, width: sw464 }}
              onPress={handleNoCertificate}
              toggle={noCertificate!}
            />
            {noCertificate === true ? (
              <View style={px(sw32)}>
                <RadioButtonGroup spaceToTop={sh12} options={OPTIONS_NO_CERTIFICATE} selected={reason!} setSelected={handleReason} />
                {reason! === OPTIONS_NO_CERTIFICATE[1] ? (
                  <TextInputArea
                    label={DECLARATION.LABEL_NO_CERTIFICATE_REASON}
                    onChangeText={handleOtherReason}
                    spaceToBottom={sh8}
                    spaceToTop={sh16}
                    value={explanation!}
                  />
                ) : null}
              </View>
            ) : null}
            <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh24} style={fs14BoldBlack2} text={DECLARATION.LABEL_ACKNOWLEDGMENT} />
            <CheckBox
              checkboxStyle={{ ...alignSelfStart, ...py(sh4) }}
              label={DECLARATION.LABEL_HEREBY}
              labelStyle={{ ...fs12BoldBlack2, width: sw464 }}
              onPress={handleAcknowledgement}
              toggle={acknowledgement!}
            />
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={bottomSpace} />
    </Fragment>
  );
};
