import React, { Fragment, FunctionComponent } from "react";
import { GestureResponderEvent, Image, ImageStyle, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CustomSpacer, IconButton, RoundedButton, SignatureModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import {
  absolutePosition,
  centerVertical,
  circleBorder,
  colorBlack,
  colorBlue,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs18BoldGray6,
  fullHeight,
  px,
  sh1148,
  sh12,
  sh32,
  sh4,
  sh40,
  sh48,
  sh64,
  sw100,
  sw20,
  sw24,
  sw32,
} from "../../../../styles";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

export type Signer = "adviser" | "principal" | "joint" | undefined;

declare interface PDFViewProps {
  accountType: TypeAccountChoices;
  adviserSignature: string;
  completed: boolean;
  editReceipt: IOnboardingReceiptState | undefined;
  principalSignature: string;
  jointAge?: number;
  jointSignature: string;
  showSignPdf: boolean;
  signer: Signer;
  handleScroll: () => void;
  handleBack: () => void;
  handleSave: () => void;
  handleSignature: (signature: string) => void;
  handleClose: () => void;
  handleConfirm: () => void;
  handlePosition: (e: GestureResponderEvent) => void;
  pageLoading: boolean;
  setScrollRef: (ref: ScrollView) => void;
}

export const PdfViewOnboarding: FunctionComponent<PDFViewProps> = ({
  accountType,
  adviserSignature,
  editReceipt,
  completed,
  principalSignature,
  jointAge,
  jointSignature,
  showSignPdf,
  signer,
  handleScroll,
  handleBack,
  handleSave,
  handleSignature,
  handleClose,
  handleConfirm,
  handlePosition,
  pageLoading,
  setScrollRef,
}: PDFViewProps) => {
  const { urlPageCount } = editReceipt!;
  let signerLabel = "";
  let signatureToDisplay = "";

  if (signer !== undefined) {
    switch (signer) {
      case "adviser":
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        signatureToDisplay = adviserSignature;
        break;
      case "principal":
        signerLabel =
          accountType === "Joint" ? TERMS_AND_CONDITIONS.LABEL_PRINCIPAL_SIGNATURE : TERMS_AND_CONDITIONS.LABEL_INVESTORS_SIGNATURE;
        signatureToDisplay = principalSignature;
        break;
      case "joint":
        signerLabel =
          jointAge !== undefined && jointAge > 18
            ? TERMS_AND_CONDITIONS.LABEL_JOINT_SIGNATURE
            : TERMS_AND_CONDITIONS.LABEL_JOINT_SIGNATURE_OPTIONAL;
        signatureToDisplay = jointSignature;
        break;
      default:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        break;
    }
  }

  const DEFAULT_URL_PAGE_COUNT = urlPageCount !== undefined ? parseInt(urlPageCount, 10) : 0;
  const DEFAULT_PDF_HEIGHT = sh1148;
  const remotePdfHeight = DEFAULT_URL_PAGE_COUNT * DEFAULT_PDF_HEIGHT;

  const localPdfHeight = DEFAULT_PDF_HEIGHT + 2; // added 2 for shadow

  const remotePdfContainer: ViewStyle = { height: remotePdfHeight };
  const dummyRemotePdfContainer: ViewStyle = { height: remotePdfHeight + DEFAULT_PDF_HEIGHT };
  const pageNumberFix: ViewStyle = { height: (remotePdfHeight + DEFAULT_PDF_HEIGHT) * 1600 }; // To display the page number correctly in the viewer
  const pdfContainer: ViewStyle = { height: localPdfHeight };
  const defaultTooltipStyle: ImageStyle = {
    ...absolutePosition,
    bottom: 52,
    height: 32,
    width: 96,
    zIndex: 1,
  };

  const handleContinue = () => {
    if (editReceipt !== undefined && editReceipt.completed === true) {
      handleBack();
    } else {
      handleSave();
    }
  };

  return (
    <Fragment>
      <View style={flexChild}>
        <ScrollView
          ref={setScrollRef}
          contentContainerStyle={flexGrow}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <CustomSpacer space={sh32} />
              <View style={px(sw24)}>
                <View style={{ ...centerVertical, ...flexRow }}>
                  <IcoMoon color={colorBlack._1} name="arrow-left" onPress={handleBack} size={sw24} suppressHighlighting={true} />
                  <CustomSpacer isHorizontal={true} space={sw20} />
                  <Text style={fs18BoldGray6}>{editReceipt!.name}</Text>
                </View>
              </View>
              <CustomSpacer space={sh4} />
              <View style={px(sw24)}>
                <View style={remotePdfContainer}>
                  <View pointerEvents="none">
                    <View style={dummyRemotePdfContainer}>
                      <PDFView style={pageNumberFix} resource={editReceipt!.url!} resourceType="url" />
                    </View>
                  </View>
                </View>
                <TouchableWithoutFeedback onPress={handlePosition}>
                  <View style={pdfContainer}>
                    <View pointerEvents="none">
                      <PDFView style={{ ...fullHeight, top: -sh12 }} resource={editReceipt!.signedPdf?.base64!} resourceType="base64" />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={px(sw20)}>
              <CustomSpacer space={sh40} />
              <RoundedButton
                disabled={completed === false}
                onPress={handleContinue}
                loading={pageLoading}
                text={TERMS_AND_CONDITIONS.BUTTON_CONTINUE}
              />
              <CustomSpacer space={sh48} />
            </View>
          </View>
        </ScrollView>
        {completed === true ? null : (
          <TouchableWithoutFeedback onPress={handleScroll}>
            <View style={{ ...absolutePosition, right: sw32, top: sh64 }}>
              <View style={{ width: sw100, ...centerVertical }}>
                <Image source={LocalAssets.tooltip.addSign} style={defaultTooltipStyle} />
                <IconButton
                  color={colorBlue._1}
                  name="sign"
                  onPress={handleScroll}
                  size={44}
                  style={circleBorder(64, 1, colorBlue._4, colorWhite._1)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <SignatureModal
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleSignature={handleSignature}
        signature={signatureToDisplay}
        title={signerLabel}
        visible={showSignPdf}
      />
    </Fragment>
  );
};
