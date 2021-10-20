import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { AdvanceToggleButton, CustomSpacer, CustomTextInput, CustomTooltip, NewDropdown, TextInputMultiline } from "../../components";
import {
  centerHV,
  colorBlue,
  colorWhite,
  flexChild,
  flexCol,
  flexRow,
  fs12RegWhite1,
  fs16BoldBlack3,
  fullWidth,
  sh11,
  sh16,
  sh18,
  sh4,
  sh96,
  sw100,
  sw12,
  sw14,
  sw148,
  sw296,
  sw54,
  sw66,
  sw672,
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
    const tempData: IQuestionData = { ...data, subSection: { ...data.subSection, [key]: text } };
    setData(tempData);
  };

  const handleOption1 = () => {
    const tempData: IQuestionData = { ...data, answer: title };
    setData(tempData);
  };

  const handleRemark = (text: string) => {
    const tempData: IQuestionData = { ...data, hasRemark: true, remark: text };
    setData(tempData);
  };

  const border = { borderBottomWidth: 0.5, borderBottomColor: colorWhite._3 };

  return (
    <View style={{ flexDirection: direction }}>
      <AdvanceToggleButton
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
                  <View style={{ width: sw14, height: sw14, ...centerHV, borderRadius: sw100, backgroundColor: colorBlue._2 }}>
                    <Text style={{ fontSize: sh11, color: colorWhite._1 }}>i</Text>
                  </View>
                </View>
              }
              spacing={0}
            />
          ) : undefined
        }
        space={sw66}
        textContainer={{ width: sw296 }}
        value={answer === title ? 0 : 1}
      />
      <View>
        {options !== undefined && options !== null && options.length > 0 && title === answer
          ? options.map((insideOption: IOptionField, optionIndex: number) => {
              const { type, values, id: optionId } = insideOption;
              const questionDropdownValues: TypeLabelValue[] = [];

              const handleDropdown = (insideKey: string, text: string) => {
                setData({ ...data, subSection: { ...subSection, [insideKey]: text } });
              };

              const handleOption2 = (key: string, text: string | undefined) => {
                const tempData: IQuestionData = { ...data, subSection: { ...data.subSection, [key]: text } };
                setData(tempData);
              };

              if (values !== undefined && values !== null) {
                values.map((label: string) => questionDropdownValues.push({ label: label, value: label }));
              }
              const defaultKey = optionId !== null ? optionId : "remark";
              let content: JSX.Element = <View />;
              switch (type) {
                case "inputtext":
                  content = (
                    <View style={{ ...flexCol }}>
                      <CustomSpacer space={sh18} />
                      <TextInputMultiline
                        maxLength={255}
                        style={{ width: sw672, height: sh96 }}
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
                        spaceToLabel={sh4}
                        value={subSection !== undefined ? subSection![defaultKey] : ""}
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
                        spaceToLabel={sh4}
                        value={subSection !== undefined ? subSection[defaultKey]! : ""}
                      />
                    </View>
                  );
                  break;
                case "label":
                  content = (
                    <View>
                      {answer === title ? (
                        <Fragment>
                          <CustomSpacer space={sh18} />
                          <View style={{ ...border, ...fullWidth }} />
                          <View>
                            <CustomSpacer space={sh16} />
                            <Text style={fs16BoldBlack3}>{insideOption.title}</Text>
                            <CustomSpacer space={sh16} />
                            <View style={flexRow}>
                              {insideOption.options !== undefined && insideOption.options !== null
                                ? insideOption.options.map((nestedOption: IOptionField, nestedOptionIndex: number) => {
                                    return (
                                      <Fragment key={nestedOptionIndex}>
                                        {nestedOptionIndex !== 0 ? <CustomSpacer isHorizontal space={sw54} /> : null}
                                        <AdvanceToggleButton
                                          direction="row"
                                          labels={[{ label: nestedOption.title! }]}
                                          onSelect={() => handleOption2(optionId, nestedOption.title)}
                                          space={sw66}
                                          textContainer={{ width: sw296 }}
                                          value={subSection !== undefined && subSection![optionId] === nestedOption.title ? 0 : 1}
                                        />
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
