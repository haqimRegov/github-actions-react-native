import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import {
  ConfirmationModal,
  CustomFlexSpacer,
  CustomSpacer,
  CustomToast,
  LabeledTitle,
  SafeAreaPage,
  SelectionBanner,
} from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { useDelete } from "../../../hooks";
import { IcoMoon } from "../../../icons";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import {
  borderBottomBlue4,
  centerVertical,
  colorBlack,
  colorBlue,
  colorWhite,
  flexChild,
  flexCol,
  flexRow,
  fs14BoldBlack2,
  fs16BoldBlack2,
  fs16BoldGray6,
  fs16RegGray5,
  fs16RegGray6,
  fs18BoldGray6,
  px,
  py,
  sh12,
  sh16,
  sh176,
  sh24,
  sh32,
  sh4,
  sh40,
  shadow4Blue116,
  sw16,
  sw24,
  sw32,
  sw4,
  sw8,
} from "../../../styles";
import { isNotEmpty, titleCaseString } from "../../../utils";
import { Investment } from "./Investment";

const { ACTION_BUTTONS, INVESTMENT } = Language.PAGE;

export interface ProductConfirmationProps extends ProductsStoreProps, NewSalesContentProps {
  handleNextStep: (step: TypeNewSalesRoute) => void;
  navigation: IStackNavigationProp;
  route: string;
}

