import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import {
  ConfirmationModal,
  CustomFlexSpacer,
  CustomSpacer,
  CustomToast,
  CustomTooltip,
  SafeAreaPage,
  TextSpaceArea,
} from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { DICTIONARY_EPF_AGE } from "../../../../data/dictionary";
import { IData, useUndoDelete } from "../../../../hooks";
import { IcoMoon } from "../../../../icons";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../store";
import {
  border,
  borderBottomBlue4,
  centerHV,
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs12RegGray5,
  fs12RegWhite1,
  fs14BoldBlack2,
  fs14RegGray5,
  fs16RegGray6,
  fs18BoldGray6,
  px,
  py,
  rowCenterVertical,
  sh11,
  sh12,
  sh120,
  sh16,
  sh20,
  sh24,
  sh4,
  sh40,
  sh6,
  shadow4Blue008,
  sw1,
  sw10,
  sw100,
  sw14,
  sw16,
  sw24,
  sw240,
  sw32,
  sw4,
  sw760,
  sw8,
} from "../../../../styles";
import { Investment, ProductsBanner } from "../../../../templates";
import { checkBankValidation, checkLocalBankPartial, getInitialBankState, isNotEmpty } from "../../../../utils";

const { ACTION_BUTTONS, INVESTMENT } = Language.PAGE;

export interface ProductConfirmationProps extends ProductsStoreProps, OnboardingContentProps {
  handleNextStep: (step: TypeOnboardingRoute) => void;
  navigation: IStackNavigationProp;
  route: string;
}

