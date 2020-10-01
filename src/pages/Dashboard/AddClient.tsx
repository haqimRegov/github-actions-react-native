import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";

import {
  AdvancedDropdown,
  ConfirmationModal,
  CustomDatePicker,
  CustomSpacer,
  CustomTextInput,
  LabeledTitle,
  RadioButtonGroup,
  TextSpaceArea,
} from "../../components";
import { DATE_OF_BIRTH_FORMAT, DEFAULT_DATE_FORMAT, Language } from "../../constants";
import { DICTIONARY_ACCOUNT_TYPE, DICTIONARY_ALL_ID_TYPE, DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../data/dictionary";
import { verifyClient } from "../../network-actions";
import { ClientMapDispatchToProps, ClientMapStateToProps, ClientStoreProps } from "../../store";
import {
  colorTransparent,
  fs16BoldBlack1,
  fs16RegBlack2,
  fs24BoldBlack2,
  fs40BoldBlack2,
  px,
  sh143,
  sh16,
  sh24,
  sh32,
  sh40,
  sh8,
  sw16,
  sw218,
  sw48,
  sw56,
  sw74,
} from "../../styles";
import { HandleSessionTokenExpired } from "../../utils";

const { ADD_CLIENT } = Language.PAGE;

interface AddClientProps extends ClientStoreProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  setVisible: (visibility: boolean) => void;
  visible: boolean;
}

