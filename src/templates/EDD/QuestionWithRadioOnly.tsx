import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { AdvanceToggleButton, CustomSpacer, CustomTextInput, CustomTooltip, NewDropdown, TextInputMultiline } from "../../components";
import { NunitoRegular } from "../../constants";
import { ERROR } from "../../data/dictionary";
import {
  centerHV,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs12RegWhite1,
  fs16BoldBlack2,
  fullWidth,
  px,
  py,
  sh11,
  sh16,
  sh18,
  sw100,
  sw12,
  sw14,
  sw148,
  sw18,
  sw296,
  sw36,
  sw360,
  sw54,
  sw66,
  sw7,
} from "../../styles";
import { AnimationUtils, deleteKey, formatAmount, isAmount, validateInput } from "../../utils";

declare interface IQuestionWithRadioOnly {
  data: IQuestionDataWithHide;
  options?: IOptionField[];
  setData: (data: IQuestionDataWithHide) => void;
}

export const QuestionWithRadioOnly: FunctionComponent<IQuestionWithRadioOnly> = ({ data, options, setData }: IQuestionWithRadioOnly) => {
  const { answers } = data;
  const { answer, remark, subSection } = answers[0];

  const border = { borderBottomWidth: 0.5, borderBottomColor: colorGray._3 };
  const findIndex = options !== undefined ? options.findIndex((findOption: IOptionField) => findOption.title === answer!.answer) : -1;
  const checkOption: ViewStyle = options !== null && options !== undefined && options.length <= 2 ? { ...flexRow } : {};

  return (
    <View style={py(sh16)}>
      <View style={{ ...px(sw36), ...checkOption }}>
        {options !== null && options !== undefined && options.length > 0
          ? options.map((option: IOptionField, optionIndex: number) => {
              const { info, title, description, optionIndex: answerOptionIndex } = option;

              const handleOption1 = () => {
                const tempAnswers = [...data.answers];
                tempAnswers[answerOptionIndex!].answer!.answer = title;
                const insideFindIndex = options.findIndex(
                  (findOption: IOptionField) => findOption.title === tempAnswers[answerOptionIndex!].answer!.answer,
                );
                const checkInnerOptions =
                  insideFindIndex !== -1 &&
                  options[insideFindIndex].options!.length === 1 &&
                  options[insideFindIndex].options![0].type === "textarea"
                    ? { hasRemark: true, remark: "" }
                    : {};
                const answerWithoutSubSection = deleteKey(tempAnswers[0], ["subSection"]);
                tempAnswers[0] = { ...answerWithoutSubSection, ...checkInnerOptions };
                setData({ answers: tempAnswers, autoHide: data.autoHide });
                AnimationUtils.layout();
              };

              const checkDescription = description !== null && description !== undefined ? { subLabel: description } : {};

              return (
                <Fragment key={optionIndex}>
                  {optionIndex !== 0 ? <CustomSpacer isHorizontal space={sw54} /> : null}
                  <View style={{ width: sw296 }}>
                    <AdvanceToggleButton
                      buttonStyle={{ width: sw18, height: sh18 }}
                      labels={[
                        {
                          label: title!,
                          labelStyle: answer!.answer !== title ? { fontFamily: NunitoRegular } : {},
                          ...checkDescription,
                        },
                      ]}
                      onSelect={handleOption1}
                      sideElement={
                        info !== undefined && info !== null ? (
                          <CustomTooltip
                            arrowSize={{ width: sw12, height: sw7 }}
                            content={
                              <View>
                                <Text style={fs12RegWhite1}>{info}</Text>
                              </View>
                            }
                            contentStyle={{ width: sw148 }}
                            children={
                              <View style={{ ...flexChild, ...centerHV }}>
                                <View
                                  style={{ width: sw14, height: sw14, ...centerHV, borderRadius: sw100, backgroundColor: colorBlue._1 }}>
                                  <Text style={{ fontSize: sh11, color: colorWhite._1 }}>i</Text>
                                </View>
                              </View>
                            }
                            spacing={0}
                          />
                        ) : undefined
                      }
                      space={sw66}
                      value={answer!.answer === title ? 0 : 1}
                    />
                  </View>
                </Fragment>
              );
            })
          : null}
      </View>
      {findIndex !== -1 ? (
        <View>
          {options !== undefined &&
          options !== null &&
          options.length > 0 &&
          options[findIndex].options !== undefined &&
          options[findIndex].options!.length > 0
            ? options[findIndex].options!.map((insideOption: IOptionField, insideOptionIndex: number) => {
                const { type, values, id: optionId, format } = insideOption;
                const questionDropdownValues: TypeLabelValue[] = [];
                const defaultKey = optionId !== null ? optionId : "remark";

                const handleInput = (insideKey: string, text: string) => {
                  const tempAnswers: IQuestionData[] = [...data.answers];
                  let checkInput: IInputValidation = { error: false, errorMessage: "" };
                  const cleanValue = text.replace(/[,.]/g, "");
                  if (format !== null && format !== undefined && format.type !== null) {
                    const dataToValidate = format.type === "amount" ? cleanValue : text;
                    checkInput = validateInput(dataToValidate, format.type);
                  }
                  const checkAnswer =
                    "subSection" in tempAnswers[0] && tempAnswers[0].subSection !== undefined && insideKey in tempAnswers[0].subSection
                      ? tempAnswers[0].subSection[insideKey].answer
                      : "";
                  const updatedAnswer = checkInput.error === false || text === "" ? text : checkAnswer;
                  tempAnswers[0] = {
                    ...tempAnswers[0],
                    subSection: { ...tempAnswers[0].subSection, [insideKey]: { answer: updatedAnswer } },
                  };
                  setData({ ...data, answers: tempAnswers });
                };

                const handleBlur = () => {
                  const tempAnswers: IQuestionData[] = [...data.answers];
                  if (
                    "subSection" in tempAnswers[0] &&
                    tempAnswers[0].subSection !== undefined &&
                    defaultKey in tempAnswers[0].subSection
                  ) {
                    const value = tempAnswers[0].subSection[defaultKey].answer! as string;
                    let updatedAnswer = "";
                    let checkInput: IInputValidation = { error: false, errorMessage: "" };
                    if (format !== null && format !== undefined && format.type === "amount") {
                      const cleanValue = value.replace(/[,]/g, "");
                      updatedAnswer =
                        isAmount(parseFloat(cleanValue.replace(/[,]/g, "")).toString()) === false
                          ? (tempAnswers[0].subSection[defaultKey].answer! as string)
                          : formatAmount(cleanValue);
                      checkInput =
                        isAmount(parseFloat(cleanValue.replace(/[,]/g, "")).toString()) === true
                          ? { ...checkInput }
                          : { error: true, errorMessage: ERROR.INVESTMENT_INVALID_AMOUNT };
                    } else if (format !== null && format !== undefined && format.type !== undefined) {
                      updatedAnswer = value;
                      checkInput = validateInput(value, format.type);
                    }
                    const error = checkInput.errorMessage !== "" ? { error: checkInput.errorMessage } : {};
                    tempAnswers[0] = {
                      ...tempAnswers[0],
                      subSection: { ...tempAnswers[0].subSection, [defaultKey]: { answer: updatedAnswer, ...error } },
                    };
                    setData({ ...data, answers: tempAnswers });
                  }
                };

                const handleRemark = (text: string) => {
                  const tempAnswers: IQuestionData[] = [...data.answers];
                  tempAnswers[0] = { ...tempAnswers[0], hasRemark: true, remark: text };
                  setData({ ...data, answers: tempAnswers });
                };

                const handleDropdown = (insideKey: string, text: string) => {
                  const tempAnswers: IQuestionData[] = [...data.answers];
                  tempAnswers[0] = { ...tempAnswers[0], subSection: { ...tempAnswers[0].subSection, [insideKey]: { answer: text } } };
                  setData({ ...data, answers: tempAnswers });
                };

                const handleOption2 = (insideKey: string, text: string | undefined) => {
                  const tempAnswers: IQuestionData[] = [...data.answers];
                  tempAnswers[0] = { ...tempAnswers[0], subSection: { ...tempAnswers[0].subSection, [insideKey]: { answer: text } } };
                  setData({ ...data, answers: tempAnswers });
                };

                if (values !== undefined && values !== null) {
                  values.forEach((label: string) => questionDropdownValues.push({ label: label, value: label }));
                }
                let content;
                switch (type) {
                  case "textarea":
                    content = (
                      <View style={{ ...px(sw36) }}>
                        <CustomSpacer space={sh18} />
                        <TextInputMultiline
                          label={insideOption.title}
                          maxLength={255}
                          onChangeText={handleRemark}
                          showLength={true}
                          value={remark}
                        />
                        <CustomSpacer space={sh16} />
                      </View>
                    );
                    break;
                  case "inputtext":
                    content = (
                      <View style={{ ...px(sw36) }}>
                        <CustomTextInput
                          error={
                            subSection !== undefined && subSection[defaultKey] !== undefined && subSection[defaultKey].error !== undefined
                              ? subSection[defaultKey].error
                              : undefined
                          }
                          keyboardType={
                            format !== null && format !== undefined && (format.type === "number" || format.type === "amount")
                              ? "numeric"
                              : "default"
                          }
                          label={insideOption.title}
                          maxLength={format !== null && format !== undefined && format.limit !== null ? format.limit : undefined}
                          onChangeText={(text: string) => handleInput(defaultKey, text)}
                          onBlur={handleBlur}
                          spaceToTop={sh16}
                          value={
                            subSection !== undefined && subSection[defaultKey] !== undefined && subSection[defaultKey].answer !== undefined
                              ? (subSection[defaultKey].answer as string)
                              : ""
                          }
                        />
                      </View>
                    );
                    break;
                  case "dropdown":
                    content = (
                      <View style={{ ...px(sw36) }}>
                        <CustomSpacer space={sh16} />
                        <View style={{ width: sw360 }}>
                          <NewDropdown
                            handleChange={(text: string) => handleDropdown(defaultKey, text)}
                            items={questionDropdownValues}
                            label={insideOption.title}
                            value={
                              subSection !== undefined &&
                              subSection[defaultKey] !== undefined &&
                              subSection[defaultKey].answer !== undefined
                                ? (subSection[defaultKey].answer as string)
                                : ""
                            }
                          />
                        </View>
                      </View>
                    );
                    break;
                  case "label":
                    content = (
                      <View>
                        <CustomSpacer space={sh18} />
                        <View style={{ ...border, ...fullWidth }} />
                        <View style={{ ...px(sw36) }}>
                          <CustomSpacer space={sh16} />
                          <Text style={fs16BoldBlack2}>{insideOption.title}</Text>
                          <CustomSpacer space={sh16} />
                          <View style={flexRow}>
                            {insideOption.options !== undefined && insideOption.options !== null
                              ? insideOption.options.map((nestedOption: IOptionField, nestedOptionIndex: number) => {
                                  return (
                                    <Fragment key={nestedOptionIndex}>
                                      {nestedOptionIndex !== 0 ? <CustomSpacer isHorizontal space={sw54} /> : null}
                                      <View style={{ width: sw296 }}>
                                        <AdvanceToggleButton
                                          buttonStyle={{ width: sw18, height: sh18 }}
                                          direction="row"
                                          labels={[{ label: nestedOption.title! }]}
                                          onSelect={() => handleOption2(optionId, nestedOption.title)}
                                          space={sw66}
                                          value={subSection !== undefined && subSection[optionId].answer === nestedOption.title ? 0 : 1}
                                        />
                                      </View>
                                    </Fragment>
                                  );
                                })
                              : null}
                          </View>
                        </View>
                      </View>
                    );
                    break;
                  default:
                    content = <View />;
                }
                return <Fragment key={insideOptionIndex}>{content}</Fragment>;
              })
            : null}
        </View>
      ) : null}
    </View>
  );
};
