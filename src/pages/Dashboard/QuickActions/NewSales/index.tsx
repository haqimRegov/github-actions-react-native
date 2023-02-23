import moment from "moment";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Image, ImageStyle, Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CustomFlexSpacer, CustomSpacer, IconButton, LabeledTitle, RNModal } from "../../../../components";
import { DATE_OF_BIRTH_FORMAT, DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import {
  DICTIONARY_COUNTRIES,
  DICTIONARY_ID_OTHER_TYPE,
  DICTIONARY_ID_TYPE,
  DICTIONARY_PLACE_OF_BIRTH,
  ERROR_CODE,
} from "../../../../data/dictionary";
import { checkClient, clientRegister } from "../../../../network-actions";
import { ClientMapDispatchToProps, ClientMapStateToProps, ClientStoreProps } from "../../../../store";
import {
  border,
  centerHV,
  centerVertical,
  circle,
  colorBlue,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  flexGrow,
  flexRow,
  flexRowCC,
  fs12RegBlue5,
  fs16BoldBlue1,
  fs16RegGray5,
  fs16RegGray6,
  fs24BoldBlue1,
  fs24BoldGray6,
  fs36BoldBlack2,
  fsAlignCenter,
  fullHW,
  fullWidth,
  imageContain,
  px,
  py,
  sh16,
  sh24,
  sh4,
  sh40,
  sh72,
  sh8,
  sh96,
  sw1,
  sw10,
  sw100,
  sw136,
  sw2,
  sw20,
  sw218,
  sw24,
  sw26,
  sw5,
  sw56,
  sw565,
  sw8,
} from "../../../../styles";
import { NewSalesDetails } from "./Details";
import { NewSalesPrompt } from "./Prompt";
import { NewSalesSummary } from "./Summary";

const { ADD_CLIENT, INVESTOR_ACCOUNTS } = Language.PAGE;

interface NewSalesProps extends ClientStoreProps {
  navigation: IStackNavigationProp;
  setPage?: (page: DashboardPageType) => void;
  setVisible: (visibility: boolean) => void;
  visible: boolean;
}

const NewSalesComponent: FunctionComponent<NewSalesProps> = ({
  agent,
  accountType,
  addAccountType,
  addClientDetails,
  addClientForceUpdate,
  addJointInfo,
  addPersonalInfo,
  addPrincipalInfo,
  client,
  details,
  navigation,
  newSales,
  personalInfo,
  resetClientDetails,
  setPage,
  setVisible,
  showOpenAccount,
  updateClient,
  updateNewSales,
  updateShowOpenAccount,
  updateTransactionType,
  visible,
}: NewSalesProps) => {
  const fetching = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clientType, setClientType] = useState<ITypeClient>({ principal: "", joint: "" });
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [ageErrorMessage, setAgeErrorMessage] = useState<string | undefined>(undefined);
  const [inputError1, setInputError1] = useState<string | undefined>(undefined);
  const [registered, setRegistered] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<TypeNewSalesPrompt>(undefined);
  const [salesNewPrompt, setSalesNewPrompt] = useState<boolean>(false);
  const [accountTypePrompt, setAccountTypePrompt] = useState<boolean>(false);
  const [holderToFill, setHolderToFill] = useState<"principalHolder" | "jointHolder">("principalHolder");
  const { jointHolder, principalHolder } = details!;
  const { dateOfBirth, id, idType, name, country } = details![holderToFill]!;

  const BUTTON_LABEL_NEW_SALES = salesNewPrompt === true ? ADD_CLIENT.BUTTON_OPEN_ACCOUNT : ADD_CLIENT.BUTTON_CONTINUE;
  const BUTTON_CONTINUE_PROMPT = prompt === "bannedCountry" ? ADD_CLIENT.BUTTON_BACK : ADD_CLIENT.BUTTON_ADD;
  const BUTTON_LABEL_PROMPT = prompt !== undefined ? BUTTON_CONTINUE_PROMPT : BUTTON_LABEL_NEW_SALES;
  const BUTTON_LABEL = registered === true ? ADD_CLIENT.BUTTON_CONFIRM : BUTTON_LABEL_PROMPT;
  const jointIdType = jointHolder?.idType === "Other" ? jointHolder?.otherIdType : jointHolder?.idType;
  const principalIdType = principalHolder?.idType === "Other" ? principalHolder?.otherIdType : principalHolder?.idType;
  const titleStyle: TextStyle = registered === true ? {} : fs36BoldBlack2;
  const clientTypeDetail = holderToFill === "principalHolder" ? clientType.principal : clientType.joint;
  const clientTypeInitialValue: ITypeClient = { principal: "", joint: "" };
  const subheadingTitle = holderToFill === "principalHolder" ? ADD_CLIENT.SUBHEADING : ADD_CLIENT.SUBHEADING_JOINT;
  const checkSubheading = clientType !== "" ? subheadingTitle : ADD_CLIENT.SUBHEADING;

  const setClientInfo = (info: IClientBasicInfo) =>
    holderToFill === "principalHolder" ? addPrincipalInfo({ ...principalHolder, ...info }) : addJointInfo({ ...jointHolder, ...info });
  const setAccountType = (type: string) => addAccountType(type as TypeAccountChoices);

  let continueDisabled = true;

  switch (idType) {
    case "NRIC":
      continueDisabled = name === "" || id === "" || inputError1 !== undefined || (accountTypePrompt === true && accountType === undefined);
      break;
    case "Passport":
      continueDisabled =
        name === "" ||
        id === "" ||
        dateOfBirth === "" ||
        inputError1 !== undefined ||
        country === "" ||
        (accountTypePrompt === true && accountType === undefined);
      break;
    case "Other":
      continueDisabled =
        name === "" ||
        id === "" ||
        inputError1 !== undefined ||
        dateOfBirth === "" ||
        (accountTypePrompt === true && accountType === undefined);
      break;
    default:
      continueDisabled = name === "" || id === "" || inputError1 !== undefined || (accountTypePrompt === true && accountType === undefined);
      break;
  }

  const handleReset = () => {
    setClientType({ ...clientTypeInitialValue });
    setHolderToFill("principalHolder");
    setInputError1(undefined);
    setAgeErrorMessage(undefined);
    setErrorMessage(undefined);
    resetClientDetails();
    if (showOpenAccount === true) {
      updateShowOpenAccount(false);
    }
    setPrompt(undefined);
  };

  const handleCancelNewSales = () => {
    setVisible(false);
    handleReset();
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
              countryOfIssuance: jointHolder?.idType === "Passport" ? jointHolder?.country : "",
              dateOfBirth: moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
              expirationDate: undefined,
              idNumber: jointHolder?.id,
              idType: jointClientIdType,
              name: jointHolder?.name!.trim(),
              nationality: jointHolder?.idType === "Passport" ? jointHolder?.country : DICTIONARY_COUNTRIES[0].value,
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
          countryOfIssuance: principalHolder?.idType === "Passport" ? principalHolder?.country : "",
          dateOfBirth: moment(principalHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
          expirationDate: undefined,
          idNumber: principalHolder?.id,
          idType: principalClientIdType,
          name: principalHolder?.name,
          nationality: principalHolder?.idType === "Passport" ? principalHolder?.country : DICTIONARY_COUNTRIES[0].value,
          placeOfBirth: principalPlaceOfBirth,
        },
      },
      joint: jointDetails,
    });
    setVisible(false);
    navigation.navigate("Onboarding");
  };

  const handleUpdateClientType = (value: TypeClient) => {
    const updatedState = holderToFill === "principalHolder" ? { principal: value } : { joint: value };
    setClientType({ ...clientType, ...updatedState });
  };

  const handleCheckClient = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const requestPrincipal: IEtbCheckRequest = {
        country: principalHolder?.country,
        dateOfBirth:
          principalHolder?.dateOfBirth && principalHolder.idType !== "NRIC"
            ? moment(principalHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT)
            : "",
        id: principalHolder?.id,
        idType: principalIdType,
        name: principalHolder?.name?.trim(),
      };

      const requestJoint: IEtbCheckRequest = {
        country: jointHolder?.country,
        dateOfBirth:
          jointHolder?.dateOfBirth && jointHolder.idType !== "NRIC"
            ? moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT)
            : "",
        id: jointHolder?.id,
        idType: jointIdType,
        name: jointHolder?.name?.trim(),
      };
      const request = holderToFill === "principalHolder" ? requestPrincipal : requestJoint;

      const clientCheck: IEtbCheckResponse = await checkClient(request, navigation, setLoading);
      setLoading(false);
      fetching.current = false;
      if (clientCheck !== undefined) {
        const { data, error } = clientCheck;
        if (error === null && data !== null) {
          setAgeErrorMessage(undefined);
          setErrorMessage(undefined);
          setInputError1(undefined);
          if (data.result.message === "NTB") {
            if (client.isNewFundPurchase === true) {
              setSalesNewPrompt(true);
            }
            handleUpdateClientType("NTB");
            if (holderToFill === "principalHolder") {
              setAccountTypePrompt(true);
            }
          }

          if (data.result.message === "ETB" && setPage !== undefined) {
            handleUpdateClientType("ETB");
            if (holderToFill === "principalHolder") {
              setVisible(false);
            }
            if (holderToFill === "jointHolder") {
              updateNewSales({ ...newSales, investorProfile: { ...newSales.investorProfile, jointClientId: data.result.clientId } });
            }
            if (data.result.forceUpdate === false) {
              const newClientData =
                holderToFill === "principalHolder"
                  ? {
                      ...client,
                      accountList: data.result.accounts!,
                      details: {
                        ...client.details,
                        // Note: We will initially save the current investor as Principal Holder then we will change it accordingly based on the Account Holders during Sales
                        principalHolder: {
                          ...client.details?.principalHolder,
                          name: principalHolder!.name!.trim(),
                          id: principalHolder?.id,
                          isEtb: true,
                        },
                      },
                    }
                  : {
                      ...client,
                      accountList: data.result.accounts!,
                      details: {
                        ...client.details,
                        // Note: We will initially save the current investor as Principal Holder then we will change it accordingly based on the Account Holders during Sales
                        jointHolder: {
                          ...client.details?.jointHolder,
                          name: jointHolder!.name!.trim(),
                          id: jointHolder?.id,
                          isEtb: true,
                        },
                      },
                    };

              updateClient({
                ...newClientData,
              });

              if (holderToFill === "principalHolder" && client.isNewFundPurchase === true) {
                // Note: We will initially save the current investor as Principal Holder then we will change it accordingly based on the Account Holders during Sales
                addPersonalInfo({
                  ...personalInfo,
                  principal: {
                    ...personalInfo.principal,
                    contactDetails: {
                      ...personalInfo.principal?.contactDetails,
                      emailAddress: data.result.emailAddress,
                    },
                  },
                });
                updateTransactionType("Sales");
                return navigation.navigate("NewSales");
              }
              if (holderToFill === "principalHolder") {
                updateTransactionType("Sales-AO");
                return setPage("Investors");
              }
              return "ETB";
            }
            if (data.result.forceUpdate === true) {
              addClientForceUpdate(true);
              return setPage("Investors");
            }
          }
        }
        if (error !== null) {
          if (error?.errorCode === ERROR_CODE.clientAgeMinimum) {
            return setPrompt("ageMinimum");
          }
          if (error?.errorCode === ERROR_CODE.clientAgeMaximum) {
            return setPrompt("ageMaximum");
          }
          if (error?.errorCode === ERROR_CODE.clientBannedCountry) {
            return setPrompt("bannedCountry");
          }
          return setErrorMessage(error.message);
        }
      }
    }
    return undefined;
  };

  const handleClientRegister = async (value?: string) => {
    // This is used only if NTB Investor was used in Sales
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const principalDob =
        principalHolder?.dateOfBirth && principalHolder.idType !== "NRIC"
          ? { dateOfBirth: moment(principalHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};
      const jointDob =
        jointHolder?.dateOfBirth && jointHolder.idType !== "NRIC"
          ? { dateOfBirth: moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};
      const jointInfo =
        accountType === "Individual"
          ? undefined
          : {
              ...jointDob,
              id: jointHolder?.id!,
              idType: jointIdType,
              name: jointHolder?.name!,
            };
      const request: IClientRegisterRequest = {
        accountType: accountType!,
        isEtb: false,
        isNewFundPurchased: false,
        principalHolder: {
          ...principalDob,
          id: principalHolder?.id!,
          idType: principalIdType,
          name: principalHolder?.name!,
        },
        jointHolder: jointInfo,
      };
      const clientResponse: IClientRegisterResponse = await clientRegister(request, navigation, setLoading);
      setLoading(false);
      fetching.current = false;
      if (clientResponse !== undefined) {
        const { data, error } = clientResponse;
        if (error === null && data !== null) {
          const resetJointInfo =
            accountType === "Individual" &&
            (jointHolder?.name !== "" || jointHolder?.country !== "" || jointHolder?.dateOfBirth !== "" || jointHolder?.id !== "");
          const initialJointInfo = {
            name: "",
            country: "",
            dateOfBirth: "",
            id: "",
            idType: DICTIONARY_ID_TYPE[0],
            isEtb: false,
            otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
          };
          const jointIsEtb = value !== undefined && value === "ETB";
          const moreJointInfo =
            data.result.jointHolder !== undefined && data.result.jointHolder !== null
              ? {
                  clientId: data.result.jointHolder.clientId,
                  dateOfBirth: data.result.jointHolder.dateOfBirth,
                  id: data.result.jointHolder.id,
                  name: data.result.jointHolder.name,
                  isEtb: jointIsEtb,
                }
              : {};
          setAgeErrorMessage(undefined);
          setErrorMessage(undefined);
          setInputError1(undefined);
          setAccountTypePrompt(false);

          const principalIsEtb = clientType.principal === "ETB";
          addClientDetails({
            ...details,
            principalHolder: {
              ...principalHolder!,
              dateOfBirth: data.result.principalHolder.dateOfBirth,
              clientId: data.result.principalHolder.clientId,
              isEtb: principalIsEtb,
            },
            jointHolder: resetJointInfo === true ? { ...initialJointInfo } : { ...jointHolder!, ...moreJointInfo },
            initId: `${data.result.initId}`,
          });
          return setRegistered(true);
        }
        if (
          error !== null &&
          principalIdType !== "NRIC" &&
          (error.errorCode === ERROR_CODE.clientAgeMinimum || error.errorCode === ERROR_CODE.clientAgeMaximum)
        ) {
          setAgeErrorMessage(error?.message);
        } else {
          setErrorMessage(error?.message);
        }
      }
    }
    return undefined;
  };

  const handleCancel = () => {
    if (prompt !== undefined) {
      handleCancelNewSales();
    } else if (registered === true) {
      setRegistered(false);
      if (accountType === "Joint") {
        setHolderToFill("jointHolder");
      } else {
        setAccountTypePrompt(true);
      }
    } else if (salesNewPrompt === true) {
      setSalesNewPrompt(false);
      setHolderToFill("principalHolder");
      setClientType({ ...clientTypeInitialValue });
    } else if (clientType.joint !== "" && holderToFill === "jointHolder" && accountTypePrompt === false) {
      setAccountTypePrompt(true);
    } else if (accountTypePrompt === true) {
      setHolderToFill("principalHolder");
      setAccountTypePrompt(false);
      setClientType({ ...clientTypeInitialValue });
    } else if (clientType.principal !== "" && holderToFill === "principalHolder") {
      setClientType({ ...clientTypeInitialValue });
      addAccountType("Individual");
    } else {
      handleCancelNewSales();
    }
  };

  const handleContinue = async () => {
    if (prompt === "bannedCountry") {
      return handleCancelNewSales();
    }
    if (prompt !== undefined) {
      return handleReset();
    }
    if (registered === true) {
      return handleNavigation();
    }

    if (salesNewPrompt === true) {
      setSalesNewPrompt(false);
      setAccountTypePrompt(true);
      return handleUpdateClientType("NTB");
    }

    if (accountTypePrompt === true) {
      if (accountType === "Joint" && holderToFill === "principalHolder") {
        setAccountTypePrompt(false);
        return setHolderToFill("jointHolder");
      }
      setHolderToFill("principalHolder");
      return handleClientRegister();
    }

    if (accountType === "Joint" && holderToFill === "jointHolder") {
      const jointResult = (await handleCheckClient()) as string;
      return handleClientRegister(jointResult);
    }
    return handleCheckClient();
  };

  const modalContainer: ViewStyle = {
    backgroundColor: colorBlue._2,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };
  const illustrationStyle: ImageStyle = { ...imageContain, height: sw136, width: sw136 };

  const newSalesPromptTitle = `${principalHolder?.name} ${ADD_CLIENT.SALES_PROMPT_TITLE}`;
  const checkCancelLabel = salesNewPrompt === true ? ADD_CLIENT.BUTTON_GO_BACK : ADD_CLIENT.BUTTON_CANCEL;
  const modalData: LabeledTitleProps[] = [
    {
      label: INVESTOR_ACCOUNTS.LABEL_INDIVIDUAL_ACCOUNT,
      title: INVESTOR_ACCOUNTS.LABEL_INDIVIDUAL_ACCOUNT_SUB,
    },
    {
      label: INVESTOR_ACCOUNTS.LABEL_JOINT_ACCOUNT,
      title: INVESTOR_ACCOUNTS.LABEL_JOINT_ACCOUNT_SUB,
    },
  ];
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
            const checkAccountType = index === 0 ? "Individual" : "Joint";
            setAccountType(checkAccountType);
          };
          let accountTypeIndex = -1;
          switch (accountType) {
            case "Individual":
              accountTypeIndex = 0;
              break;
            case "Joint":
              accountTypeIndex = 1;
              break;
            default:
              accountTypeIndex = -1;
              break;
          }
          const checkOnlyPRS = agent?.licenseType.length === 1 && agent.licenseType[0] === "PRS";
          const disabledStyle: ViewStyle = checkOnlyPRS === true && index === 1 ? { opacity: 0.6 } : {};
          const disabledIconStyle: ViewStyle = checkOnlyPRS === true && index === 1 ? { backgroundColor: colorGray._4, opacity: 0.6 } : {};
          const disabledEvents = checkOnlyPRS === true && index === 1 ? "none" : "auto";
          const containerStyle: ViewStyle = {
            ...px(sw24),
            ...py(sh16),
            ...centerHV,
            backgroundColor: accountType !== undefined && accountTypeIndex === index ? colorBlue._3 : colorWhite._1,
            borderColor: accountType !== undefined && accountTypeIndex === index ? colorBlue._1 : colorWhite._1,
            borderWidth: sw2,
            height: sh72,
            borderRadius: sw8,
            ...disabledStyle,
          };
          const iconStyle: ViewStyle = {
            ...circle(sw26, colorTransparent),
            ...border(colorBlue._1, sw1, sw100),
            ...centerHV,
            backgroundColor: accountType !== undefined && accountTypeIndex === index ? colorRed._1 : colorTransparent,
            borderColor: accountType !== undefined && accountTypeIndex === index ? colorRed._1 : colorBlue._1,
            ...disabledIconStyle,
          };
          const iconColor = accountType !== undefined && accountTypeIndex === index ? colorWhite._1 : colorBlue._1;
          return (
            <Fragment key={index}>
              <CustomSpacer space={sh16} />
              <Pressable onPress={handlePress} pointerEvents={disabledEvents} style={containerStyle}>
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
    <RNModal animationType="fade" visible={visible}>
      <KeyboardAwareScrollView bounces={false} extraHeight={8} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
        <View style={{ ...centerHV, ...fullHW }}>
          <View style={modalContainer}>
            {prompt !== undefined ? (
              <NewSalesPrompt id={id!} idType={principalIdType} name={name!} prompt={prompt} />
            ) : (
              <View style={px(sw56)}>
                <CustomSpacer space={sh40} />
                {accountTypePrompt === true ? (
                  content
                ) : (
                  <Fragment>
                    {registered === false ? (
                      <Fragment>
                        {salesNewPrompt === true ? (
                          <View style={centerVertical}>
                            <Image source={LocalAssets.illustration.investorWarning} style={illustrationStyle} />
                            <CustomSpacer space={sh24} />
                            <LabeledTitle
                              label={newSalesPromptTitle}
                              labelStyle={{ ...fs24BoldBlue1, ...fsAlignCenter }}
                              spaceToLabel={sh16}
                              title={ADD_CLIENT.SALES_PROMPT_SUBTITLE}
                              titleStyle={{ ...fs16RegGray6, ...fsAlignCenter }}
                            />
                          </View>
                        ) : (
                          <Fragment>
                            <Text style={{ ...fs24BoldBlue1, ...titleStyle }}>{ADD_CLIENT.HEADING}</Text>
                            <NewSalesDetails
                              clientInfo={details![holderToFill]!}
                              clientType={clientTypeDetail}
                              ageErrorMessage={ageErrorMessage}
                              errorMessage={errorMessage}
                              holderToFill={holderToFill}
                              inputError1={inputError1}
                              setClientInfo={setClientInfo}
                              setAgeErrorMessage={setAgeErrorMessage}
                              setErrorMessage={setErrorMessage}
                              setInputError1={setInputError1}
                              subHeading={checkSubheading}
                              subHeadingStyle={fs16RegGray5}
                            />
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <NewSalesSummary accountType={accountType!} jointHolder={jointHolder} principalHolder={principalHolder!} />
                    )}
                  </Fragment>
                )}
                <CustomSpacer space={sh40} />
              </View>
            )}
            <ActionButtons
              buttonContainerStyle={buttonContainer}
              cancelButtonStyle={{ width: sw218 }}
              continueButtonStyle={{ width: sw218 }}
              continueLoading={loading}
              continueDisabled={continueDisabled}
              handleCancel={prompt === "bannedCountry" ? undefined : handleCancel}
              handleContinue={handleContinue}
              labelContinue={BUTTON_LABEL}
              labelCancel={checkCancelLabel}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </RNModal>
  );
};

export const NewSales = connect(ClientMapStateToProps, ClientMapDispatchToProps)(NewSalesComponent);
