import moment from "moment";
import React, { Fragment, useState } from "react";
import { Alert, Pressable, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, IconButton, LabeledTitle, NewPromptModal } from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_PLACE_OF_BIRTH } from "../../../../data/dictionary";
import { ClientMapDispatchToProps, ClientMapStateToProps, ClientStoreProps } from "../../../../store";
import {
  alignFlexStart,
  border,
  centerHV,
  centerVertical,
  circle,
  colorBlue,
  colorRed,
  colorTransparent,
  colorWhite,
  flexRow,
  fs12RegBlue5,
  fs16BoldBlue1,
  fs16RegGray5,
  fs24BoldGray6,
  fullWidth,
  px,
  py,
  sh16,
  sh4,
  sh72,
  sh8,
  sw1,
  sw100,
  sw2,
  sw20,
  sw212,
  sw24,
  sw26,
  sw8,
} from "../../../../styles";
import { NewSalesDetails } from "../../QuickActions/NewSales/Details";
import { NewSalesSummary } from "../../QuickActions/NewSales/Summary";

const { INVESTOR_ACCOUNTS } = Language.PAGE;

interface InvestorSalesProps extends ClientStoreProps {
  ageErrorMessage?: string;
  errorMessage?: string;
  fetching: boolean;
  handleCheckClient: (req?: IEtbCheckRequest) => Promise<boolean | string>;
  handleClientRegister: () => Promise<boolean | void>;
  inputError1?: string;
  investorData: IInvestor;
  isNtb?: boolean;
  modalData: LabeledTitleProps[];
  navigation: IStackNavigationProp;
  newAccountType: number;
  registered: boolean;
  setAccountType: (type: number) => void;
  setAgeErrorMessage: (error: string | undefined) => void;
  setErrorMessage: (error: string | undefined) => void;
  setInputError1: (error: string | undefined) => void;
  setPage?: (page: DashboardPageType) => void;
  setRegistered: (toggle: boolean) => void;
  setVisible: (visibility: boolean) => void;
  visible: boolean;
}

type TPromptType = "accountType" | "joint";

