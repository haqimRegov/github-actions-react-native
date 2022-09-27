import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { NewDropdown } from "../../components/Dropdown";
import { CustomTextInput, TextInputMultiline } from "../../components/Input";
import { Switch } from "../../components/Switch";
import { UploadWithModal } from "../../components/Upload";
import { CustomSpacer, LabeledTitle } from "../../components/Views";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import { PreviousData } from "../../pages/Dashboard/EDD/PreviousData";
import {
  border,
  borderBottomGray2,
  centerHorizontal,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  flexWrap,
  fs10RegBlack2,
  fs10RegGray5,
  fs12BoldBlue8,
  fs16BoldBlack2,
  fullWidth,
  px,
  py,
  sh12,
  sh16,
  sh18,
  sh20,
  sh32,
  sh4,
  sh68,
  sw1,
  sw100,
  sw16,
  sw24,
  sw32,
  sw36,
  sw54,
  sw638,
  sw8,
} from "../../styles";
import { AnimationUtils, deleteKey } from "../../utils";
import { CheckBoxWithInput } from "./CheckBoxWithInput";
import { QuestionWithOptions } from "./QuestionWithOptions";
import { QuestionWithRadioOnly } from "./QuestionWithRadioOnly";

const { DASHBOARD_EDD_CASE } = Language.PAGE;

declare interface IQuestionCard {
  data?: IQuestionDataWithHide;
  getPreviousData?: (request: IPreviousResponseRequest) => Promise<IPreviousResponseStructure | IResponseError | false>;
  options?: IOptionField[];
  previousData?: IPreviousData[];
  question: string;
  questionId?: string;
  questionLabel: string;
  questionLabelStyle?: ViewStyle;
  setData?: (data: IQuestionDataWithHide, previousData?: IPreviousData[]) => void;
  setFile: (file: FileBase64) => void;
  showPrevious?: boolean;
  subQuestion?: string;
}

