import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View } from "react-native";

import { CustomTextInput, NewCheckBoxDropdown, UploadWithModal } from "../../components";
import { CheckBox } from "../../components/CheckBox/CheckBox";
import { TextInputMultiline } from "../../components/Input/TextInputMultiline";
import { Switch } from "../../components/Switch";
import { CustomSpacer } from "../../components/Views";
import { NunitoBold } from "../../constants";
import { Language } from "../../constants/language";
import { ERROR } from "../../data/dictionary";
import {
  alignFlexStart,
  centerVertical,
  flexChild,
  flexRow,
  fs16RegBlack2,
  sh16,
  sh18,
  sh20,
  sh24,
  sh26,
  sw14,
  sw20,
  sw22,
  sw32,
  sw600,
} from "../../styles";
import { AnimationUtils, formatAmount, isAmount, validateInput } from "../../utils";

const { DASHBOARD_EDD_CASE } = Language.PAGE;

export type CheckBoxInputType = "input" | "dropdown" | "remarkWithDocument";
export type InputType = "number" | "string";

declare interface ICheckBoxWithInput {
  data: IQuestionData;
  hasDoc?: boolean;
  hasRemark?: boolean;
  label: string;
  options?: IOptionField[];
  setData: (data: IQuestionData) => void;
  subLabel?: string;
}

