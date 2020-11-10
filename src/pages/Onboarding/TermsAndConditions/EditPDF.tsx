import fontkit from "@pdf-lib/fontkit";
import { Buffer } from "buffer";
import moment from "moment";
import { PDFDocument, rgb } from "pdf-lib/cjs";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Dimensions, GestureResponderEvent, Platform, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";
import { connect } from "react-redux";

import { CustomSpacer, IconButton, SignatureModal } from "../../../components";
import { Base64 } from "../../../constants";
import { Language } from "../../../constants/language";
import { IcoMoon } from "../../../icons";
import { ReactFileSystem } from "../../../integrations/file-system/functions";
import { ClientMapDispatchToProps, ClientMapStateToProps } from "../../../store";
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
  flexChild,
  flexGrow,
  flexRow,
  fs12RegBlue1,
  fs24BoldBlack2,
  px,
  sh100,
  sh12,
  sh132,
  sh15,
  sh155,
  sh1600,
  sh220,
  sh25,
  sh26,
  sh30,
  sh300,
  sh32,
  sh34,
  sh370,
  sh4,
  sh40,
  sh800,
  sh90,
  shadowBlue5,
  sw1,
  sw145,
  sw180,
  sw20,
  sw200,
  sw24,
  sw245,
  sw25,
  sw275,
  sw33,
  sw470,
  sw595,
  sw8,
  sw80,
  sw82,
  sw84,
} from "../../../styles";
import { GetEmbeddedBase64 } from "../../../utils";
import { PDFListProps } from "./PDFList";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