const InvestorSalesPromptComponent = ({
  accountType,
  addJointInfo,
  addPersonalInfo,
  ageErrorMessage,
  details,
  errorMessage,
  fetching,
  handleCheckClient,
  handleClientRegister,
  inputError1,
  investors,
  isNtb,
  modalData,
  navigation,
  newAccountType,
  personalInfo,
  registered,
  resetClientDetails,
  resetPersonalInfo,
  setAccountType,
  setAgeErrorMessage,
  setErrorMessage,
  setInputError1,
  setRegistered,
  setVisible,
  showOpenAccount,
  updateInvestors,
  updateShowOpenAccount,
  visible,
}: InvestorSalesProps) => {
  const [prompt, setPrompt] = useState<TPromptType>("accountType");
  const { jointHolder, principalHolder } = details!;
  const { dateOfBirth, id, idType, name, country } = jointHolder!;

  const jointIdType = jointHolder?.idType === "Other" ? jointHolder?.otherIdType : jointHolder?.idType;
  const principalIdType = principalHolder?.idType === "Other" ? principalHolder?.otherIdType : principalHolder?.idType;
  const buttonContinue = prompt === "joint" && registered === true ? INVESTOR_ACCOUNTS.BUTTON_CONFIRM : INVESTOR_ACCOUNTS.BUTTON_CONTINUE;

  const setClientInfo = (info: IClientBasicInfo) => addJointInfo({ ...jointHolder, ...info });

  let continueDisabled = false;

  if (prompt === "accountType") {
    continueDisabled = newAccountType !== 0 && newAccountType !== 1;
  }
  if (prompt === "joint" && registered === false) {
    switch (idType) {
      case "NRIC":
        continueDisabled = name === "" || id === "" || inputError1 !== undefined;
        break;
      case "Passport":
        continueDisabled = name === "" || id === "" || dateOfBirth === "" || inputError1 !== undefined || country === "";
        break;
      case "Other":
        continueDisabled = name === "" || id === "" || inputError1 !== undefined || dateOfBirth === "";
        break;
      default:
        continueDisabled = name === "" || id === "" || inputError1 !== undefined;
        break;
    }
  }

  const handleReset = () => {
    setInputError1(undefined);
    setAgeErrorMessage(undefined);
    setErrorMessage(undefined);
    resetClientDetails();
    if (showOpenAccount === true) {
      updateShowOpenAccount(false);
    }
    setPrompt("accountType");
    setRegistered(false);
    setAccountType(-1);
  };

  const handleCancelNewSales = () => {
    setVisible(false);
    handleReset();
  };

  const handleCancel = () => {
    if (prompt === "accountType") {
      handleCancelNewSales();
    } else if (registered === true) {
      resetPersonalInfo();
      setRegistered(false);
    } else if (registered === false) {
      setPrompt("accountType");
    } else {
      handleCancelNewSales();
    }
  };

  const handleNavigation = () => {
    const principalClientIdType = principalHolder?.idType === "Other" ? principalHolder.otherIdType : principalIdType;
    const jointClientIdType = jointHolder?.idType === "Other" ? jointHolder.otherIdType : jointIdType;
    const principalFilteredPlace = DICTIONARY_PLACE_OF_BIRTH.filter((code) => code.code === principalHolder?.id!.substr(6, 2));
    const jointFilteredPlace = DICTIONARY_PLACE_OF_BIRTH.filter((code) => code.code === jointHolder?.id!.substr(6, 2));
    const principalPlaceOfBirth =
      principalHolder?.idType === "NRIC" && principalFilteredPlace.length !== 0 ? principalFilteredPlace[0].location : "";
    const jointPlaceOfBirth =
      accountType === "Joint" && jointHolder?.idType === "NRIC" && jointFilteredPlace.length !== 0 ? jointFilteredPlace[0].location : "";
    const jointDetails =
      accountType === "Individual"
        ? { ...personalInfo.joint! }
        : {
            ...personalInfo.joint,
            personalDetails: {
              ...personalInfo.joint?.personalDetails,
              countryOfBirth: jointHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
              dateOfBirth: moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
              expirationDate: undefined,
              idNumber: jointHolder?.id,
              idType: jointClientIdType,
              name: jointHolder?.name!.trim(),
              nationality: jointHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
              placeOfBirth: jointPlaceOfBirth,
            },
          };
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        personalDetails: {
          ...personalInfo.principal?.personalDetails,
          countryOfBirth: principalHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
          dateOfBirth: moment(principalHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
          expirationDate: undefined,
          idNumber: principalHolder?.id,
          idType: principalClientIdType,
          name: principalHolder?.name,
          nationality: principalHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
          placeOfBirth: principalPlaceOfBirth,
        },
      },
      joint: jointDetails,
    });
    setVisible(false);
    setRegistered(false);
    if (isNtb === true) {
      navigation.navigate("Onboarding");
    } else {
      updateInvestors({ ...investors, backToInvestorOverview: true });
      navigation.navigate("NewSales");
    }
  };

  const handleContinue = async () => {
    if (prompt === "accountType") {
      if (newAccountType === 0) {
        handleClientRegister();
      } else {
        setPrompt("joint");
      }
    }
    if (prompt === "joint") {
      if (registered === true) {
        handleNavigation();
      } else {
        // This checks if Joint Holder of AO is an ETB or not
        const checkETB = await handleCheckClient();
        if (checkETB === true) {
          handleClientRegister();
        }
        if (checkETB === "Minor") {
          setPrompt("accountType");
          setAccountType(-1);
        }
        if (typeof checkETB === "string" && checkETB !== "Minor") {
          Alert.alert(checkETB);
        }
      }
    }
  };

  const content = (
    <View style={fullWidth}>
      <View>
        <Text style={fs24BoldGray6}>{INVESTOR_ACCOUNTS.NEW_SALES_PROMPT_TITLE}</Text>
        <CustomSpacer space={sh4} />
        <Text style={fs16RegGray5}>{INVESTOR_ACCOUNTS.NEW_SALES_PROMPT_SUBTITLE}</Text>
        <CustomSpacer space={sh8} />
        {modalData.map((eachCard: LabeledTitleProps, index: number) => {
          const { label, title } = eachCard;
          const handlePress = () => {
            setAccountType(index);
          };
          const containerStyle: ViewStyle = {
            ...px(sw24),
            ...py(sh16),
            ...centerHV,
            backgroundColor: accountType !== undefined && newAccountType === index ? colorBlue._3 : colorWhite._1,
            borderColor: accountType !== undefined && newAccountType === index ? colorBlue._1 : colorWhite._1,
            borderWidth: sw2,
            height: sh72,
            borderRadius: sw8,
          };
          const iconStyle: ViewStyle = {
            ...circle(sw26, colorTransparent),
            ...border(colorBlue._1, sw1, sw100),
            ...centerHV,
            backgroundColor: accountType !== undefined && newAccountType === index ? colorRed._1 : colorTransparent,
            borderColor: accountType !== undefined && newAccountType === index ? colorRed._1 : colorBlue._1,
          };
          const iconColor = accountType !== undefined && newAccountType === index ? colorWhite._1 : colorBlue._1;
          return (
            <Fragment key={index}>
              <CustomSpacer space={sh16} />
              <Pressable onPress={handlePress} style={containerStyle}>
                <View style={{ ...flexRow, ...centerVertical }}>
                  <LabeledTitle label={label} labelStyle={fs16BoldBlue1} title={title} titleStyle={fs12RegBlue5} />
                  <CustomFlexSpacer />
                  <View style={iconStyle}>
                    <IconButton color={iconColor} name="check" onPress={handlePress} size={sw20} />
                  </View>
                </View>
              </Pressable>
            </Fragment>
          );
        })}
      </View>
    </View>
  );

  return (
    <NewPromptModal
      contentStyle={alignFlexStart}
      primary={{
        disabled: continueDisabled,
        loading: fetching,
        onPress: handleContinue,
        buttonStyle: { width: sw212 },
        text: prompt === "accountType" ? INVESTOR_ACCOUNTS.BUTTON_GET_STARTED : buttonContinue,
      }}
      secondary={{
        onPress: handleCancel,
        buttonStyle: { width: sw212 },
        text: INVESTOR_ACCOUNTS.BUTTON_CANCEL,
      }}
      visible={visible}>
      <Fragment>
        {prompt === "accountType" ? content : null}
        {registered === false && prompt === "joint" ? (
          <Fragment>
            <Text style={fs24BoldGray6}>{INVESTOR_ACCOUNTS.NEW_SALES_JOINT_TITLE}</Text>
            <CustomSpacer space={sh4} />
            <NewSalesDetails
              accountType={accountType}
              ageErrorMessage={ageErrorMessage}
              clientInfo={details!.jointHolder!}
              clientType={"ETB"}
              errorMessage={errorMessage}
              holderToFill={"jointHolder"}
              inputError1={inputError1}
              setClientInfo={setClientInfo}
              setAgeErrorMessage={setAgeErrorMessage}
              setErrorMessage={setErrorMessage}
              setInputError1={setInputError1}
              subHeading={INVESTOR_ACCOUNTS.NEW_SALES_JOINT_SUBTITLE}
              subHeadingStyle={fs16RegGray5}
            />
          </Fragment>
        ) : (
          <Fragment>
            {prompt === "joint" && registered === true ? (
              <NewSalesSummary accountType={"Joint"} jointHolder={jointHolder} principalHolder={principalHolder!} />
            ) : null}
          </Fragment>
        )}
      </Fragment>
    </NewPromptModal>
  );
};

export const InvestorSalesPrompt = connect(ClientMapStateToProps, ClientMapDispatchToProps)(InvestorSalesPromptComponent);
