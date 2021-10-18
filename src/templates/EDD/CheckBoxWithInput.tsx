import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View } from "react-native";

import { CustomTextInput, NewCheckBoxDropdownV2, UploadWithModal } from "../../components";
import { CheckBox } from "../../components/CheckBox/CheckBox";
import { TextInputMultiline } from "../../components/Input/TextInputMultiline";
import { Switch } from "../../components/Switch";
import { CustomSpacer } from "../../components/Views";
import { NunitoBold } from "../../constants";
import { Language } from "../../constants/language";
import {
  alignFlexStart,
  centerVertical,
  flexChild,
  flexRow,
  fs16RegBlack3,
  sh16,
  sh18,
  sh20,
  sh24,
  sh26,
  sh4,
  sh96,
  sw14,
  sw20,
  sw22,
  sw32,
  sw600,
  sw672,
} from "../../styles";
import { AnimationUtils, formatAmount, isNumber } from "../../utils";

const { DASHBOARD_EDD_CASE } = Language.PAGE;

export type CheckBoxInputType = "input" | "dropdown" | "remarkWithDocument";
export type InputType = "number" | "string";

declare interface ICheckBoxWithInput {
  data: IQuestionData;
  hasRemark?: boolean;
  hasDoc?: boolean;
  options?: IOptionField[];
  label: string;
  subLabel?: string;
  setData: (data: IQuestionData) => void;
}

export const CheckBoxWithInput: FunctionComponent<ICheckBoxWithInput> = ({
  data,
  hasRemark,
  hasDoc,
  label,
  subLabel,
  options,
  setData,
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
    const addInput = options !== undefined && checkInputIndex !== -1 ? { subSection: { [options[checkInputIndex].id]: "" } } : {};
    const addDropdown = checkDropdownIndex !== -1 ? { subSection: { [dropdownKey]: "" } } : {};
    setData({
      ...data,
      checkboxToggle: checkboxToggle !== undefined ? !checkboxToggle : true,
      answer: label,
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

  const handleValue = (key: string, text: string) => {
    setData({ ...data, subSection: { [key]: isNumber(text) ? text : "" } });
  };

  const handleBlur = (key: string) => {
    if (subSection![key] !== undefined) {
      setData({ ...data, subSection: { [key]: formatAmount(parseInt(subSection![key], 10)) } });
    }
  };

  const handleValues = (key: string, selected: string[]) => {
    setData({ ...data, subSection: { [key]: selected } });
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
        numberOfLines={1}
        onPress={handleToggle}
        label={label}
        labelStyle={{ ...fs16RegBlack3, ...selectedCheckbox }}
        subLabel={checkSubLabel}
        style={{ maxWidth: sw600, ...alignFlexStart }}
        toggle={checkboxToggle!}
      />
      {checkboxToggle === true ? (
        <Fragment>
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw22} />
            <View style={flexChild}>
              {options !== undefined && options !== null && options.length > 0
                ? options.map((option: IOptionField, optionIndex: number) => {
                    const { type, title, valuesDescription, id: optionId, multiSelection } = option;
                    const checkBoxDropdownValues: TypeLabelValue[] = [];

                    if (option.values !== undefined && option.values !== null) {
                      // eslint-disable-next-line array-callback-return
                      option.values.map((dropdownValue: string, valueIndex: number) => {
                        const valueDescription =
                          valuesDescription !== undefined && valuesDescription !== null && valuesDescription[valueIndex] !== ""
                            ? { subLabel: valuesDescription[valueIndex] }
                            : {};
                        checkBoxDropdownValues.push({ label: dropdownValue, value: dropdownValue, ...valueDescription });
                      });
                    }
                    switch (type) {
                      case "textarea":
                        content = (
                          <View>
                            <CustomSpacer space={sh18} />
                            <TextInputMultiline
                              maxLength={255}
                              label={title !== null ? title : undefined}
                              style={{ width: sw672, height: sh96 }}
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
                              label={title}
                              onChangeText={(text: string) => handleValue(optionId, text)}
                              onBlur={() => handleBlur(optionId)}
                              spaceToLabel={sh4}
                              value={subSection![optionId]}
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
                                <NewCheckBoxDropdownV2
                                  handleChange={(values: string[]) => handleValues(optionId, values)}
                                  items={checkBoxDropdownValues}
                                  label={title}
                                  labelStyle={{ lineHeight: sh16 }}
                                  value={subSection !== undefined ? subSection![optionId] : []}
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
                    labelStyle={{ ...fs16RegBlack3, ...selectedRemark }}
                    onPress={handleRemarkToggle}
                    style={{ width: sw32 }}
                    toggle={data.hasRemark!}
                  />
                  {data.hasRemark === true ? (
                    <Fragment>
                      <CustomSpacer space={sh18} />
                      <TextInputMultiline
                        maxLength={255}
                        onChangeText={handleRemark}
                        style={{ width: sw672, height: sh96 }}
                        showLength={true}
                        value={remark}
                      />
                    </Fragment>
                  ) : null}
                </Fragment>
              ) : null}
              {hasDoc === true ? (
                <Fragment>
                  <CustomSpacer space={sh18} />
                  <Switch
                    label={DASHBOARD_EDD_CASE.LABEL_ADD_DOCUMENT}
                    labelStyle={{ ...fs16RegBlack3, ...selectedDoc }}
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