const AddClientComponent = (props: AddClientProps) => {
  const { accountType, addClientDetails, details, navigation, resetClientDetails, resetGlobal, setVisible, visible } = props;
  const { dateOfBirth, gender, idNumber, idType, name, otherIdType, verified } = details!;
  const [ref, setRef] = useState<TypeKeyboardAvoidingView>(null);

  const setInputIdType = (value: string) => addClientDetails({ ...details, idType: value as TypeClientIDChoices });
  const setInputOtherIdType = (value: string) => addClientDetails({ ...details, otherIdType: value as TypeClientIDChoices });
  const setInputName = (value: string) => addClientDetails({ ...details, name: value });
  const setInputIdNumber = (value: string) => addClientDetails({ ...details, idNumber: value });
  const setInputDateOfBirth = (value?: Date) => addClientDetails({ ...details, dateOfBirth: value });
  const setAccountType = (type: string) => props.addAccountType(type as TypeAccountChoices);

  // TODO actual ID
  const agentId = "999999999998";
  const keyboardType = idType === "NRIC" ? "numeric" : "default";
  const idMaxLength = idType === "NRIC" ? 12 : undefined;
  const ADD_CLIENT_HEADING = verified === true ? ADD_CLIENT.DETAILS_TITLE : ADD_CLIENT.HEADING;
  const BUTTON_LABEL = verified === true ? ADD_CLIENT.BUTTON_CONFIRM : ADD_CLIENT.BUTTON_STARTED;
  const LABEL_ID_DYNAMIC = idType !== "Other" ? idType : ADD_CLIENT.LABEL_ID;
  const LABEL_NAME = `${ADD_CLIENT.LABEL_NAME} ${LABEL_ID_DYNAMIC}`;
  const LABEL_ID = `${LABEL_ID_DYNAMIC} ${ADD_CLIENT.LABEL_NUMBER}`;
  const spaceToContent = verified === true ? sh32 : sh8;
  const titleStyle = verified === true ? {} : fs40BoldBlack2;

  const continueDisabled = idType === "NRIC" ? name === "" || idNumber === "" : name === "" || idNumber === "" || dateOfBirth === undefined;

  const formattedDob = details !== undefined ? moment(details.dateOfBirth).format("DD MMMM YYYY") : "";

  const handleCancel = () => {
    if (verified === false) {
      setVisible(false);
    }
    resetClientDetails();
  };

  const handleRef = (event: KeyboardAvoidingView | null) => {
    setRef(event as TypeKeyboardAvoidingView);
  };

  const handleNavigation = () => {
    setVisible(false);
    navigation.navigate("Onboarding");
  };

  const handleError = (error: any) => {
    // TODO temporary
    // eslint-disable-next-line no-console
    console.log("error", error);
    HandleSessionTokenExpired(resetGlobal, navigation);
  };

  const handleVerify = async () => {
    // TODO loading
    // setLoading(true);
    const selectedIDType = idType === "Other" ? otherIdType : idType;
    const idTypeIndex = DICTIONARY_ALL_ID_TYPE.indexOf(selectedIDType as TypeClientID);
    const accountTypeIndex = DICTIONARY_ACCOUNT_TYPE.indexOf(accountType);
    const inputDOB = moment(dateOfBirth).format(DEFAULT_DATE_FORMAT);
    const client: IVerifyClientResponse = await verifyClient(
      {
        id: idNumber!,
        name: name!,
        agentId: agentId,
        idType: idTypeIndex,
        accountType: accountTypeIndex,
        dateOfBirth: inputDOB,
      },
      handleError,
    );
    if (client === undefined) {
      return;
    }
    // setLoading(false);
    const { data, error } = client;
    if (error === null) {
      if (data !== null) {
        const birthDate = moment(data.result.dateOfBirth, DATE_OF_BIRTH_FORMAT).toDate();
        const clientDetails = {
          ...details,
          dateOfBirth: birthDate,
          gender: data.result.gender,
          clientId: data.result.clientId,
          verified: true,
        };
        if (idType !== "NRIC") {
          handleNavigation();
        }
        addClientDetails(clientDetails);
      }
    } else {
      Alert.alert(error.message);
    }
  };

  const handleContinue = () => {
    if (verified) {
      return handleNavigation();
    }
    return handleVerify();
  };

  useEffect(() => {
    addClientDetails({ name: "", idNumber: "", dateOfBirth: undefined });
  }, [addClientDetails, idType]);

  return (
    <ConfirmationModal
      cancelButtonStyle={{ width: sw218 }}
      continueButtonStyle={{ width: sw218 }}
      continueDisabled={continueDisabled}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      keyboardAvoidingRef={handleRef}
      labelContinue={BUTTON_LABEL}
      spaceToButton={sh40}
      spaceToContent={spaceToContent}
      title={ADD_CLIENT_HEADING}
      titleStyle={titleStyle}
      visible={visible}>
      <Fragment>
        {verified === false ? (
          <Fragment>
            <TextSpaceArea spaceToBottom={sh24} style={fs24BoldBlack2} text={ADD_CLIENT.SUBHEADING} />
            <TextSpaceArea spaceToBottom={sh8} text={ADD_CLIENT.LABEL_SELECT_ID_TYPE} />
            <RadioButtonGroup direction="row" options={DICTIONARY_ID_TYPE} selected={idType!} setSelected={setInputIdType} space={sw56} />
            {idType !== "Other" ? null : (
              <Fragment>
                <CustomSpacer space={sh24} />
                <AdvancedDropdown
                  handleChange={setInputOtherIdType}
                  items={DICTIONARY_ID_OTHER_TYPE}
                  label={ADD_CLIENT.LABEL_ID_TYPE}
                  value={otherIdType!}
                />
              </Fragment>
            )}
            <CustomTextInput label={LABEL_NAME} onChangeText={setInputName} spaceToBottom={sh24} spaceToTop={sh24} value={name} />
            <CustomTextInput
              keyboardType={keyboardType}
              label={LABEL_ID}
              maxLength={idMaxLength}
              onChangeText={setInputIdNumber}
              value={idNumber}
            />
            {idType === "NRIC" ? null : (
              <Fragment>
                <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh24} style={px(sw16)} text={ADD_CLIENT.LABEL_DOB} />
                <CustomDatePicker
                  selectedFormat={DATE_OF_BIRTH_FORMAT}
                  placeholder={ADD_CLIENT.PLACEHOLDER_DATE}
                  datePickerStyle={{ height: sh143 }}
                  dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
                  keyboardAvoidingRef={ref}
                  mode="date"
                  maximumDate={moment().subtract(18, "years").toDate()}
                  initialDate={moment().subtract(18, "years").toDate()}
                  setValue={setInputDateOfBirth}
                  value={dateOfBirth}
                />
              </Fragment>
            )}
            <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh24} style={fs16RegBlack2} text={ADD_CLIENT.LABEL_SELECT_ACCOUNT_TYPE} />
            <RadioButtonGroup
              direction="row"
              options={DICTIONARY_ACCOUNT_TYPE}
              selected={accountType}
              setSelected={setAccountType}
              space={sw74}
            />
          </Fragment>
        ) : (
          <Fragment>
            <LabeledTitle label={ADD_CLIENT.DETAILS_LABEL_NAME} spaceToBottom={sh24} title={name!} titleStyle={fs16BoldBlack1} />
            <LabeledTitle label={idType!} spaceToBottom={sh24} title={idNumber!} titleStyle={fs16BoldBlack1} />
            <LabeledTitle label={ADD_CLIENT.DETAILS_LABEL_GENDER} spaceToBottom={sh24} title={gender!} titleStyle={fs16BoldBlack1} />
            <LabeledTitle label={ADD_CLIENT.DETAILS_LABEL_DOB} spaceToBottom={sh24} title={formattedDob} titleStyle={fs16BoldBlack1} />
            <LabeledTitle label={ADD_CLIENT.LABEL_ACCOUNT_TYPE} title={accountType} titleStyle={fs16BoldBlack1} />
          </Fragment>
        )}
      </Fragment>
    </ConfirmationModal>
  );
};

export const AddClient = connect(ClientMapStateToProps, ClientMapDispatchToProps)(AddClientComponent);