export const ProductConfirmationComponent: FunctionComponent<ProductConfirmationProps> = ({
  accountType,
  addInvestmentDetails: setInvestmentDetails,
  addPersonalInfo,
  addSelectedFund: setSelectedFund,
  details,
  global,
  handleNextStep,
  investmentDetails,
  newSales,
  selectedFunds,
  updateNewSales,
}: ProductConfirmationProps) => {
  const { agent: agentCategory, isMultiUtmc: multiUtmc } = global;
  const { disabledSteps, finishedSteps } = newSales;
  const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = true;
  const flatListRef = useRef<FlatList | null>(null);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IProductSales[]>(investmentDetails!, setInvestmentDetails);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleScrollToFund = () => {
    const findIndex = isNotEmpty(investmentDetails)
      ? investmentDetails!.findIndex(
          (eachInvestment: IProductSales) => eachInvestment.allowEpf === true && eachInvestment.investment.fundPaymentMethod === "EPF",
        )
      : -1;
    if (flatListRef.current !== null && findIndex !== -1) {
      flatListRef.current?.scrollToIndex({ animated: true, index: findIndex, viewPosition: 0 });
    }
  };

  const handleUndoDelete = () => {
    const updatedProducts = investmentDetails!.map((eachInvestment: IProductSales) => eachInvestment.fundDetails);
    setSelectedFund(updatedProducts);
    setTempData(investmentDetails!);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleDeleteLastFund = () => {
    setSelectedFund([]);
    setInvestmentDetails([]);
  };

  const handleBackToListing = () => {
    handleNextStep("ProductsList");
  };

  const handleConfirmIdentity = () => {
    const epfInvestments = investmentDetails!
      .filter(({ investment }) => investment.fundPaymentMethod === "EPF")
      .map((epfInvestment) => epfInvestment.fundDetails.isSyariah);
    const epfShariah = epfInvestments.includes("Yes");
    const allEpf = epfInvestments.length === investmentDetails!.length;
    const epfObject =
      epfInvestments.length > 0 ? { epfInvestment: true, epfShariah: epfShariah } : { epfInvestment: false, epfShariah: epfShariah };
    addPersonalInfo({ ...epfObject, editPersonal: false, isAllEpf: allEpf });
    handleNextStep("IdentityVerification");
    const updatedFinishedSteps: TypeNewSalesKey[] =
      epfInvestments.length === 0 || disabledSteps.includes("IdentityVerification")
        ? ["RiskAssessment", "ProductsList", "ProductsConfirmation"]
        : [...finishedSteps, "ProductsList", "ProductsConfirmation"];
    const updatedDisabledSteps: TypeNewSalesKey[] =
      epfInvestments.length === 0 || disabledSteps.includes("IdentityVerification")
        ? [
            "IdentityVerification",
            "AdditionalDetails",
            "Summary",
            "OrderPreview",
            "Acknowledgement",
            "TermsAndConditions",
            "Signatures",
            "Payment",
          ]
        : [...disabledSteps];
    // if (disabledSteps.includes("EmailVerification")) {
    //   updatedFinishedSteps.push("EmailVerification");
    //   updatedDisabledSteps.push("EmailVerification");
    // }
    // const findPersonalInfo = updatedDisabledSteps.indexOf("PersonalInformation");
    // if (findPersonalInfo !== -1) {
    //   updatedDisabledSteps.splice(findPersonalInfo, 1);
    // }
    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  let utCount = 0;
  let prsCount = 0;
  let ampCount = 0;
  selectedFunds.forEach((fund: IProduct) => {
    if (fund.fundType === "UT" || fund.fundType === "UTF" || fund.fundType === "WSF") {
      utCount += 1;
    } else if (fund.fundType === "PRS") {
      prsCount += 1;
    } else if (fund.fundType === "AMP") {
      ampCount += 1;
    }
  });

  const utSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ", " : "";
  const prsSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const prsPrefix = prsCount > 0 && utCount > 0 && ampCount === 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const ampPrefix =
    (ampCount > 0 && utCount > 0 && prsCount === 0) || (ampCount > 0 && prsCount > 0 && utCount === 0) ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const utLabel = utCount > 0 ? `${utCount} ${INVESTMENT.LABEL_UT}` : "";
  const prsLabel = prsCount > 0 ? `${prsCount} ${INVESTMENT.LABEL_PRS}` : "";
  const ampLabel = ampCount > 0 ? `${ampCount} ${INVESTMENT.LABEL_AMP}` : "";

  const bannerText = `${utLabel}${utSuffix}${prsPrefix}${prsLabel}${prsSuffix}${ampPrefix}${ampLabel}`;

  const disableContinue = investmentDetails?.find(({ investment }) => {
    return (
      investment.investmentAmount === "" ||
      investment.investmentSalesCharge === "" ||
      (investment.scheduledInvestment === true && investment.scheduledInvestmentAmount === "") ||
      (investment.scheduledInvestment === true && investment.scheduledSalesCharge === "") ||
      investment.amountError !== undefined ||
      investment.scheduledAmountError !== undefined ||
      investment.investmentSalesChargeError !== undefined ||
      investment.scheduledSalesChargeError !== undefined
    );
  });

  useEffect(() => {
    const handleKeyboardShow = () => {
      setFixedBottomShow(false);
    };

    const handleKeyboardHide = () => {
      setFixedBottomShow(true);
    };

    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [setFixedBottomShow]);

  useEffect(() => {
    const updatedProducts = investmentDetails!.map((eachInvestment: IProductSales) => eachInvestment.fundDetails);
    setSelectedFund(updatedProducts);
    setTempData(investmentDetails!);
    if (investmentDetails?.length === 0) {
      handleNextStep("ProductsList");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investmentDetails]);

  useEffect(() => {
    const findEpfIndex = investmentDetails!.findIndex(
      (eachNewInvestment: IProductSales) => eachNewInvestment.investment.fundPaymentMethod === "EPF",
    );
    const updatedInvestmentDetails: IProductSales[] = investmentDetails!.map((eachDetails: IProductSales) => {
      const checkData =
        findEpfIndex !== -1 ? eachDetails.fundDetails.issuingHouse === investmentDetails![findEpfIndex].fundDetails.issuingHouse : true;
      const checkMultipleUtmc = multiUtmc === true && eachDetails.fundDetails.isEpf ? true : checkData;
      const checkFundPaymentMethod = checkMultipleUtmc === false ? "Cash" : eachDetails.investment.fundPaymentMethod;
      return {
        ...eachDetails,
        allowEpf: checkMultipleUtmc,
        investment: {
          ...eachDetails.investment,
          fundPaymentMethod: checkFundPaymentMethod,
        },
      };
    });
    setInvestmentDetails(updatedInvestmentDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastFundName = tempData !== undefined && tempData.length > 0 && tempData !== undefined ? tempData[0].fundDetails.fundName : "";

  return (
    <Fragment>
      <SafeAreaPage>
        <View style={{ ...px(sw16), ...flexChild }}>
          <FlatList
            data={tempData}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item: IProductSales) => item.fundDetails.fundCode}
            ListHeaderComponent={
              <Fragment>
                <View style={px(sw8)}>
                  <CustomSpacer space={sh32} />
                  <LabeledTitle
                    label={INVESTMENT.HEADING}
                    labelStyle={fs18BoldGray6}
                    spaceToLabel={sh4}
                    title={INVESTMENT.SUBHEADING}
                    titleStyle={fs16RegGray5}
                  />
                  {multiUtmc === false ? <Text style={fs16RegGray5}>{INVESTMENT.LABEL_MULTIPLE_UTMC}</Text> : null}
                  <CustomSpacer space={sh24} />
                </View>
              </Fragment>
            }
            ListFooterComponent={<CustomSpacer space={sh176} />}
            ref={flatListRef}
            renderItem={({ item, index }) => {
              const { fundType, fundName, issuingHouse, prsType } = item.fundDetails;
              const type = prsType === "prsDefault" ? "PRS DEFAULT" : fundType;
              const newData = tempData !== undefined ? [...tempData] : [];

              const handleDelete = () => {
                if (tempData !== undefined && tempData.length > 1) {
                  let updatedDetails = [...tempData];
                  updatedDetails.splice(index, 1);
                  if (multiUtmc === false) {
                    const findEpfIndex = updatedDetails.findIndex(
                      (eachNewData: IProductSales) => eachNewData.investment.fundPaymentMethod === "EPF",
                    );
                    updatedDetails = updatedDetails.map((eachData) => {
                      return {
                        ...eachData,
                        allowEpf:
                          findEpfIndex !== -1 ? eachData.fundDetails.issuingHouse === newData[findEpfIndex].fundDetails.issuingHouse : true,
                      };
                    });
                  }
                  setTempData(updatedDetails);
                  const updatedProducts = updatedDetails.map((eachTempInvestment: IProductSales) => eachTempInvestment.fundDetails);
                  setSelectedFund(updatedProducts);
                  setDeleteCount(deleteCount + 1);
                } else {
                  setShowModal(true);
                }
              };

              const updateData = (updatedData: IProductSales) => {
                newData[index] = updatedData;
                let data: IProductSales[] = [...newData];
                if (multiUtmc === false) {
                  const findEpfIndex = newData.findIndex(
                    (eachNewData: IProductSales) => eachNewData.investment.fundPaymentMethod === "EPF",
                  );
                  data = newData.map((eachData) => {
                    return {
                      ...eachData,
                      allowEpf:
                        findEpfIndex !== -1 ? eachData.fundDetails.issuingHouse === newData[findEpfIndex].fundDetails.issuingHouse : true,
                    };
                  });
                }
                setInvestmentDetails(data);
              };

              const checkIndex = investmentDetails!.findIndex(
                (eachInvestment: IProductSales) => eachInvestment.fundDetails.issuingHouse === issuingHouse,
              );

              const container: ViewStyle = {
                ...flexChild,
                ...shadow4Blue116,
                backgroundColor: colorWhite._1,
                borderRadius: sw8,
                marginHorizontal: sw8,
              };

              return (
                <Fragment key={index}>
                  {index === 0 ? null : <CustomSpacer space={sh24} />}
                  {index <= checkIndex ? (
                    <Fragment>
                      {index !== 0 ? <CustomSpacer space={sh40} /> : null}
                      <View style={{ ...flexRow, ...centerVertical, ...px(sw8) }}>
                        <IcoMoon name="house" size={sw16} color={colorBlack._2} />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs16BoldBlack2}>{titleCaseString(item.fundDetails.issuingHouse)}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={flexChild}>
                          <View style={borderBottomBlue4} />
                        </View>
                      </View>
                      <CustomSpacer space={sh16} />
                    </Fragment>
                  ) : null}
                  <View style={container}>
                    <View
                      style={{
                        ...px(sw32),
                        ...py(sh12),
                        backgroundColor: colorBlue._3,
                        borderTopLeftRadius: sw8,
                        borderTopRightRadius: sw8,
                      }}>
                      <View style={{ ...centerVertical, ...flexRow }}>
                        <View>
                          <Text style={fs14BoldBlack2}>{fundName}</Text>
                        </View>
                        <CustomFlexSpacer />
                        <IcoMoon name="trash" color={colorBlue._1} onPress={handleDelete} size={sw24} suppressHighlighting={true} />
                      </View>
                    </View>
                    <CustomSpacer space={sh24} />
                    <Investment
                      accountType={accountType}
                      agentCategory={agentCategory!.category!}
                      data={item}
                      handleScrollToFund={handleScrollToFund}
                      setData={updateData}
                      withEpf={withEpf}
                    />
                  </View>
                </Fragment>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <CustomToast count={deleteCount} isDeleteToast={true} onPress={handleUndoDelete} setCount={setDeleteCount} />
        {fixedBottomShow === true && selectedFunds.length !== 0 ? (
          <View style={flexCol}>
            <SelectionBanner
              bottomContent={
                <View style={flexRow}>
                  <Text style={fs16BoldGray6}>{bannerText}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={fs16RegGray6}>{INVESTMENT.LABEL_SELECTED}</Text>
                </View>
              }
              cancelOnPress={handleBackToListing}
              continueDisabled={disableContinue !== undefined}
              labelCancel={INVESTMENT.BUTTON_CANCEL}
              labelSubmit={INVESTMENT.BUTTON_NEXT}
              submitOnPress={handleConfirmIdentity}
              label={INVESTMENT.HEADING}
            />
          </View>
        ) : null}
      </SafeAreaPage>
      <ConfirmationModal
        handleCancel={handleCancelDelete}
        handleContinue={handleDeleteLastFund}
        labelCancel={ACTION_BUTTONS.BUTTON_CANCEL}
        labelContinue={ACTION_BUTTONS.BUTTON_DELETE}
        title={`${ACTION_BUTTONS.BUTTON_DELETE} ${lastFundName}`}
        visible={showModal}>
        <View>
          <Text style={fs16RegGray6}>{INVESTMENT.DELETE_MODAL_LINE_1}</Text>
          <CustomSpacer space={sh16} />
          <Text style={fs16RegGray6}>{INVESTMENT.DELETE_MODAL_LINE_2}</Text>
        </View>
      </ConfirmationModal>
    </Fragment>
  );
};

export const ProductConfirmation = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductConfirmationComponent);
