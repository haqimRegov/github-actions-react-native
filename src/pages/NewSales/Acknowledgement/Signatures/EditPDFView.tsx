import React, { Fragment, FunctionComponent } from "react";
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  PixelRatio,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import PDFView from "react-native-view-pdf";
import WebView from "react-native-webview";

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
  colorTransparent,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs18BoldGray6,
  fullHeight,
  fullHW,
  px,
  sh32,
  sh4,
  sh40,
  sh48,
  sh64,
  sw100,
  sw20,
  sw24,
  sw32,
  sw8,
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
  pageWidth: number;
  setScrollRef: (ref: ScrollView) => void;
  transactionType?: TTransactionType;
}

export const PdfViewNewSales: FunctionComponent<PDFViewProps> = ({
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
  pageWidth,
  setScrollRef,
  transactionType,
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
      case "joint": {
        const checkJoint =
          jointAge !== undefined && jointAge > 18
            ? TERMS_AND_CONDITIONS.LABEL_JOINT_SIGNATURE
            : TERMS_AND_CONDITIONS.LABEL_JOINT_SIGNATURE_OPTIONAL;
        signerLabel = transactionType !== "Sales-AO" ? TERMS_AND_CONDITIONS.LABEL_JOINT_SIGNATURE : checkJoint;
        signatureToDisplay = jointSignature;
        break;
      }
      default:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        break;
    }
  }

  const DEFAULT_URL_PAGE_COUNT = urlPageCount !== undefined ? parseInt(urlPageCount, 10) : 0;
  const DEFAULT_PADDING_MULTIPLIER = 73.33;
  const pagePadding = pageWidth / DEFAULT_PADDING_MULTIPLIER;
  const PDF_WIDTH = pageWidth - 2 * pagePadding;
  const NO_BOTTOM_MULTIPLIER = 1.378504672897196;
  const PDF_HEIGHT = PDF_WIDTH * NO_BOTTOM_MULTIPLIER;
  const BOTTOM_MULTIPLIER = 131.11;
  const SPACE_BETWEEN = PDF_HEIGHT / BOTTOM_MULTIPLIER;

  // space between 16px
  // pdf height with padding 1196
  // pdf height without bottom padding 1180
  // pdf width without padding 856
  const remotePdfHeight = DEFAULT_URL_PAGE_COUNT * Math.ceil(PDF_HEIGHT);

  const remotePdfContainer: ViewStyle = {
    height: PixelRatio.roundToNearestPixel(remotePdfHeight),
  };
  const dummyRemotePdfContainer: ViewStyle = { height: remotePdfHeight };
  const pdfContainer: ViewStyle = { height: PDF_HEIGHT };
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
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <Text style={fs18BoldGray6}>{editReceipt!.name}</Text>
                </View>
              </View>
              <CustomSpacer space={sh4} />
              <View style={px(pagePadding)}>
                <View style={remotePdfContainer}>
                  <View pointerEvents="none" style={fullHW}>
                    <View style={dummyRemotePdfContainer}>
                      <WebView
                        incognito={true}
                        scrollEnabled={false}
                        source={{ uri: editReceipt!.url! }}
                        style={{ backgroundColor: colorTransparent }}
                      />
                    </View>
                  </View>
                </View>
                <CustomSpacer space={SPACE_BETWEEN} />
                <TouchableWithoutFeedback onPress={handlePosition}>
                  <View style={pdfContainer}>
                    <View pointerEvents="none">
                      <PDFView style={fullHeight} resource={editReceipt!.signedPdf?.base64!} resourceType="base64" />
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
