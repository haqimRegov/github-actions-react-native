import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";

import {
  ConfirmationModal,
  CustomDatePicker,
  CustomDropdown,
  CustomSpacer,
  CustomTextInput,
  LabeledTitle,
  RadioButtonGroup,
  TextSpaceArea,
} from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_ACCOUNT_TYPE, DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../data/dictionary";
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
} from "../../styles";

const { ADD_CLIENT } = Language.PAGE;

interface AddClientProps extends ClientStoreProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  setVisible: (visibility: boolean) => void;
  visible: boolean;
}

const AddClientComponent = (props: AddClientProps) => {
  const { accountType, navigation, setVisible, visible } = props;
  const clientDetails = props.details;

  const [ref, setRef] = useState<TypeKeyboardAvoidingView>(null);
  const [radioIDType, setRadioIDType] = useState<string>(DICTIONARY_ID_TYPE[0]);
  const [inputOtherIDType, setInputOtherIDType] = useState<string>(DICTIONARY_ID_OTHER_TYPE[0].value);
  const [inputClientName, setInputClientName] = useState<string>("");
  const [inputClientID, setInputClientID] = useState<string>("");
  const [inputClientDOB, setInputClientDOB] = useState<Date | undefined>(undefined);

  const setAccountType = (type: string) => props.addAccountType(type as TypeAccountChoices);

  const handleCancel = () => {
    return clientDetails !== undefined ? props.resetClientDetails() : setVisible(false);
  };

  const handleRef = (event: KeyboardAvoidingView | null) => {
    setRef(event as TypeKeyboardAvoidingView);
  };

  const handleContinue = () => {
    const selectedIDType = radioIDType === "Other" ? inputOtherIDType : radioIDType;
    const IDType = selectedIDType as TypeClientID;
    verifyClient(props, { id: inputClientID, idType: IDType, name: inputClientName });
    if (clientDetails !== undefined || radioIDType !== "NRIC") {
      setVisible(false);

      return navigation.navigate("Onboarding");
    }

    return false;
  };

  const ADD_CLIENT_HEADING = clientDetails !== undefined ? ADD_CLIENT.DETAILS_TITLE : ADD_CLIENT.HEADING;
  const BUTTON_LABEL = clientDetails !== undefined ? ADD_CLIENT.BUTTON_CONFIRM : ADD_CLIENT.BUTTON_STARTED;
  const LABEL_ID_DYNAMIC = radioIDType !== "Other" ? radioIDType : ADD_CLIENT.LABEL_ID;
  const LABEL_NAME = `${ADD_CLIENT.LABEL_NAME} ${LABEL_ID_DYNAMIC}`;
  const LABEL_ID = `${LABEL_ID_DYNAMIC} ${ADD_CLIENT.LABEL_NUMBER}`;
  const spaceToContent = clientDetails === undefined ? sh8 : sh32;
  const titleStyle = clientDetails !== undefined ? {} : fs40BoldBlack2;

  const continueDisabled =
    radioIDType === "NRIC"
      ? inputClientName === "" || inputClientID === ""
      : inputClientName === "" || inputClientID === "" || inputClientDOB === undefined;

  useEffect(() => {
    setInputClientName("");
    setInputClientID("");
    setInputClientDOB(undefined);
  }, [radioIDType]);

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
        {clientDetails === undefined ? (
          <Fragment>
            <TextSpaceArea spaceToBottom={sh24} style={fs24BoldBlack2} text={ADD_CLIENT.SUBHEADING} />
            <TextSpaceArea spaceToBottom={sh16} text={ADD_CLIENT.LABEL_SELECT_ID_TYPE} />
            <RadioButtonGroup
              direction="row"
              labels={DICTIONARY_ID_TYPE}
              selected={radioIDType}
              setSelected={setRadioIDType}
              space={sw56}
            />
            {radioIDType !== "Other" ? null : (
              <Fragment>
                <CustomSpacer space={sh24} />
                <CustomDropdown
                  data={DICTIONARY_ID_OTHER_TYPE}
                  handleChange={setInputOtherIDType}
                  label={ADD_CLIENT.LABEL_ID_TYPE}
                  value={inputOtherIDType}
                />
              </Fragment>
            )}
            <CustomTextInput label={LABEL_NAME} onChangeText={setInputClientName} spaceToTop={sh32} value={inputClientName} />
            <CustomTextInput label={LABEL_ID} onChangeText={setInputClientID} spaceToTop={sh32} value={inputClientID} />
            {radioIDType === "NRIC" ? null : (
              <Fragment>
                <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh24} style={px(sw16)} text={ADD_CLIENT.LABEL_DOB} />
                <CustomDatePicker
                  datePickerStyle={{ height: sh143 }}
                  dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
                  keyboardAvoidingRef={ref}
                  mode="date"
                  setValue={setInputClientDOB}
                  value={inputClientDOB}
                />
              </Fragment>
            )}
            <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh24} style={fs16RegBlack2} text={ADD_CLIENT.LABEL_SELECT_ACCOUNT_TYPE} />
            <RadioButtonGroup direction="row" labels={DICTIONARY_ACCOUNT_TYPE} selected={accountType} setSelected={setAccountType} />
          </Fragment>
        ) : (
          <Fragment>
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_NAME}
              spaceToBottom={sh24}
              spaceToLabel={sh8}
              title={clientDetails.name}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle
              label={radioIDType}
              spaceToBottom={sh24}
              spaceToLabel={sh8}
              title={clientDetails.id}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_GENDER}
              spaceToBottom={sh24}
              spaceToLabel={sh8}
              title={clientDetails.gender}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_DOB}
              spaceToBottom={sh24}
              spaceToLabel={sh8}
              title={clientDetails.dateOfBirth}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle label={ADD_CLIENT.LABEL_ACCOUNT_TYPE} spaceToLabel={sh8} title={accountType} titleStyle={fs16BoldBlack1} />
          </Fragment>
        )}
      </Fragment>
    </ConfirmationModal>
  );
};

export const AddClient = connect(ClientMapStateToProps, ClientMapDispatchToProps)(AddClientComponent);