export const QuestionCard: FunctionComponent<IQuestionCard> = ({
  data,
  getPreviousData,
  options,
  previousData,
  question,
  questionId,
  questionLabel,
  questionLabelStyle,
  setData,
  setFile,
  showPrevious,
  subQuestion,
}: IQuestionCard) => {
  const handleShow = async () => {
    if (setData !== undefined && data !== undefined) {
      setData({ ...data, autoHide: !data?.autoHide });
      if (previousData !== undefined && previousData.length === 0 && getPreviousData !== undefined) {
        const request = { question: questionId !== null ? questionId!.toString() : question, caseId: "" };
        const dataPromise = getPreviousData(request);
        const dataToShow: IPreviousResponseStructure = (await Promise.resolve(dataPromise)) as IPreviousResponseStructure;
        const { answer: previousDataStringified } = dataToShow;
        const parsedData = JSON.parse(previousDataStringified);
        setData({ ...data, autoHide: !data?.autoHide }, parsedData);
      }
    }
    AnimationUtils.layout();
  };

  const containerStyle: ViewStyle = {
    ...border(colorGray._2, sw1, sw16),
  };
  const headerStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    height: sh68,
    backgroundColor: colorBlue._3,
    borderTopLeftRadius: sw16,
    borderTopRightRadius: sw16,
  };
  const numberStyle: ViewStyle = {
    ...centerHV,
    borderRadius: sw100,
    height: sw32,
    width: sh32,
    backgroundColor: colorWhite._1,
    ...questionLabelStyle,
  };

  const flexDirection: ViewStyle =
    options !== undefined && options !== null && options.length > 0 && options[0].type === "radiobutton" ? { ...flexRow, ...flexWrap } : {};
  // To identify question with only radio options
  const checkRadioOnly =
    options !== undefined && options.length > 0 ? options.every((checkOption: IOptionField) => checkOption.type === "radiobutton") : false;
  const hide = data !== undefined && data.autoHide === true;
  const showText = hide === true ? DASHBOARD_EDD_CASE.LABEL_SHOW_PREVIOUS_RESPONSE : DASHBOARD_EDD_CASE.LABEL_HIDE_PREVIOUS_RESPONSE;
  const icon = hide === true ? "caret-down" : "caret-up";
  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <CustomSpacer isHorizontal={true} space={sw32} />
        <View style={numberStyle}>
          <Text style={fs10RegBlack2}>{questionLabel}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={centerHorizontal}>
          <Text style={{ ...fs16BoldBlack2, ...flexWrap, maxWidth: sw638 }}>{question}</Text>
          {subQuestion !== undefined && subQuestion !== null ? (
            <Fragment>
              <CustomSpacer space={sh4} />
              <Text style={fs10RegGray5}>{subQuestion}</Text>
            </Fragment>
          ) : null}
        </View>
      </View>
      {previousData !== undefined && previousData !== null ? (
        <Fragment>
          <View style={py(sh16)}>
            {hide === true ? null : <PreviousData data={previousData} setFile={setFile} />}
            {showPrevious !== false ? (
              <Fragment>
                {hide ? null : <CustomSpacer space={sh16} />}
                <View style={{ ...px(sw24), ...flexRow }}>
                  <CustomSpacer isHorizontal space={sw8} />
                  <TouchableWithoutFeedback onPress={handleShow}>
                    <View style={{ ...flexRow, ...centerHV }}>
                      <Text style={fs12BoldBlue8}>{showText}</Text>
                      <IcoMoon color={colorBlue._8} name={icon} size={sh12} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Fragment>
            ) : null}
          </View>
          {showPrevious !== false ? <View style={borderBottomGray2} /> : null}
        </Fragment>
      ) : null}
      {options !== undefined && options !== null && options.length > 0 ? (
        <Fragment>
          {!checkRadioOnly && data !== undefined && setData !== undefined ? (
            <View style={{ ...px(sw36), ...py(sh16), ...flexDirection }}>
              {options.map((option: IOptionField, optionIndex: number) => {
                const {
                  description,
                  hasDoc,
                  hasRemark,
                  optionIndex: answerOptionIndex,
                  title,
                  info,
                  type,
                  values,
                  valuesDescription,
                } = option;
                const questionDropdownValues: TypeLabelValue[] = [];

                if (values !== undefined && values !== null) {
                  values.forEach((label: string, valueIndex: number) => {
                    const valueDescription =
                      valuesDescription !== undefined && valuesDescription !== null && valuesDescription[valueIndex] !== ""
                        ? { subLabel: valuesDescription[valueIndex] }
                        : {};
                    questionDropdownValues.push({ label: label, value: label, ...valueDescription });
                  });
                }
                const findIndex =
                  data !== undefined && type === "checkbox"
                    ? data.answers.findIndex((item: IQuestionData) => item.answer!.answer === option.title)
                    : -1;
                // const subLabelOptional = option.description !== undefined ? { subLabel: description } : {};
                const currentData: IQuestionData =
                  findIndex >= 0 && data !== undefined
                    ? data.answers[findIndex]
                    : ({ checkboxToggle: false, answer: { answer: title } } as IQuestionData);

                const handleCheckbox = (updatedData: IQuestionData) => {
                  const tempData = [...data.answers];
                  if (findIndex < 0) {
                    tempData.push(updatedData);
                  } else if (updatedData.checkboxToggle === true) {
                    tempData[findIndex] = { ...updatedData };
                  } else {
                    tempData.splice(findIndex, 1);
                  }
                  if (setData !== undefined && data !== undefined) {
                    setData({ answers: tempData, autoHide: data.autoHide });
                  }
                };

                const handleData = (updatedData: IQuestionData) => {
                  if (setData !== undefined && data !== undefined && answerOptionIndex !== undefined) {
                    const tempAnswers = [...data.answers];
                    tempAnswers[answerOptionIndex] = updatedData;
                    setData({ answers: tempAnswers, autoHide: data.autoHide });
                  }
                };

                const handleDropdown = (text: string) => {
                  if (setData !== undefined && data !== undefined && answerOptionIndex !== undefined) {
                    const tempAnswers = [...data.answers];
                    tempAnswers[answerOptionIndex] = { ...tempAnswers[answerOptionIndex], answer: { answer: text } };
                    setData({ ...data, answers: tempAnswers });
                  }
                };

                const handleInput = (text: string) => {
                  if (data !== undefined && setData !== undefined && answerOptionIndex !== undefined) {
                    const tempAnswers = [...data.answers];
                    tempAnswers[answerOptionIndex] = { answer: { answer: text }, hasRemark: false, hasDoc: false };
                    setData({ ...data, answers: tempAnswers });
                  }
                };

                const handleRemarkToggle = () => {
                  if (data !== undefined && answerOptionIndex !== undefined && data.answers.length > 0) {
                    const updatedData = deleteKey(data?.answers[answerOptionIndex], ["remark"]);
                    const updatedRemark =
                      data.answers[answerOptionIndex].hasRemark !== undefined && data.answers[answerOptionIndex].hasRemark === true
                        ? {}
                        : { remark: "" };
                    if (setData !== undefined) {
                      setData({
                        ...data,
                        answers: [
                          {
                            ...updatedData,
                            hasRemark:
                              data.answers[answerOptionIndex].hasRemark !== undefined ? !data.answers[answerOptionIndex].hasRemark : true,
                            ...updatedRemark,
                          },
                        ],
                      });
                    }
                  }
                };

                const handleDocumentToggle = () => {
                  if (data !== undefined && answerOptionIndex !== undefined && data.answers.length > 0) {
                    const updatedData = deleteKey(data?.answers[answerOptionIndex], ["document"]);
                    const updatedDocument =
                      data.answers[answerOptionIndex].hasDoc !== undefined && data.answers[answerOptionIndex].hasDoc === true
                        ? {}
                        : { document: undefined };
                    if (setData !== undefined && data !== undefined) {
                      setData({
                        ...data,
                        answers: [
                          {
                            ...updatedData,
                            hasDoc: data.answers[answerOptionIndex].hasDoc !== undefined ? !data.answers[answerOptionIndex].hasDoc : true,
                            ...updatedDocument,
                          },
                        ],
                      });
                    }
                  }
                };

                const handleDocument = (file: FileBase64 | undefined) => {
                  if (setData !== undefined && data !== undefined && answerOptionIndex !== undefined) {
                    setData({ ...data, answers: [{ ...data.answers[answerOptionIndex], document: file }] });
                  }
                };

                const handleRemark = (text: string) => {
                  if (setData !== undefined && data !== undefined && answerOptionIndex !== undefined) {
                    setData({ ...data, answers: [{ ...data.answers[answerOptionIndex], remark: text }] });
                  }
                };

                let content;
                const borderBottom: ViewStyle = { borderBottomWidth: 1, borderBottomColor: colorGray._2 };
                const optionsBorder: ViewStyle = { borderBottomWidth: 1, borderBottomColor: colorGray._2 };
                const topSpace =
                  title !== undefined && title !== null && title === "Others" && optionIndex !== options.length - 1 ? sh16 : sh20;
                const defaultRemarkToggle: boolean =
                  data !== undefined &&
                  data.answers.length > 0 &&
                  answerOptionIndex !== undefined &&
                  data.answers[answerOptionIndex].hasRemark !== undefined
                    ? data.answers[answerOptionIndex].hasRemark!
                    : false;
                const defaultDocumentToggle: boolean =
                  data !== undefined &&
                  data.answers.length > 0 &&
                  answerOptionIndex !== undefined &&
                  data.answers[answerOptionIndex].hasDoc !== undefined
                    ? data.answers[answerOptionIndex].hasDoc!
                    : false;
                switch (type) {
                  case "checkbox":
                    content = (
                      <Fragment>
                        {optionIndex !== 0 ? <CustomSpacer space={topSpace} /> : null}
                        <CheckBoxWithInput
                          data={currentData}
                          hasRemark={hasRemark}
                          hasDoc={hasDoc}
                          label={title!}
                          subLabel={description}
                          options={option.options}
                          setData={handleCheckbox}
                        />
                        {title !== undefined && title !== null && title === "Others" && optionIndex !== options.length - 1 ? (
                          <Fragment>
                            <CustomSpacer space={sh16} />
                            <View style={borderBottom} />
                          </Fragment>
                        ) : null}
                        {optionIndex !== options.length - 1 && currentData.checkboxToggle === true ? <View style={optionsBorder} /> : null}
                      </Fragment>
                    );
                    break;
                  case "inputtext":
                    content = (
                      <View style={fullWidth}>
                        <CustomSpacer space={sh18} />
                        <View>
                          <CustomTextInput
                            label={title}
                            onChangeText={handleInput}
                            spaceToLabel={sh4}
                            value={data.answers.length > 0 ? (data.answers[answerOptionIndex!].answer?.answer as string) : ""}
                          />
                        </View>
                        <CustomSpacer space={sh16} />
                      </View>
                    );
                    break;
                  case "label":
                  case "reroute":
                    content = (
                      <View>
                        <LabeledTitle label={title!} labelStyle={fs10RegGray5} title={description} titleStyle={fs16BoldBlack2} />
                      </View>
                    );
                    break;
                  case "radiobutton":
                    // Case for questions having options including radio buttons and others
                    content = (
                      <Fragment>
                        {optionIndex !== 0 ? <CustomSpacer isHorizontal space={sw54} /> : null}
                        <QuestionWithOptions
                          data={data.answers.length > 0 ? data.answers[answerOptionIndex!] : {}}
                          direction={optionIndex !== 0 ? "row" : "column"}
                          title={title!}
                          subLabel={description}
                          options={option.options}
                          setData={handleData}
                          tooltipText={info}
                        />
                      </Fragment>
                    );
                    break;
                  case "dropdown":
                    content = (
                      <NewDropdown
                        handleChange={handleDropdown}
                        items={questionDropdownValues}
                        label={title}
                        value={data.answers.length > 0 ? (data.answers[answerOptionIndex!].answer!.answer as string) : ""}
                      />
                    );
                    break;
                  default:
                    content = <View />;
                    break;
                }
                return (
                  <Fragment key={optionIndex}>
                    {content}
                    {hasRemark === true && type !== "checkbox" ? (
                      <Fragment>
                        <CustomSpacer space={sh18} />
                        <Switch
                          label={DASHBOARD_EDD_CASE.LABEL_ADD_REMARK}
                          onPress={handleRemarkToggle}
                          style={{ width: sw32 }}
                          toggle={defaultRemarkToggle}
                        />
                        {defaultRemarkToggle === true ? (
                          <Fragment>
                            <CustomSpacer space={sh18} />
                            <TextInputMultiline
                              maxLength={255}
                              onChangeText={handleRemark}
                              placeholder={DASHBOARD_EDD_CASE.LABEL_REMARK_PLACEHOLDER}
                              showLength={true}
                              value={
                                data !== undefined && data.answers.length > 0 && answerOptionIndex !== undefined
                                  ? data?.answers[answerOptionIndex].remark
                                  : ""
                              }
                            />
                          </Fragment>
                        ) : null}
                      </Fragment>
                    ) : null}
                    {hasDoc === true && type !== "checkbox" ? (
                      <Fragment>
                        <CustomSpacer space={sh18} />
                        <Switch
                          label={DASHBOARD_EDD_CASE.LABEL_ADD_DOCUMENT}
                          onPress={handleDocumentToggle}
                          style={{ width: sw32 }}
                          toggle={defaultDocumentToggle}
                        />
                        {defaultDocumentToggle === true ? (
                          <Fragment>
                            <CustomSpacer space={sh18} />
                            <UploadWithModal
                              features={["camera", "gallery", "file"]}
                              label={DASHBOARD_EDD_CASE.LABEL_DOCUMENT}
                              onSuccess={handleDocument}
                              setValue={handleDocument}
                              value={
                                data !== undefined && data.answers.length > 0 && answerOptionIndex !== undefined
                                  ? data?.answers[answerOptionIndex].document
                                  : undefined
                              }
                            />
                          </Fragment>
                        ) : null}
                      </Fragment>
                    ) : null}
                  </Fragment>
                );
              })}
            </View>
          ) : (
            // Special case question having only radio buttons as options at the top level
            <QuestionWithRadioOnly options={options} data={data!} setData={setData!} />
          )}
        </Fragment>
      ) : null}
    </View>
  );
};
