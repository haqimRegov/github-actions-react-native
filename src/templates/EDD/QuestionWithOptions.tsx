import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { AdvanceToggleButton, CustomSpacer, CustomTextInput, CustomTooltip, NewDropdown, TextInputMultiline } from "../../components";
import {
  centerHV,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexCol,
  flexRow,
  fs12RegWhite1,
  fs16BoldBlack2,
  fullWidth,
  sh11,
  sh16,
  sh18,
  sw100,
  sw12,
  sw14,
  sw148,
  sw18,
  sw296,
  sw54,
  sw66,
  sw7,
} from "../../styles";

declare interface IQuestionWithOptions {
  data: IQuestionData;
  direction: "row" | "column";
  hasTooltip?: boolean;
  options?: IOptionField[];
  setData: (data: IQuestionData) => void;
  subLabel?: string;
  title: string;
  tooltipText?: string;
}

export const QuestionWithOptions: FunctionComponent<IQuestionWithOptions> = ({
  data,
  direction,
  options,
  setData,
  subLabel,
  title,
  tooltipText,
}: IQuestionWithOptions) => {
  const { answer, remark, subSection } = data;

  const handleInput = (key: string, text: string) => {
    const tempData: IQuestionData = { ...data, subSection: { ...data.subSection, [key]: { answer: text } } };
    setData(tempData);
  };

  const handleOption1 = () => {
    const tempData: IQuestionData = { ...data, answer: { answer: title } };
    setData(tempData);
  };

  const handleRemark = (text: string) => {
    const tempData: IQuestionData = { ...data, hasRemark: true, remark: text };
    setData(tempData);
  };

  const border = { borderBottomWidth: 0.5, borderBottomColor: colorGray._3 };

  return (
    <View style={{ flexDirection: direction }}>
      <View style={{ width: sw296 }}>
        <AdvanceToggleButton
          iconSize={sw18}
          labels={[{ label: title, subLabel: subLabel }]}
          onSelect={handleOption1}
          sideElement={
            tooltipText !== undefined ? (
              <CustomTooltip
                arrowSize={{ width: sw12, height: sw7 }}
                content={
                  <View>
                    <Text style={fs12RegWhite1}>{tooltipText}</Text>
                  </View>
                }
                contentStyle={{ width: sw148 }}
                children={
                  <View style={{ ...flexChild, ...centerHV }}>
                    <View style={{ width: sw14, height: sw14, ...centerHV, borderRadius: sw100, backgroundColor: colorBlue._1 }}>
                      <Text style={{ fontSize: sh11, color: colorWhite._1 }}>i</Text>
                    </View>
                  </View>
                }
                spacing={0}
              />
            ) : undefined
          }
          space={sw66}
          value={answer === title ? 0 : 1}
        />
      </View>
      <View>
        {options !== undefined && options !== null && options.length > 0 && title === answer?.answer
          ? options.map((insideOption: IOptionField, optionIndex: number) => {
              const { type, values, id: optionId } = insideOption;
              const questionDropdownValues: TypeLabelValue[] = [];

              const handleDropdown = (insideKey: string, text: string) => {
                setData({ ...data, subSection: { ...subSection, [insideKey]: { answer: text } } });
              };

              const handleOption2 = (key: string, text: string | undefined) => {
                const tempData: IQuestionData = { ...data, subSection: { ...data.subSection, [key]: { answer: text } } };
                setData(tempData);
              };

              if (values !== undefined && values !== null) {
                values.forEach((label: string) => questionDropdownValues.push({ label: label, value: label }));
              }
              const defaultKey = optionId !== null ? optionId : "remark";
              let content;
              switch (type) {
                case "inputtext":
                  content = (
                    <View style={{ ...flexCol }}>
                      <CustomSpacer space={sh18} />
                      <TextInputMultiline
                        maxLength={255}
                        label={insideOption.title}
                        onChangeText={handleRemark}
                        showLength={true}
                        value={remark}
                      />
                      <CustomSpacer space={sh16} />
                    </View>
                  );
                  break;
                case "textarea":
                  content = (
                    <View style={flexCol}>
                      <CustomTextInput
                        label={insideOption.title}
                        onChangeText={(text: string) => handleInput(defaultKey, text)}
                        spaceToTop={sh16}
                        value={
                          subSection !== undefined && defaultKey !== undefined && subSection[defaultKey] !== undefined
                            ? (subSection[defaultKey].answer as string)
                            : ""
                        }
                      />
                    </View>
                  );
                  break;
                case "dropdown":
                  content = (
                    <View>
                      <CustomSpacer space={sh16} />
                      <NewDropdown
                        handleChange={(text: string) => handleDropdown(defaultKey, text)}
                        items={questionDropdownValues}
                        label={insideOption.title}
                        value={
                          subSection !== undefined && defaultKey !== undefined && subSection[defaultKey] !== undefined
                            ? (subSection[defaultKey].answer as string)
                            : ""
                        }
                      />
                    </View>
                  );
                  break;
                case "label":
                  content = (
                    <View>
                      {answer.answer === title ? (
                        <Fragment>
                          <CustomSpacer space={sh18} />
                          <View style={{ ...border, ...fullWidth }} />
                          <View>
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
                                            direction="row"
                                            iconSize={sw18}
                                            labels={[{ label: nestedOption.title! }]}
                                            onSelect={() => handleOption2(optionId, nestedOption.title)}
                                            space={sw66}
                                            value={subSection !== undefined && subSection[optionId] === nestedOption.title ? 0 : 1}
                                          />
                                        </View>
                                      </Fragment>
                                    );
                                  })
                                : null}
                            </View>
                          </View>
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
      </View>
    </View>
  );
};