export const CheckBoxWithInput: FunctionComponent<ICheckBoxWithInput> = ({
  data,
  hasDoc,
  hasRemark,
  label,
  options,
  setData,
  subLabel,
}: ICheckBoxWithInput) => {
  const { checkboxToggle, remark, document, subSection } = data;

  const handleToggle = () => {
    const checkRemark =
      options !== undefined && options !== null ? options.findIndex((option: IOptionField) => option.type === "textarea") : -1;
    const checkInputIndex =
      options !== undefined && options !== null ? options.findIndex((option: IOptionField) => option.type === "inputtext") : -1;
    const checkDropdownIndex =
      options !== undefined && options !== null ? options.findIndex((option: IOptionField) => option.type === "dropdown") : -1;
    const dropdownKey: string =
      options !== undefined && options !== null && checkDropdownIndex !== -1 && options[checkDropdownIndex].id !== null
        ? options[checkDropdownIndex].id
        : "values";
    const addRemark = checkRemark !== -1 ? { remark: "" } : {};
    const addInput =
      options !== undefined && checkInputIndex !== -1 ? { subSection: { [options[checkInputIndex].id]: { answer: "" } } } : {};
    const addDropdown = checkDropdownIndex !== -1 ? { subSection: { [dropdownKey]: { answer: "" } } } : {};
    setData({
      ...data,
      checkboxToggle: checkboxToggle !== undefined ? !checkboxToggle : true,
      answer: { answer: label },
      hasRemark: options !== undefined && options !== null && checkRemark !== -1,
      hasDoc: false,
      ...addRemark,
      ...addInput,
      ...addDropdown,
    });
    AnimationUtils.layout({ duration: 200 });
  };

  const handleRemarkToggle = () => {
    setData({ ...data, hasRemark: !data.hasRemark, remark: "" });
  };

  const handleDocumentToggle = () => {
    setData({ ...data, hasDoc: !data.hasDoc, document: undefined });
  };

  const handleDocument = (file: FileBase64 | undefined) => {
    setData({ ...data, document: file });
  };

  const handleRemark = (text: string) => {
    setData({ ...data, hasRemark: true, remark: text });
  };

  const handleValues = (key: string, selected: string[]) => {
    setData({ ...data, subSection: { [key]: { answer: selected } } });
  };

  const checkSubLabel = subLabel !== undefined && subLabel !== null ? subLabel : undefined;
  const selectedCheckbox: TextStyle = checkboxToggle === true ? { fontFamily: NunitoBold } : {};
  const selectedRemark: TextStyle = data.hasRemark === true ? { fontFamily: NunitoBold } : {};
  const selectedDoc: TextStyle = data.hasDoc === true ? { fontFamily: NunitoBold } : {};
  let content: JSX.Element = <View />;
  return (
    <View>
      <CheckBox
        boxStyle={{ ...centerVertical, width: sw20, height: sh20 }}
        checkboxStyle={alignFlexStart}
        iconSize={sw14}
        label={label}
        labelStyle={{ ...fs16RegBlack2, ...selectedCheckbox }}
        numberOfLines={1}
        onPress={handleToggle}
        style={{ maxWidth: sw600, ...alignFlexStart }}
        subLabel={checkSubLabel}
        toggle={checkboxToggle!}
      />
      {checkboxToggle === true ? (
        <Fragment>
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw22} />
            <View style={flexChild}>
              {options !== undefined && options !== null && options.length > 0
                ? options.map((option: IOptionField, optionIndex: number) => {
                    const { format, type, title, valuesDescription, id: optionId, multiSelection } = option;
                    const checkBoxDropdownValues: TypeLabelValue[] = [];

                    if (option.values !== undefined && option.values !== null) {
                      option.values.forEach((dropdownValue: string, valueIndex: number) => {
                        const valueDescription =
                          valuesDescription !== undefined && valuesDescription !== null && valuesDescription[valueIndex] !== ""
                            ? { subLabel: valuesDescription[valueIndex] }
                            : {};
                        checkBoxDropdownValues.push({ label: dropdownValue, value: dropdownValue, ...valueDescription });
                      });
                    }

                    const handleValue = (key: string, text: string) => {
                      const tempAnswers: IQuestionData = { ...data };
                      let checkInput: IInputValidation = { error: false, errorMessage: "" };
                      const cleanValue = text.replace(/[,.]/g, "");
                      if (format !== null && format !== undefined && format.type !== null) {
                        const dataToValidate = format.type === "amount" ? cleanValue : text;
                        checkInput = validateInput(dataToValidate, format.type);
                      }
                      const checkAnswer =
                        "subSection" in tempAnswers && tempAnswers.subSection !== undefined && key in tempAnswers.subSection
                          ? tempAnswers.subSection[key].answer
                          : "";
                      const updatedAnswer = checkInput.error === false || text === "" ? text : checkAnswer;
                      setData({ ...data, subSection: { [key]: { answer: updatedAnswer } } });
                    };

                    const handleBlur = (key: string) => {
                      let updatedAnswer = "";
                      const answerObject = { ...data.subSection![key] };
                      const value = answerObject.answer! as string;
                      let checkInput: IInputValidation = { error: false, errorMessage: "" };
                      if (subSection![key] !== undefined && format !== undefined && format.type === "amount") {
                        const cleanValue = value.replace(/[,]/g, "");
                        checkInput =
                          isAmount(parseFloat(cleanValue.replace(/[,]/g, "")).toString()) === true
                            ? { ...checkInput }
                            : { ...checkInput, errorMessage: ERROR.INVESTMENT_INVALID_AMOUNT };
                        updatedAnswer =
                          isAmount(parseFloat(cleanValue.replace(/[,]/g, "")).toString()) === false
                            ? (data.subSection![key].answer as string)
                            : formatAmount(cleanValue);
                      } else if (format !== null && format !== undefined && format.type !== undefined) {
                        updatedAnswer = value;
                        checkInput = validateInput(value, format.type);
                      }
                      const error = checkInput.errorMessage !== "" ? { error: checkInput.errorMessage } : {};
                      setData({
                        ...data,
                        subSection: {
                          [key]: { answer: updatedAnswer, ...error },
                        },
                      });
                    };
                    switch (type) {
                      case "textarea":
                        content = (
                          <View>
                            <CustomSpacer space={sh18} />
                            <TextInputMultiline
                              maxLength={255}
                              label={title !== null ? title : undefined}
                              onChangeText={handleRemark}
                              showLength={true}
                              value={remark}
                            />
                          </View>
                        );
                        break;
                      case "inputtext":
                        content = (
                          <View>
                            <CustomSpacer space={sh18} />
                            <CustomTextInput
                              error={subSection![optionId].error}
                              keyboardType={
                                format !== null && (format?.type === "amount" || format?.type === "number") ? "numeric" : "default"
                              }
                              label={title}
                              maxLength={
                                format !== null && format!.limit !== null && format!.limit !== undefined ? format!.limit : undefined
                              }
                              onChangeText={(text: string) => handleValue(optionId, text)}
                              onBlur={() => handleBlur(optionId)}
                              value={subSection![optionId].answer as string}
                            />
                            <CustomSpacer space={sh16} />
                          </View>
                        );
                        break;
                      case "dropdown":
                        content = (
                          <View>
                            {multiSelection === true ? (
                              <Fragment>
                                <CustomSpacer space={sh18} />
                                <NewCheckBoxDropdown
                                  handleChange={(values: string[]) => handleValues(optionId, values)}
                                  items={checkBoxDropdownValues}
                                  label={title}
                                  value={subSection !== undefined ? (subSection[optionId].answer as string[]) : []}
                                />
                                <CustomSpacer space={sh16} />
                              </Fragment>
                            ) : null}
                          </View>
                        );
                        break;
                      default:
                        content = <View />;
                    }
                    return <Fragment key={optionIndex}>{content}</Fragment>;
                  })
                : null}
              {hasRemark === true ? (
                <Fragment>
                  <CustomSpacer space={sh26} />
                  <Switch
                    label={DASHBOARD_EDD_CASE.LABEL_ADD_REMARK}
                    labelStyle={{ ...fs16RegBlack2, ...selectedRemark }}
                    onPress={handleRemarkToggle}
                    style={{ width: sw32 }}
                    toggle={data.hasRemark!}
                  />
                  {data.hasRemark === true ? (
                    <Fragment>
                      <CustomSpacer space={sh18} />
                      <TextInputMultiline maxLength={255} onChangeText={handleRemark} showLength={true} value={remark} />
                    </Fragment>
                  ) : null}
                </Fragment>
              ) : null}
              {hasDoc === true ? (
                <Fragment>
                  <CustomSpacer space={sh18} />
                  <Switch
                    label={DASHBOARD_EDD_CASE.LABEL_ADD_DOCUMENT}
                    labelStyle={{ ...fs16RegBlack2, ...selectedDoc }}
                    onPress={handleDocumentToggle}
                    style={{ width: sw32 }}
                    toggle={data.hasDoc!}
                  />
                  {data.hasDoc === true ? (
                    <Fragment>
                      <CustomSpacer space={sh18} />
                      <UploadWithModal
                        features={["camera", "gallery", "file"]}
                        label={DASHBOARD_EDD_CASE.LABEL_DOCUMENT}
                        onSuccess={handleDocument}
                        setValue={handleDocument}
                        value={document}
                      />
                    </Fragment>
                  ) : null}
                  <CustomSpacer space={sh24} />
                </Fragment>
              ) : null}
            </View>
          </View>
        </Fragment>
      ) : null}
    </View>
  );
};
