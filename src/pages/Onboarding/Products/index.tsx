import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal, RadioButtonGroup, SelectionBanner } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_EPF_AGE } from "../../../data/dictionary";
import { RNShareApi } from "../../../integrations";
import { SAMPLE_PDF_1 } from "../../../mocks";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import { alignSelfStart, flexChild, flexCol, fs16BoldBlack2, fs16SemiBoldBlack2, sh24, sh4, sh56, sw360 } from "../../../styles";
import { ProductConfirmation } from "./Confirmation";
import { ProductDetails } from "./Details";
import { ProductList } from "./ProductList";

const { INVESTMENT, PRODUCT_LIST } = Language.PAGE;

interface ProductsProps extends ProductsStoreProps, OnboardingContentProps {}

export const ProductComponent: FunctionComponent<ProductsProps> = ({
  accountType,
  addInvestmentDetails,
  addPersonalInfo,
  addSelectedFund,
  addViewFund,
  details,
  handleNextStep,
  investmentDetails,
  onboarding,
  resetProducts,
  resetSelectedFund,
  riskScore,
  selectedFunds,
  updateOnboarding,
  viewFund,
}: ProductsProps) => {
  const { disabledSteps, finishedSteps } = onboarding;
  const [page, setPage] = useState<number>(0);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [outsideRisk, setOutsideRisk] = useState<number>(0);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<"risk" | "cancel" | undefined>(undefined);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState<boolean>(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = accountType === "Individual" && principalClientAge < DICTIONARY_EPF_AGE;

  const handleBackToAssessment = () => {
    setPrompt(undefined);
    handleNextStep("RiskAssessment");
    resetProducts();
    resetSelectedFund();
  };

  const handleCancel = () => {
    setPrompt(undefined);
  };

  const handleInvest = () => {
    const initialStateArray: IProductSales[] = [];
    selectedFunds.map((item: IProduct) => {
      let newMasterClassList: IProductClasses = {};
      item.masterList.forEach((list: IProductMasterList) => {
        const classIndex = newMasterClassList !== {} ? Object.keys(newMasterClassList).indexOf(list.class) : -1;
        if (classIndex === -1) {
          newMasterClassList = { ...newMasterClassList, [list.class]: [list] };
        } else {
          newMasterClassList[list.class].push(list);
        }
      });
      const newState: IProductSales = {
        investment: {
          fundPaymentMethod: "Cash",
          investmentAmount: "",
          investmentSalesCharge: "",
          fundCurrency: item.masterList[0].currency,
          fundClass: item.masterList[0].class,
          scheduledInvestment: false,
        },
        fundDetails: { ...item },
        masterClassList: newMasterClassList,
      };

      return initialStateArray.push(newState);
    });
    addInvestmentDetails(initialStateArray);
    setPage(1);
  };

  const handlePrompt = () => {
    if (prompt === "risk") {
      if (outsideRisk === 1) {
        handleInvest();
        setPrompt(undefined);
      }
      return setPrompt(undefined);
    }
    return handleBackToAssessment();
  };

  const checkOutsideRiskFactor = () => {
    const fundsRisk = selectedFunds.map((item) => item.riskCategory.toLowerCase());
    if (riskScore.appetite.toLowerCase() === "medium") {
      return fundsRisk.includes("high");
    }
    if (riskScore.appetite.toLowerCase() === "low") {
      return fundsRisk.includes("high") || fundsRisk.includes("medium");
    }

    return false;
  };

  const handleStartInvesting = () => {
    if (checkOutsideRiskFactor() === true) {
      return setPrompt("risk");
    }
    return handleInvest();
  };

  const handleBackToListing = () => {
    return page === 1 ? setPage(0) : addSelectedFund([]);
  };

  const handleCancelProducts = () => {
    setPrompt("cancel");
  };

  const handleBack = () => {
    addViewFund(undefined);
  };

  const handleConfirmIdentity = () => {
    const epfInvestments = investmentDetails!
      .filter(({ investment }) => investment.fundPaymentMethod === "EPF")
      .map((epfInvestment) => epfInvestment.fundDetails.isSyariah);
    const epfShariah = epfInvestments.includes("Yes");
    if (epfInvestments.length > 0) {
      addPersonalInfo({ epfInvestment: true, epfShariah: epfShariah });
    }
    const route: TypeOnboardingRoute = disabledSteps.includes("EmailVerification") ? "IdentityVerification" : "EmailVerification";
    handleNextStep(route);
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    updatedFinishedSteps.push("Products");
    const findPersonalInfo = updatedDisabledSteps.indexOf("PersonalInformation");
    if (findPersonalInfo !== -1) {
      updatedDisabledSteps.splice(findPersonalInfo, 1);
    }
    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleShareDocuments = async () => {
    // TODO integration
    const response = [SAMPLE_PDF_1, SAMPLE_PDF_1];
    const documents = response.map((file: FileBase64) => `data:${file.type};base64,${file.base64}`);
    const share = await RNShareApi.filesBase64(documents);
    if (share !== undefined) {
      setShareSuccess(true);
    }
  };

  let screen = {
    content: (
      <ProductList
        handleCancelProducts={handleCancelProducts}
        handleShareDocuments={handleShareDocuments}
        scrollEnabled={scrollEnabled}
        setScrollEnabled={setScrollEnabled}
      />
    ),
    onPressCancel: handleCancelProducts,
    onPressSubmit: handleStartInvesting,
    labelSubmit: INVESTMENT.BUTTON_START_INVESTING,
  };

  if (page === 1) {
    screen = {
      ...screen,
      content: (
        <ProductConfirmation
          investmentDetails={investmentDetails!}
          selectedFunds={selectedFunds}
          setFixedBottomShow={setFixedBottomShow}
          setInvestmentDetails={addInvestmentDetails}
          setPage={setPage}
          setSelectedFund={addSelectedFund}
          withEpf={withEpf}
        />
      ),
      onPressCancel: handleBackToListing,
      onPressSubmit: handleConfirmIdentity,
      labelSubmit: INVESTMENT.BUTTON_CONFIRM,
    };
  }

  if (viewFund !== undefined) {
    screen = {
      ...screen,
      content: <ProductDetails fund={viewFund} handleBack={handleBack} handleShareDocuments={handleShareDocuments} />,
      onPressSubmit: handleConfirmIdentity,
      labelSubmit: INVESTMENT.BUTTON_CONFIRM,
    };
  }

  useEffect(() => {
    setShareSuccess(false);
  }, [shareSuccess]);

  let utCount = 0;
  let prsCount = 0;
  let ampCount = 0;
  selectedFunds.forEach((fund: IProduct) => {
    if (fund.fundType === "UT") {
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

  const bannerText = `${utLabel}${utSuffix}${prsPrefix}${prsLabel}${prsSuffix}${ampPrefix}${ampLabel} ${INVESTMENT.LABEL_SELECTED}`;

  const disableContinue = investmentDetails?.find(({ investment }) => {
    return (
      investment.investmentAmount === "" ||
      investment.investmentSalesCharge === "" ||
      (investment.scheduledInvestment === true && investment.scheduledInvestmentAmount === "") ||
      (investment.scheduledInvestment === true && investment.scheduledSalesCharge === "") ||
      investment.amountError !== undefined ||
      investment.scheduledAmountError !== undefined
    );
  });

  const riskFactorOptions = [PRODUCT_LIST.PROMPT_OPTION_1, PRODUCT_LIST.PROMPT_OPTION_2];

  const handleRiskOption = (value: string) => {
    setOutsideRisk(riskFactorOptions.indexOf(value));
  };

  const handleKeyboardShow = () => {
    setKeyboardIsShowing(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardIsShowing(false);
  };

  useEffect(() => {
    if (finishedSteps.includes("Products")) {
      setPage(1);
    }
    Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    return () => {
      Keyboard.removeListener("keyboardWillHide", handleKeyboardHide);
      Keyboard.removeListener("keyboardWillShow", handleKeyboardShow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelContinue = prompt === "cancel" ? PRODUCT_LIST.BUTTON_YES : PRODUCT_LIST.BUTTON_AGREE;
  const promptTitle = prompt === "cancel" ? PRODUCT_LIST.PROMPT_TITLE_CANCEL : PRODUCT_LIST.PROMPT_TITLE_RISK;

  return (
    <Fragment>
      <View style={flexChild}>
        {screen.content}
        {fixedBottomShow === true &&
        selectedFunds.length !== 0 &&
        viewFund === undefined &&
        keyboardIsShowing === false &&
        scrollEnabled === true ? (
          <View style={flexCol}>
            <SelectionBanner
              bottomContent={<Text style={fs16SemiBoldBlack2}>{bannerText}</Text>}
              cancelOnPress={screen.onPressCancel}
              continueDisabled={disableContinue !== undefined && page === 1}
              labelCancel={INVESTMENT.BUTTON_CANCEL}
              labelSubmit={screen.labelSubmit}
              submitOnPress={screen.onPressSubmit}
              label={INVESTMENT.LABEL_FUND_SUMMARY}
            />
          </View>
        ) : null}
      </View>
      <ConfirmationModal
        handleCancel={handleCancel}
        handleContinue={handlePrompt}
        labelCancel={prompt === "cancel" ? PRODUCT_LIST.BUTTON_NO : undefined}
        labelContinue={labelContinue}
        spaceToContent={prompt === "cancel" ? undefined : sh24}
        spaceToTitle={prompt === "cancel" ? undefined : sh56}
        title={promptTitle}
        visible={prompt !== undefined}>
        {prompt === "cancel" ? (
          <Text style={fs16BoldBlack2}>{PRODUCT_LIST.PROMPT_LABEL_CANCEL}</Text>
        ) : (
          <View style={{ width: sw360 }}>
            <RadioButtonGroup
              options={riskFactorOptions}
              radioStyle={{ ...alignSelfStart, marginTop: sh4 }}
              selected={riskFactorOptions[outsideRisk]}
              setSelected={handleRiskOption}
            />
          </View>
        )}
      </ConfirmationModal>
    </Fragment>
  );
};

export const Products = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductComponent);
