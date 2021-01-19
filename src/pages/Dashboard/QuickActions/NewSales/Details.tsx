import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { AdvancedDropdown, CustomDatePicker, CustomSpacer, CustomTextInput, RadioButtonGroup, TextSpaceArea } from "../../../../components";
import { DATE_OF_BIRTH_FORMAT, Language } from "../../../../constants";
import { DICTIONARY_ACCOUNT_TYPE, DICTIONARY_COUNTRIES, DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../../../data/dictionary";
import { colorTransparent, fs16RegBlack2, fs24BoldBlack2, sh143, sh24, sh8, sw48, sw56, sw74 } from "../../../../styles";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesDetailsProps {
  accountType: TypeAccountChoices;
  holderToFill: "jointHolder" | "principalHolder";
  clientType: TypeClient | "";
  errorMessage: string | undefined;
  clientInfo: IClientBasicInfo;
  setAccountType: (value: string) => void;
  setClientInfo: (value: IClientBasicInfo) => void;
}

export const NewSalesDetails: FunctionComponent<NewSalesDetailsProps> = ({
  accountType,
  clientType,
  holderToFill,
  errorMessage,
  setAccountType,
  clientInfo,
  setClientInfo,
}: NewSalesDetailsProps) => {
  const { country, dateOfBirth, id, idType, otherIdType, name } = clientInfo;
  const title = holderToFill === "principalHolder" ? ADD_CLIENT.LABEL_CHOOSE_ACCOUNT_TYPE : ADD_CLIENT.SUBHEADING_JOINT;
  const subheading = clientType !== "" ? title : ADD_CLIENT.SUBHEADING;
  const keyboardType = idType === "NRIC" ? "numeric" : "default";
  const idMaxLength = idType === "NRIC" ? 12 : undefined;
  const LABEL_ID_DYNAMIC = idType !== "Other" ? idType : `${otherIdType} ${ADD_CLIENT.LABEL_ID}`;
  const LABEL_NAME = `${ADD_CLIENT.LABEL_NAME} ${LABEL_ID_DYNAMIC}`;
  const LABEL_ID = `${LABEL_ID_DYNAMIC} ${ADD_CLIENT.LABEL_NUMBER}`;

  const setInputIdType = (value: TypeIDChoices) => setClientInfo({ ...[holderToFill], idType: value, name: "", id: "" });
  const setInputOtherIdType = (value: TypeIDOther) => setClientInfo({ ...[holderToFill], otherIdType: value });
  const setInputCountry = (value: string) => setClientInfo({ ...[holderToFill], country: value });
  const setInputName = (value: string) => setClientInfo({ ...[holderToFill], name: value });
  const setInputIdNumber = (value: string) => setClientInfo({ ...[holderToFill], id: value });
  const setInputDateOfBirth = (value?: Date) =>
    setClientInfo({ ...[holderToFill], dateOfBirth: moment(value).format(DATE_OF_BIRTH_FORMAT) });

  const handleOtherIdType = (value: string) => {
    setInputOtherIdType(value as TypeIDOther);
  };

  const handleIdType = (value: string) => {
    setInputIdType(value as TypeIDChoices);
  };
  const hideInput = clientType !== "" && holderToFill === "principalHolder";
  const disabledStyle: ViewStyle = hideInput ? { opacity: 0.5 } : {};
  const dateValue = dateOfBirth !== "" ? moment(dateOfBirth, DATE_OF_BIRTH_FORMAT).toDate() : undefined;

  return (
    <View>
      <Fragment>
        <TextSpaceArea style={fs24BoldBlack2} text={subheading} />
        {hideInput ? null : (
          <Fragment>
            <TextSpaceArea spaceToTop={sh24} spaceToBottom={sh8} text={ADD_CLIENT.LABEL_SELECT_ID_TYPE} />
            <RadioButtonGroup direction="row" options={DICTIONARY_ID_TYPE} selected={idType!} setSelected={handleIdType} space={sw56} />
          </Fragment>
        )}
        {idType !== "Other" || hideInput ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <AdvancedDropdown
              handleChange={handleOtherIdType}
              items={DICTIONARY_ID_OTHER_TYPE}
              label={ADD_CLIENT.LABEL_ID_TYPE}
              value={otherIdType!}
            />
          </Fragment>
        )}
        <CustomTextInput
          autoCapitalize="words"
          disabled={clientType !== "" && holderToFill === "principalHolder"}
          label={LABEL_NAME}
          onChangeText={setInputName}
          spaceToBottom={sh24}
          spaceToTop={sh24}
          value={name}
        />
        <CustomTextInput
          disabled={clientType !== "" && holderToFill === "principalHolder"}
          error={errorMessage}
          keyboardType={keyboardType}
          label={LABEL_ID}
          maxLength={idMaxLength}
          onChangeText={setInputIdNumber}
          value={id}
        />
        {idType === "NRIC" ? null : (
          <Fragment>
            <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh24} style={disabledStyle} text={ADD_CLIENT.LABEL_DOB} />
            <CustomDatePicker
              disabled={clientType !== "" && holderToFill === "principalHolder"}
              selectedFormat={DATE_OF_BIRTH_FORMAT}
              placeholder={ADD_CLIENT.PLACEHOLDER_DATE}
              datePickerStyle={{ height: sh143 }}
              dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
              //   keyboardAvoidingRef={ref}
              mode="date"
              setValue={setInputDateOfBirth}
              value={dateValue}
            />
          </Fragment>
        )}
        {idType === "Passport" ? (
          <AdvancedDropdown
            disabled={clientType !== "" && holderToFill === "principalHolder"}
            items={DICTIONARY_COUNTRIES}
            handleChange={setInputCountry}
            label={ADD_CLIENT.LABEL_COUNTRY}
            spaceToTop={sh24}
            value={country || ""}
          />
        ) : null}
        {clientType === "NTB" && holderToFill === "principalHolder" ? (
          <Fragment>
            <TextSpaceArea
              spaceToBottom={sh8}
              spaceToTop={sh24}
              style={{ ...fs16RegBlack2, lineHeight: sh24 }}
              text={ADD_CLIENT.LABEL_SELECT_ACCOUNT_TYPE}
            />
            <RadioButtonGroup
              direction="row"
              options={DICTIONARY_ACCOUNT_TYPE}
              selected={accountType}
              setSelected={setAccountType}
              space={sw74}
            />
          </Fragment>
        ) : null}
      </Fragment>
    </View>
  );
};
