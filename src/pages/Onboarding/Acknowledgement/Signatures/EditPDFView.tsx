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
  fs24BoldGray6,
  px,
  sh120,
  sh24,
  sh32,
  sh4,
  sh56,
  sw100,
  sw20,
  sw24,
  sw40,
  sw8,
  sw96,
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

export const PdfView: FunctionComponent<PDFViewProps> = ({
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
  const pdfViewContainer: ViewStyle = { ...px(sw8), width: 595, height: 800 };
  const remotePdfViewContainer: ViewStyle = { ...px(sw8), width: 595, height: parseInt(urlPageCount!, 10) * 796 };
  const pdfContainer: ViewStyle = { height: parseInt(urlPageCount!, 10) * 1600 }; // To display the page number correctly in the viewer
  const pdfSignContainer: ViewStyle = { height: 800 };
  const defaultTooltipStyle: ImageStyle = {
    bottom: 72,
    height: 34,
    position: "absolute",
    width: 84,
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
            <View style={flexRow}>
              <View>
                <CustomSpacer space={sh32} />
                <View style={px(sw24)}>
                  <View style={{ ...centerVertical, ...flexRow }}>
                    <IcoMoon color={colorBlack._1} name="arrow-left" onPress={handleBack} size={sw24} suppressHighlighting={true} />
                    <CustomSpacer isHorizontal={true} space={sw20} />
                    <Text style={fs24BoldGray6}>{editReceipt!.name}</Text>
                  </View>
                </View>
                <CustomSpacer space={sh4} />
                <View style={remotePdfViewContainer}>
                  <View pointerEvents="none">
                    <PDFView style={pdfContainer} resource={editReceipt!.url!} resourceType="url" />
                  </View>
                </View>
                <TouchableWithoutFeedback onPress={handlePosition}>
                  <View style={pdfViewContainer}>
                    <View pointerEvents="none">
                      <PDFView style={pdfSignContainer} resource={editReceipt!.signedPdf?.base64!} resourceType="base64" />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <CustomSpacer isHorizontal={true} space={sw96} />
            </View>
            {completed === true ? (
              <View style={px(sw20)}>
                <CustomSpacer space={sh24} />
                <RoundedButton onPress={handleContinue} loading={pageLoading} text={TERMS_AND_CONDITIONS.BUTTON_CONTINUE} />
                <CustomSpacer space={sh56} />
              </View>
            ) : null}
          </View>
        </ScrollView>
        {completed === true ? null : (
          <TouchableWithoutFeedback onPress={handleScroll}>
            <View style={{ ...absolutePosition, right: sw40, top: sh120 }}>
              <View style={{ width: sw100, ...centerVertical }}>
                <Image source={LocalAssets.tooltip.addSign} style={defaultTooltipStyle} />
                <IconButton
                  color={colorBlue._1}
                  name="sign"
                  onPress={handleScroll}
                  size={48}
                  style={circleBorder(80, 1, colorBlue._4, colorWhite._1)}
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
