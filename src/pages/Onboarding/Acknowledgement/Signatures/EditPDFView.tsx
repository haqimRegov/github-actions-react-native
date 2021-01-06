import React, { FunctionComponent } from "react";
import { GestureResponderEvent, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";

import { CustomSpacer, IconButton, RoundedButton, SafeAreaPage, SignatureModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import {
  absolutePosition,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexGrow,
  flexRow,
  fs12RegBlue1,
  fs24BoldBlack2,
  px,
  sh1,
  sh120,
  sh1600,
  sh24,
  sh26,
  sh32,
  sh34,
  sh4,
  sh56,
  sh8,
  sh800,
  shadowBlue5,
  sw1,
  sw20,
  sw24,
  sw33,
  sw40,
  sw595,
  sw8,
  sw80,
  sw82,
  sw96,
} from "../../../../styles";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

export type Signer = "adviser" | "principal" | "joint" | undefined;

declare interface PDFViewProps {
  adviserSignature: string;
  completed: boolean;
  currentPdf: PdfWithIndex;
  principalSignature: string;
  jointSignature: string;
  numberOfPdfPages: number;
  showSignPdf: boolean;
  signer: Signer;
  handleScroll: () => void;
  handleBack: () => void;
  handleSignature: (signature: string) => void;
  handleClose: () => void;
  handleConfirm: () => void;
  handlePosition: (e: GestureResponderEvent) => void;
  setScrollRef: (ref: ScrollView) => void;
}

export const PdfView: FunctionComponent<PDFViewProps> = ({
  adviserSignature,
  currentPdf,
  completed,
  principalSignature,
  jointSignature,
  numberOfPdfPages,
  showSignPdf,
  signer,
  handleScroll,
  handleBack,
  handleSignature,
  handleClose,
  handleConfirm,
  handlePosition,
  setScrollRef,
}: PDFViewProps) => {
  let signerLabel = "";
  let signatureToDisplay = "";

  if (signer !== undefined) {
    switch (signer) {
      case "adviser":
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        signatureToDisplay = adviserSignature;
        break;
      case "principal":
        signerLabel = TERMS_AND_CONDITIONS.LABEL_PRINCIPAL_SIGNATURE;
        signatureToDisplay = principalSignature;
        break;
      case "joint":
        signerLabel = TERMS_AND_CONDITIONS.LABEL_JOINT_SIGNATURE;
        signatureToDisplay = jointSignature;
        break;
      default:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        break;
    }
  }
  const pdfViewContainer: ViewStyle = { ...px(sw8), width: sw595, height: numberOfPdfPages * sh800 };
  const pdfContainer: ViewStyle = { height: numberOfPdfPages * sh1600 }; // To display the page number correctly in the viewer
  const toolTipStyle: ViewStyle = { top: sh8, zIndex: 1 };
  const toolTipLabelStyle: ViewStyle = {
    ...centerHV,
    position: "absolute",
    backgroundColor: colorWhite._1,
    left: sw1,
    right: sw1,
    width: sw82,
    height: sh26,
    borderRadius: sw8,
    top: sh1,
  };

  return (
    <SafeAreaPage>
      <View>
        <ScrollView
          ref={setScrollRef}
          contentContainerStyle={flexGrow}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View>
            <View style={flexRow}>
              <View>
                <CustomSpacer space={sh32} />
                <View style={px(sw24)}>
                  <View style={{ ...centerVertical, ...flexRow }}>
                    <IcoMoon color={colorBlack._1} name="arrow-left" onPress={handleBack} size={sw24} />
                    <CustomSpacer isHorizontal={true} space={sw20} />
                    <Text style={fs24BoldBlack2}>{currentPdf?.pdf.name}</Text>
                  </View>
                </View>
                <CustomSpacer space={sh4} />
                <TouchableWithoutFeedback onPress={handlePosition}>
                  <View style={pdfViewContainer}>
                    <View pointerEvents="none">
                      <PDFView fadeInDuration={350} style={pdfContainer} resource={currentPdf.pdf.base64!} resourceType="base64" />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <CustomSpacer isHorizontal={true} space={sw96} />
            </View>
            {completed === true ? (
              <View style={px(sw20)}>
                <CustomSpacer space={sh24} />
                <RoundedButton onPress={handleBack} text={TERMS_AND_CONDITIONS.BUTTON_CONTINUE} />
                <CustomSpacer space={sh56} />
              </View>
            ) : null}
          </View>
        </ScrollView>
        {completed === false ? (
          <TouchableWithoutFeedback onPress={handleScroll}>
            <View style={{ ...absolutePosition, right: sw40, top: sh120 }}>
              <View style={toolTipStyle}>
                <View style={toolTipLabelStyle}>
                  <Text style={fs12RegBlue1}>{TERMS_AND_CONDITIONS.LABEL_ADD_SIGN}</Text>
                </View>
                <IcoMoon
                  style={{ ...shadowBlue5, backgroundColor: colorTransparent }}
                  color={colorGray._1}
                  name="filter-tooltip"
                  size={sh34}
                />
              </View>
              <IconButton
                color={colorBlue._2}
                name="sign"
                onPress={handleScroll}
                size={sw33}
                style={circleBorder(sw80, sw1, colorGray._3, colorWhite._1)}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      <SignatureModal
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleSignature={handleSignature}
        signature={signatureToDisplay}
        title={signerLabel}
        visible={showSignPdf}
      />
    </SafeAreaPage>
  );
};
