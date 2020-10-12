import React, { Fragment, FunctionComponent } from "react";
import { Alert, Text, View } from "react-native";

import {
  CheckBox,
  CustomSpacer,
  CustomTooltip,
  LinkText,
  RadioButtonGroup,
  TextInputArea,
  TextSpaceArea,
  UploadWithModal,
} from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_NO_CERTIFICATE, OPTIONS_US_BORN, OPTIONS_US_CITIZEN } from "../../../../data/dictionary";
import {
  alignSelfStart,
  borderBottomBlack21,
  centerVertical,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12BoldWhite1,
  fs14BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  justifyContentEnd,
  px,
  py,
  sh16,
  sh24,
  sh32,
  sh4,
  sh40,
  sh8,
  sw12,
  sw24,
  sw32,
  sw464,
  sw48,
} from "../../../../styles";

const { DECLARATION } = Language.PAGE;

interface FATCADeclarationProps {
  fatca: IFatcaState;
  setFatca: (value: IFatcaState) => void;
}

export const FATCADeclaration: FunctionComponent<FATCADeclarationProps> = ({ fatca, setFatca }: FATCADeclarationProps) => {
  // TODO Note for FATCA from FRS
  // TODO US Citizen will be populated from Nationality
  // TODO Section Logic: This will not appear for the joint holder if joint holder is below 18 years old.

  const { acknowledgement, certificate, noCertificate, reason, explanation, uploadLater, usBorn, usCitizen } = fatca;

  const setInputAcknowledgement = (value: boolean) => setFatca({ acknowledgement: value });
  const setInputCertificate = (value?: FileBase64) => setFatca({ certificate: value });
  const setInputNoCertificate = (value: boolean) => setFatca({ noCertificate: value });
  const setInputReason = (value: string) => setFatca({ reason: value });
  const setInputExplanation = (value: string) => setFatca({ explanation: value });
  const setInputUploadLater = (value: boolean) => setFatca({ uploadLater: value });
  const setInputAmerican = (value: string) => setFatca({ usCitizen: value });
  const setInputUSBorn = (value: string) => setFatca({ usBorn: value });

  const handleFATCAPress = () => {
    Alert.alert("FATCA Declaration!");
  };

  const handleAcknowledgement = () => {
    setInputAcknowledgement(!acknowledgement);
  };

  const handleProof = (uploaded?: FileBase64) => {
    if (noCertificate) {
      setInputNoCertificate(false);
    }
    setInputCertificate(uploaded);
  };

  const handleUploadLater = () => {
    if (!uploadLater) {
      setInputNoCertificate(false);
    }
    setInputUploadLater(!uploadLater);
  };

  const handleNoCertificate = () => {
    setFatca({ noCertificate: !noCertificate, explanation: "", reason: OPTIONS_NO_CERTIFICATE[0] });
  };

  const handleReason = (value: string) => {
    if (value !== OPTIONS_NO_CERTIFICATE[1]) {
      setInputExplanation("");
    }
    setInputReason(value);
  };

  const handleOtherReason = (value: string) => {
    setInputExplanation(value);
  };

  const popupContent = (
    <View>
      <Text style={{ ...fs12BoldWhite1, lineHeight: sh24 }}>{DECLARATION.INFO_US_CITIZEN}</Text>
    </View>
  );

  const bottomSpace = usBorn === OPTIONS_US_BORN[1] ? sh40 : sh24;

  return (
    <Fragment>
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh8} style={fs24BoldBlack2} text={DECLARATION.LABEL_FATCA} />
        <LinkText text={DECLARATION.LABEL_DECLARATION} onPress={handleFATCAPress} />
        <View style={flexRow}>
          <TextSpaceArea text={DECLARATION.LABEL_US_CITIZEN} spaceToTop={sh24} style={{ ...fs16RegBlack2, lineHeight: sh24 }} />
          <CustomSpacer isHorizontal={true} space={sw12} />
          <View style={justifyContentEnd}>
            <CustomTooltip content={popupContent} />
          </View>
        </View>
        <CustomSpacer space={sh16} />
        <RadioButtonGroup direction="row" options={OPTIONS_US_CITIZEN} selected={usCitizen!} setSelected={setInputAmerican} space={sw48} />
        <TextSpaceArea
          text={DECLARATION.LABEL_US_BORN}
          spaceToTop={sh32}
          spaceToBottom={sh16}
          style={{ ...fs16RegBlack2, lineHeight: sh24 }}
        />
        <RadioButtonGroup direction="row" options={OPTIONS_US_BORN} selected={usBorn!} setSelected={setInputUSBorn} space={sw48} />
      </View>
      {usBorn === OPTIONS_US_BORN[0] ? (
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
                <RadioButtonGroup spaceToTop={sh8} options={OPTIONS_NO_CERTIFICATE} selected={reason!} setSelected={handleReason} />
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