const adviserSignPosition = { x: sw20, y: sh155 };
const principalSignPosition = { x: sw275, y: sh155 };
const jointSignPosition = { x: sw20, y: sh300 };
export const EditPdfComponent: FunctionComponent<PDFListProps> = ({
  accountType,
  currentPdf,
  pdfList,
  setCurrentPdf,
  setPage,
  setPdfList,
}: PDFListProps) => {
  const [adviserSignature, setAdviserSignature] = useState<string>("");
  const [principalSignature, setPrincipalSignature] = useState<string>("");
  const [jointSignature, setJointSignature] = useState<string>("");
  const [numberOfPdfPages, setNumberOfPdfPages] = useState<number>(1);
  const [showSignPdf, setShowSignPdf] = useState<boolean>(false);
  const [signer, setSigner] = useState<number>();
  const [scrollRef, setScrollRef] = useState<ScrollView | null>(null);

  const modifyPdf = async (value: string) => {
    if (value !== "" && currentPdf !== undefined) {
      const dataUri = GetEmbeddedBase64(currentPdf.pdf);
      const loadPdf = await PDFDocument.load(dataUri);
      const fileData = await ReactFileSystem.readFileMainBundle("NunitoSans-SemiBold.ttf");
      loadPdf.registerFontkit(fontkit);
      const customFont = await loadPdf.embedFont(fileData);
      const textHeight = customFont.heightAtSize(sh12);
      const whiteImage = await loadPdf.embedPng(Base64.background.white);
      const signatureImage = await loadPdf.embedPng(value);
      const pages = loadPdf.getPages();
      const selectedPage = pages[numberOfPdfPages - 1];
      const { height } = selectedPage.getSize();
      const position = { x: 0, y: 0 };
      const textPosition = { x: 0, y: 0 };
      if (signer === 0) {
        position.x = adviserSignPosition.x;
        position.y = adviserSignPosition.y;
        if (principalSignature === "") {
          textPosition.x = principalSignPosition.x;
          textPosition.y = principalSignPosition.y;
          selectedPage.moveTo(principalSignPosition.x, height - principalSignPosition.y + sh30);
          selectedPage.drawImage(whiteImage, {
            height: sh40,
            opacity: 1,
            width: sw180,
            x: principalSignPosition.x,
            y: height - principalSignPosition.y,
          });
        } else if (accountType === "Joint" && jointSignature === "") {
          textPosition.x = jointSignPosition.x;
          textPosition.y = jointSignPosition.y;
          selectedPage.drawImage(whiteImage, {
            height: sh40,
            opacity: 1,
            width: sw180,
            x: jointSignPosition.x,
            y: height - jointSignPosition.y,
          });
          selectedPage.moveTo(jointSignPosition.x, height - jointSignPosition.y + sh30);
        }
      } else if (signer === 1) {
        position.x = principalSignPosition.x;
        position.y = principalSignPosition.y;
        if (adviserSignature === "") {
          textPosition.x = adviserSignPosition.x;
          textPosition.y = adviserSignPosition.y;
          selectedPage.drawImage(whiteImage, {
            height: sh40,
            opacity: 1,
            width: sw180,
            x: adviserSignPosition.x,
            y: height - adviserSignPosition.y,
          });
          selectedPage.moveTo(adviserSignPosition.x, height - adviserSignPosition.y + sh30);
        } else if (accountType === "Joint" && jointSignature === "") {
          textPosition.x = jointSignPosition.x;
          textPosition.y = jointSignPosition.y;
          selectedPage.drawImage(whiteImage, {
            height: sh40,
            opacity: 1,
            width: sw180,
            x: jointSignPosition.x,
            y: height - jointSignPosition.y,
          });
          selectedPage.moveTo(jointSignPosition.x, height - jointSignPosition.y + sh30);
        }
      } else if (signer === 2) {
        position.x = jointSignPosition.x;
        position.y = jointSignPosition.y;
        if (adviserSignature === "") {
          textPosition.x = adviserSignPosition.x;
          textPosition.y = adviserSignPosition.y;
          selectedPage.drawImage(whiteImage, {
            height: sh40,
            opacity: 1,
            width: sw180,
            x: adviserSignPosition.x,
            y: height - adviserSignPosition.y,
          });
          selectedPage.moveTo(adviserSignPosition.x, height - adviserSignPosition.y + sh30);
        } else if (principalSignature === "") {
          textPosition.x = principalSignPosition.x;
          textPosition.y = principalSignPosition.y;
          selectedPage.drawImage(whiteImage, {
            height: sh40,
            opacity: 1,
            width: sw180,
            x: principalSignPosition.x,
            y: height - principalSignPosition.y,
          });
          selectedPage.moveTo(principalSignPosition.x, height - principalSignPosition.y + sh30);
        }
      }
      const svgPath = [
        "M772.378 753.020h-487.099c-31.605 0-57.306-25.702-57.306-57.306s25.702-57.306 57.306-57.306h57.306c15.816 0 28.653-12.834 28.653-28.651s-12.837-28.655-28.653-28.655h-57.306c-63.209 0-114.612 51.405-114.612 114.611 0 63.211 51.403 114.611 114.612 114.611h487.099c15.817 0 28.655-12.834 28.655-28.651s-12.838-28.655-28.655-28.655z",
        "M821.312 245.708c-42.752-42.693-112.32-42.75-155.157 0l-43.84 43.84c-0.542 0.459-1.203 0.631-1.715 1.146-0.516 0.516-0.691 1.175-1.148 1.719l-147.017 147.016c-28.309 28.369-43.9 66.074-43.9 106.163v64.179c0 15.817 12.838 28.655 28.655 28.655h64.183c40.085 0 77.79-15.586 106.214-43.925l193.694-193.694c42.722-42.75 42.722-112.349 0.030-155.099zM587.102 553.954c-17.562 17.51-40.917 27.166-65.728 27.166h-35.533v-35.529c0-24.815 9.655-48.166 27.136-65.702l128.162-128.166 74.099 74.096-128.137 128.135zM780.766 360.291l-25.011 25.014-74.099-74.096 24.986-24.985c20.429-20.401 53.696-20.372 74.095 0 20.403 20.429 20.403 53.666 0.030 74.067z",
      ];
      selectedPage.drawSvgPath(svgPath[0], { color: rgb(0, 0.537, 0.925), scale: 0.02 });
      selectedPage.drawSvgPath(svgPath[1], { color: rgb(0, 0.537, 0.925), scale: 0.02 });
      selectedPage.drawText("Sign Document Now", {
        x: textPosition.x + sw25,
        y: height - textPosition.y + sh15,
        size: textHeight,
        font: customFont,
        color: rgb(0, 0.537, 0.925),
      });
      selectedPage.drawImage(whiteImage, {
        height: sh40,
        opacity: 1,
        width: sw180,
        x: position.x,
        y: height - position.y,
      });
      if (Platform.OS === "ios") {
        selectedPage.drawImage(signatureImage, {
          height: sh40,
          width: sw180,
          x: position.x,
          y: height - position.y,
        });
      } else {
        selectedPage.drawImage(signatureImage, {
          height: sh100,
          width: sw200,
          x: (selectedPage.getWidth() * position.x) / Dimensions.get("window").width,
          y: selectedPage.getHeight() - (selectedPage.getHeight() * position.y) / Dimensions.get("window").height - sh25,
        });
      }
      const pdfBytes = await loadPdf.save();
      const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
      const selectedPdf = {
        base64: pdfBase64,
        date: moment().toString(),
        name: currentPdf.pdf.name,
        type: "application/pdf",
      };
      setCurrentPdf({ ...currentPdf, pdf: selectedPdf });
    }
  };

  const calculatePosition = (locationX?: number, positionY?: number) => {
    let coordinateX: number = 0;
    let coordinateY: number = 0;
    if (locationX !== undefined && positionY !== undefined) {
      coordinateX = locationX;
      coordinateY = positionY;
    }
    if (coordinateY > sh90 && coordinateY < sh220) {
      if (coordinateX < sw245 && coordinateX > 0) {
        setSigner(0);
      } else if (coordinateX > sw245 && coordinateX < sw470) {
        setSigner(1);
      }
      setShowSignPdf(true);
    } else if (coordinateX < sw245 && coordinateY > sh220 && coordinateY < sh370) {
      setSigner(2);
      setShowSignPdf(true);
    }
  };

  const handlePosition = (e: GestureResponderEvent) => {
    const { locationY, locationX } = e.nativeEvent;
    const positionY = locationY - (numberOfPdfPages - 1) * 800;
    calculatePosition(locationX, positionY);
  };

  const handleBack = async () => {
    const orderNo = currentPdf.pdf.name.slice(0, -4);
    const accountTypeCheck = accountType === "Joint" ? jointSignature !== "" : true;
    const newData: PdfWithSignature = {
      orderNo: orderNo,
      pdf: currentPdf.pdf,
      active: true,
      principalSignature: principalSignature !== "" ? principalSignature : pdfList[currentPdf.index].principalSignature,
      adviserSignature: adviserSignature !== "" ? adviserSignature : pdfList[currentPdf.index].adviserSignature,
    };
    if (accountTypeCheck) {
      newData.jointSignature = jointSignature !== "" ? jointSignature : pdfList[currentPdf.index].jointSignature;
    }
    const completed =
      accountType === "Individual"
        ? adviserSignature !== "" && principalSignature !== ""
        : adviserSignature !== "" && principalSignature !== "" && jointSignature !== "";
    if (pdfList !== undefined) {
      const dataClone = [...pdfList];
      dataClone[currentPdf.index] = { ...dataClone[currentPdf.index], ...newData };
      if (currentPdf.index + 1 < pdfList.length) {
        dataClone[currentPdf.index + 1] = { ...pdfList[currentPdf.index + 1], active: completed, completed: completed };
      }
      setPdfList(dataClone);
    } else {
      setPdfList([newData]);
    }
    setPage(1);
  };

  const handleConfirm = () => {
    if (showSignPdf === true) {
      setTimeout(() => {
        if (signer === 0) {
          if (principalSignature === "") {
            setSigner(1);
          } else if (principalSignature !== "" && accountType === "Joint") {
            setSigner(2);
          } else {
            setShowSignPdf(false);
          }
        } else if (signer === 1) {
          if (adviserSignature === "") {
            setSigner(0);
          } else if (adviserSignature !== "" && accountType === "Joint" && jointSignature === "") {
            setSigner(2);
          } else {
            setShowSignPdf(false);
          }
        } else if (signer === 2) {
          if (adviserSignature === "") {
            setSigner(0);
          } else if (principalSignature === "") {
            setSigner(1);
          } else {
            setShowSignPdf(false);
          }
        }
      }, 1000);
    } else {
      setShowSignPdf(true);
    }
  };

  const handleClose = () => {
    setShowSignPdf(false);
  };

  const handleSignature = (value: string) => {
    if (signer === 0) {
      setAdviserSignature(value);
    } else if (signer === 1) {
      setPrincipalSignature(value);
    } else if (signer === 2) {
      setJointSignature(value);
    }
    modifyPdf(value);
  };

  const handleScroll = () => {
    if (scrollRef !== null) {
      scrollRef.scrollToEnd();
      if (signer === undefined) {
        if (adviserSignature === "") {
          setSigner(0);
        } else if (principalSignature === "") {
          setSigner(1);
        } else {
          setSigner(2);
        }
      } else {
        setTimeout(() => {
          setShowSignPdf(true);
        }, 1000);
      }
    }
  };

  let signerLabel = "";
  let signatureToDisplay = "";
  if (signer !== undefined) {
    switch (signer) {
      case 0:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        signatureToDisplay = adviserSignature;
        break;
      case 1:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_PRINCIPAL_SIGNATURE;
        signatureToDisplay = principalSignature;
        break;
      case 2:
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
  const toolTipStyle: ViewStyle = { ...absolutePosition, zIndex: 1, top: -25, width: sw84 };
  const toolTipLabelStyle: ViewStyle = {
    ...centerHV,
    position: "absolute",
    backgroundColor: colorWhite._1,
    left: sw1,
    right: sw1,
    width: sw82,
    height: sh26,
    borderRadius: sw8,
    top: 1,
  };

  useEffect(() => {
    const calculatePages = async () => {
      if (currentPdf !== undefined) {
        const dataUri = GetEmbeddedBase64(currentPdf.pdf);
        const loadPdf = await PDFDocument.load(dataUri);
        const pages = loadPdf.getPages().length;
        setNumberOfPdfPages(pages);
      }
    };
    if (pdfList[currentPdf.index].adviserSignature !== "") {
      setAdviserSignature(pdfList[currentPdf.index].adviserSignature);
    }
    if (pdfList[currentPdf.index].principalSignature !== "") {
      setPrincipalSignature(pdfList[currentPdf.index].principalSignature);
    }
    if (pdfList[currentPdf.index].jointSignature !== "") {
      setJointSignature(pdfList[currentPdf.index].jointSignature!);
    }
    calculatePages();
  }, [currentPdf, pdfList]);

  useEffect(() => {
    if (signer !== undefined) {
      setTimeout(() => {
        calculatePosition();
        setShowSignPdf(true);
      }, 1000);
    }
  }, [signer]);

  return (
    <View style={flexChild}>
      <View style={flexRow}>
        <View>
          <ScrollView
            ref={setScrollRef}
            contentContainerStyle={flexGrow}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
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
              <CustomSpacer isHorizontal={true} space={sw145} />
            </View>
          </ScrollView>
        </View>
        <View>
          <View style={{ ...absolutePosition, top: sh132 }}>
            <View style={toolTipStyle}>
              <View style={toolTipLabelStyle}>
                <Text style={{ ...fs12RegBlue1 }}>{TERMS_AND_CONDITIONS.LABEL_ADD_SIGN}</Text>
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
        </View>
      </View>

      <SignatureModal
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleSignature={handleSignature}
        signature={signatureToDisplay}
        title={signerLabel}
        visible={showSignPdf}
      />
    </View>
  );
};

export const EditPdf = connect(ClientMapStateToProps, ClientMapDispatchToProps)(EditPdfComponent);