export const ProductConfirmationComponent: FunctionComponent<ProductConfirmationProps> = ({
  accountType,
  addInvestmentDetails: setInvestmentDetails,
  addPersonalInfo,
  addSelectedFund: setSelectedFund,
  client,
  global,
  handleNextStep,
  investmentDetails,
  onboarding,
  personalInfo,
  selectedFunds,
  updateOnboarding,
}: ProductConfirmationProps) => {
  const { agent: agentCategory, isMultiUtmc: multiUtmc } = global;
  const { joint } = personalInfo;
  const jointDOB = joint?.personalDetails?.dateOfBirth;
  const { disabledSteps, finishedSteps } = onboarding;
  const { details } = client;
  const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = accountType === "Individual" && principalClientAge < DICTIONARY_EPF_AGE;
  const flatListRef = useRef<FlatList | null>(null);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleUpdateInvestment = (value: IData<IProductSales>[] | undefined) => {
    if (value !== undefined) {
      const restoredDetails = investmentDetails !== undefined ? [...investmentDetails] : [];
      // restore investment details
      // last item item added will be the first item to undo, LIFO
      value.reverse().forEach((item) => {
        restoredDetails.splice(item.index, 0, item.deletedData);
      });
      setInvestmentDetails(restoredDetails);

      // restore fund details
      const updatedProducts = restoredDetails!.map((eachInvestment: IProductSales) => eachInvestment.fundDetails);
      setSelectedFund(updatedProducts);
    }
  };

  const [deleteCount, setDeleteCount, tempData, setTempData, handleUndoDelete] = useUndoDelete<IProductSales>(handleUpdateInvestment);

  const handleConfirmIdentity = () => {
    const epfInvestments = investmentDetails!
      .filter(({ investment }) => investment.fundPaymentMethod === "EPF")
      .map((epfInvestment) => epfInvestment.fundDetails.isSyariah);
    const epfShariah = epfInvestments.includes("Yes");
    const allEpf = epfInvestments.length === investmentDetails!.length;
    const epfObject =
      epfInvestments.length > 0 ? { epfInvestment: true, epfShariah: epfShariah } : { epfInvestment: false, epfShariah: epfShariah };

    // dynamically reset EPF details when the Funding Option was changed
    const resetEpfDetails =
      epfInvestments.length === 0
        ? {
            epfDetails: {
              epfAccountType: "Conventional",
              epfMemberNumber: "",
            },
          }
        : {};

    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];

    // add to disabledSteps
    // currently, whenever they confirm their investment again, they will be forced to go through each Personal Information step, we also disabled PersonalInfoSummary
    if (updatedDisabledSteps.includes("PersonalInfoSummary") === false) {
      updatedDisabledSteps.push("PersonalInfoSummary");
    }

    // add to finishedSteps
    if (updatedFinishedSteps.includes("Products") === false) {
      updatedFinishedSteps.push("Products");
    }
    if (updatedFinishedSteps.includes("ProductsConfirmation") === false) {
      updatedFinishedSteps.push("ProductsConfirmation");
    }

    // remove from disabledSteps
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts !== -1) {
      updatedDisabledSteps.splice(findProducts, 1);
    }
    const findConfirmation = updatedDisabledSteps.indexOf("ProductsConfirmation");
    if (findConfirmation !== -1) {
      updatedDisabledSteps.splice(findConfirmation, 1);
    }

    // remove from disabledSteps (next step)
    const findPersonalInfo = updatedDisabledSteps.indexOf("PersonalInformation");
    if (findPersonalInfo !== -1) {
      updatedDisabledSteps.splice(findPersonalInfo, 1);
    }

    const checkJoint =
      accountType === "Joint" && moment().diff(moment(jointDOB), "years") < 18
        ? {
            ...joint,
            employmentDetails: {
              ...joint?.employmentDetails,
              isEnabled: false,
            },
          }
        : { ...joint };
    const updatedLocalBankDetails: IBankDetailsState[] =
      personalInfo.principal!.bankSummary!.localBank!.length > 0
        ? personalInfo.principal!.bankSummary!.localBank!.map((eachLocalBank: IBankDetailsState) => {
            return {
              ...eachLocalBank,
              bankAccountName: accountType === "Individual" ? details?.principalHolder?.name : "",
            };
          })
        : [];
    const updateEpfLocalBankDetails: IBankDetailsState[] =
      allEpf === true &&
      checkLocalBankPartial(personalInfo.principal?.bankSummary?.localBank!) &&
      checkBankValidation(personalInfo.principal?.bankSummary?.localBank!, "local") === true
        ? ([getInitialBankState("local", details?.principalHolder!.name)] as IBankDetailsState[])
        : updatedLocalBankDetails;
    const updateForeignBankDetails = allEpf === true ? [] : personalInfo.principal?.bankSummary?.foreignBank;

    addPersonalInfo({
      ...personalInfo,
      ...epfObject,
      principal: {
        ...personalInfo.principal,
        // employmentDetails: { ...personalInfo.principal?.employmentDetails },
        ...resetEpfDetails,
        bankSummary: {
          ...personalInfo.principal?.bankSummary,
          localBank: updateEpfLocalBankDetails,
          foreignBank: updateForeignBankDetails,
        },
      },
      joint: checkJoint,
      ...epfObject,
      editPersonal: false,
      isAllEpf: allEpf,
      editMode: false,
    });

    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });

    // TODO dynamic change for EP and Bank Currency
    const route: TypeOnboardingKey = finishedSteps.includes("EmailVerification") ? "IdentityVerification" : "EmailVerification";
    handleNextStep(route);
  };

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

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleDeleteLastFund = () => {
    setSelectedFund([]);
    setInvestmentDetails([]);
  };

  const handleBackToListing = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];

    // add to disabledSteps
    if (updatedDisabledSteps.includes("ProductsConfirmation") === false) {
      updatedDisabledSteps.push("ProductsConfirmation");
    }

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });

    handleNextStep("ProductsList");
  };

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
      const checkMultipleUtmc =
        multiUtmc === true && eachDetails.fundDetails.masterList.map((eachMaster) => eachMaster.isEpf).includes("Yes") ? true : checkData;
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

  const lastFundName =
    investmentDetails !== undefined && investmentDetails.length > 0 && investmentDetails !== undefined
      ? investmentDetails[0].fundDetails.fundName
      : "";
  const checkRecurring = investmentDetails
    ?.map((eachInvestment: IProductSales) => eachInvestment.investment.scheduledInvestment)
    .includes(true);

  const recurringContentOptions = [INVESTMENT.LABEL_RECURRING_CONTENT_1, INVESTMENT.LABEL_RECURRING_CONTENT_2];

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

  return (
    <Fragment>
      <SafeAreaPage>
        <View style={{ ...px(sw16), ...flexChild }}>
          <FlatList
            data={investmentDetails}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item: IProductSales) => item.fundDetails.fundCode}
            ListHeaderComponent={
              <View style={px(sw8)}>
                <TextSpaceArea text={INVESTMENT.HEADING} style={fs18BoldGray6} spaceToBottom={sh4} spaceToTop={sh40} />
                <View style={rowCenterVertical}>
                  <TextSpaceArea text={INVESTMENT.SUBHEADING} style={fs14RegGray5} />
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  {multiUtmc === false ? (
                    <CustomTooltip
                      arrowSize={{ width: sw10, height: sh6 }}
                      content={<Text style={fs12RegWhite1}>{INVESTMENT.LABEL_MULTIPLE_UTMC}</Text>}
                      contentStyle={{ width: sw240 }}
                      theme="dark"
                    />
                  ) : null}
                </View>
                <CustomSpacer space={sh24} />
              </View>
            }
            ListFooterComponent={
              <Fragment>
                {checkRecurring === true ? (
                  <Fragment>
                    <CustomSpacer space={sh24} />
                    <View style={{ ...border(colorBlue._9, sw1, sw8), ...px(sw24), ...py(sh16), marginLeft: sw8, marginRight: sw8 }}>
                      <View style={flexRow}>
                        <View style={{ ...centerHV, height: sh20 }}>
                          <View style={{ width: sw14, height: sw14, ...centerHV, borderRadius: sw100, backgroundColor: colorBlue._1 }}>
                            <Text style={{ fontSize: sh11, color: colorWhite._1 }}>i</Text>
                          </View>
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <View>
                          <Text style={fs14BoldBlack2}>{INVESTMENT.LABEL_RECURRING_CONTENT_TITLE}</Text>
                          <CustomSpacer space={sh4} />
                          {recurringContentOptions.map((eachContent: string, eachIndex: number) => {
                            return (
                              <View key={eachIndex} style={{ ...flexRow, maxWidth: sw760 }}>
                                <CustomSpacer isHorizontal={true} space={sw4} />
                                <Text style={fs12RegGray5}>{eachIndex + 1}. </Text>
                                <Text style={fs12RegGray5}>{eachContent} </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </Fragment>
                ) : null}
                <CustomSpacer space={sh120} />
              </Fragment>
            }
            ref={flatListRef}
            renderItem={({ item, index }) => {
              const { fundName, issuingHouse } = item.fundDetails;
              // const type = prsType === "prsDefault" ? "PRS DEFAULT" : fundType;
              const newData = investmentDetails !== undefined ? [...investmentDetails] : [];

              const handleDelete = () => {
                if (investmentDetails !== undefined && investmentDetails.length > 1) {
                  let updatedDetails = [...investmentDetails];
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
                  const updatedProducts = updatedDetails.map((eachTempInvestment: IProductSales) => eachTempInvestment.fundDetails);
                  setSelectedFund(updatedProducts);
                  const updatedTemp = tempData !== undefined ? tempData : [];
                  setTempData([...updatedTemp, { index: index, deletedData: investmentDetails[index] }]);
                  setInvestmentDetails(updatedDetails);
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
                ...shadow4Blue008,
                borderColor: colorGray._2,
                borderWidth: sw1,
                backgroundColor: colorWhite._1,
                borderRadius: sw8,
                marginHorizontal: sw8,
              };

              return (
                <Fragment key={index}>
                  {index === 0 ? null : <CustomSpacer space={sh24} />}
                  {index <= checkIndex ? (
                    <Fragment>
                      <View style={{ ...flexRow, ...centerVertical, ...px(sw8) }}>
                        <IcoMoon name="house" size={sw16} color={colorBlack._2} />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs14BoldBlack2}>{item.fundDetails.issuingHouse}</Text>
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
                      <View style={rowCenterVertical}>
                        <Text style={fs14BoldBlack2}>{fundName}</Text>
                        <CustomFlexSpacer />
                        <IcoMoon name="trash" color={colorBlue._1} onPress={handleDelete} size={sw24} suppressHighlighting={true} />
                      </View>
                    </View>
                    <CustomSpacer space={sh16} />
                    <Investment
                      accountType={accountType!}
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
          <ProductsBanner
            cancelOnPress={handleBackToListing}
            continueDisabled={disableContinue !== undefined}
            selectedFunds={selectedFunds}
            labelSubmit={INVESTMENT.BUTTON_NEXT}
            submitOnPress={handleConfirmIdentity}
            label={INVESTMENT.LABEL_SUMMARY}
          />
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
