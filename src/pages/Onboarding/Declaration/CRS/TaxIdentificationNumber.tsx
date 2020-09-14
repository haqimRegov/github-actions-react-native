import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import {
  AdvancedDropdown,
  AdvanceRadioGroup,
  CheckBox,
  CustomPopup,
  CustomSpacer,
  CustomTextInput,
  IAdvanceRadio,
  IconButton,
  OutlineButton,
  TextInputArea,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import {
  borderBottomBlack21,
  colorBlack,
  flexRow,
  fs12BoldBlack2,
  fs16RegBlack2,
  px,
  sh12,
  sh16,
  sh24,
  sh32,
  sw24,
  sw264,
  sw32,
  sw8,
} from "../../../../styles";

const { DECLARATION } = Language.PAGE;

export const NO_TIN_OPTIONS: IAdvanceRadio[] = [
  { label: DECLARATION.OPTION_NO_TIN_COUNTRY, value: DECLARATION.OPTION_NO_TIN_COUNTRY },
  {
    label: DECLARATION.OPTION_NO_TIN_REQUIRED,
    right: (
      <View style={flexRow}>
        <CustomSpacer isHorizontal={true} space={sw8} />
        <CustomPopup popupStyle={{ width: sw264 }} popupText={DECLARATION.INFO_NO_TIN}>
          <IcoMoon name="info" size={sh24} />
        </CustomPopup>
      </View>
    ),
    value: DECLARATION.OPTION_NO_TIN_REQUIRED,
  },
  { label: DECLARATION.OPTION_NO_TIN_OTHER, value: DECLARATION.OPTION_NO_TIN_OTHER },
];

interface TaxIdentificationNumberProps {
  inputTaxIdNumber: ITinState[];
  setInputTaxIdNumber: (input: ITinState[]) => void;
}

export const TaxIdentificationNumber: FunctionComponent<TaxIdentificationNumberProps> = ({
  inputTaxIdNumber,
  setInputTaxIdNumber,
}: TaxIdentificationNumberProps) => {
  const handleAddTin = () => {
    const countryTaxNumber = [...inputTaxIdNumber];
    countryTaxNumber.push({
      country: "",
      explanation: "",
      tinNumber: "",
      noTin: false,
      reason: NO_TIN_OPTIONS[0].value,
    });
    setInputTaxIdNumber(countryTaxNumber);
  };

  return (
    <View>
      <Fragment>
        <CustomSpacer space={sh32} />
        <TextSpaceArea spaceToBottom={sh16} style={{ ...fs16RegBlack2, ...px(sw24) }} text={DECLARATION.LABEL_DECLARE_COUNTRY} />
        {inputTaxIdNumber.map((item: ITinState, index: number) => {
          const handleCountry = (input: string) => {
            const updatedCountry = [...inputTaxIdNumber];
            updatedCountry[index].country = input;
            setInputTaxIdNumber(updatedCountry);
          };

          const handleDelete = () => {
            const updatedTaxNumber = [...inputTaxIdNumber];
            updatedTaxNumber.splice(index, 1);
            setInputTaxIdNumber(updatedTaxNumber);
          };

          const handleTaxNumber = (input: string) => {
            const updatedTaxNumber = [...inputTaxIdNumber];
            updatedTaxNumber[index].tinNumber = input;
            setInputTaxIdNumber(updatedTaxNumber);
          };

          const handleReason = (input: string) => {
            const updatedReason = [...inputTaxIdNumber];
            if (input !== NO_TIN_OPTIONS[2].value) {
              updatedReason[index].explanation = "";
            }
            updatedReason[index].reason = input;
            setInputTaxIdNumber(updatedReason);
          };

          const handleOtherReason = (input: string) => {
            const updatedOtherReason = [...inputTaxIdNumber];
            updatedOtherReason[index].explanation = input;
            setInputTaxIdNumber(updatedOtherReason);
          };

          const handleNoTaxNumber = () => {
            const updatedTaxNumber = [...inputTaxIdNumber];
            const [initial] = NO_TIN_OPTIONS;
            updatedTaxNumber[index].reason = initial.value;
            updatedTaxNumber[index].noTin = !updatedTaxNumber[index].noTin;
            setInputTaxIdNumber(updatedTaxNumber);
          };

          return (
            <Fragment key={index}>
              <View style={flexRow}>
                <View style={px(sw24)}>
                  <AdvancedDropdown
                    items={DICTIONARY_COUNTRIES}
                    label={DECLARATION.LABEL_SELECT_COUNTRY}
                    handleChange={handleCountry}
                    value={inputTaxIdNumber[index].country!}
                  />
                  <CustomSpacer space={sh32} />
                  <CustomTextInput label={DECLARATION.LABEL_TIN} onChangeText={handleTaxNumber} value={item.tinNumber!} />
                  <Fragment>
                    <CustomSpacer space={sh16} />
                    {index !== 0 ? null : (
                      <CheckBox
                        label={DECLARATION.LABEL_NO_TIN}
                        labelStyle={fs12BoldBlack2}
                        onPress={handleNoTaxNumber}
                        toggle={item.noTin!}
                      />
                    )}
                    {item.noTin! ? (
                      <View style={px(sw32)}>
                        <CustomSpacer space={sh12} />
                        <AdvanceRadioGroup options={NO_TIN_OPTIONS} selected={item.reason!} setSelected={handleReason} />
                        {item.reason === NO_TIN_OPTIONS[2].value ? (
                          <TextInputArea
                            label={DECLARATION.LABEL_NO_TIN_REASON}
                            onChangeText={handleOtherReason}
                            placeholder={DECLARATION.PLACEHOLDER_REASON}
                            spaceToTop={sh16}
                            value={item.explanation!}
                          />
                        ) : null}
                      </View>
                    ) : null}
                  </Fragment>
                  <CustomSpacer space={sh24} />
                </View>
                {index === 0 ? null : (
                  <View>
                    <CustomSpacer space={sh32} />
                    <IconButton name="trash" color={colorBlack._1} onPress={handleDelete} size={sh24} />
                  </View>
                )}
              </View>
            </Fragment>
          );
        })}
        <View style={borderBottomBlack21} />
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          <OutlineButton onPress={handleAddTin} text={DECLARATION.BUTTON_ADDITIONAL} icon="plus" />
        </View>
      </Fragment>
    </View>
  );
};
