import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { CustomSpacer, Loading } from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import {
  alignFlexStart,
  border,
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  flexWrap,
  fs10RegGray5,
  fs12RegGray6,
  fs16BoldGray6,
  px,
  py,
  sh16,
  sh4,
  sw1,
  sw10,
  sw14,
  sw16,
  sw24,
  sw280,
  sw336,
  sw4,
  sw62,
  sw8,
} from "../../../styles";
import { shortenString } from "../../../utils";

const { DASHBOARD_EDD_CASE } = Language.PAGE;

declare interface IPreviousDataProps {
  data: IPreviousData[];
  setFile: (file: FileBase64) => void;
}

export const PreviousData: FunctionComponent<IPreviousDataProps> = ({ data, setFile }: IPreviousDataProps) => {
  const padding: ViewStyle = { ...px(sw16), ...py(sh16) };
  const cardHeaderStyle: ViewStyle = {
    ...padding,
    borderTopLeftRadius: sw16,
    borderTopRightRadius: sw16,
    backgroundColor: colorWhite._2,
  };

  return (
    <View style={{ ...px(sw24), ...flexWrap, ...flexRow, ...alignFlexStart }}>
      {data.length > 0 ? (
        <Fragment>
          {data.map((card: IPreviousData, index: number) => {
            const { title, data: contentData, label: titleLabel } = card;
            const headerBorder: ViewStyle =
              card.data === undefined || card.data.length === 0
                ? { borderRadius: sw16 }
                : { borderColor: colorGray._3, borderBottomWidth: sw1 };
            // const headerBackground: ViewStyle =
            //   card.data === undefined || card.data.length === 0 ? { backgroundColor: colorWhite._1 } : {};
            const marginBottom: ViewStyle = index <= data.length - 3 ? { marginBottom: sh16 } : {};
            const checkCardLength = card.data !== undefined && card.data.length > 1 ? card.data[0].data : null;
            const checkTitle = title === undefined ? checkCardLength : title;
            const checkAdditional = title !== undefined ? DASHBOARD_EDD_CASE.LABEL_RESPONSE : DASHBOARD_EDD_CASE.LABEL_REMARKS;
            const defaultTitleLabel = titleLabel !== undefined ? titleLabel : checkAdditional;
            const bodyData =
              contentData !== undefined && contentData.length > 1 && title === undefined
                ? contentData.filter((_eachContent: ILabeledTitleWithFile, filterIndex: number) => filterIndex !== 0)
                : contentData;
            const checkBackground: ViewStyle =
              checkTitle === null ? { backgroundColor: colorWhite._2, borderTopEndRadius: sw16, borderTopLeftRadius: sw16 } : {};

            return (
              <Fragment key={index}>
                {index !== 0 && index % 2 !== 0 ? <CustomSpacer isHorizontal space={sw62} /> : null}
                <View style={{ ...border(colorGray._3, sw1, sw16), width: sw336, ...marginBottom }}>
                  {checkTitle !== null ? (
                    <View style={{ ...cardHeaderStyle, ...headerBorder }}>
                      <Text style={fs10RegGray5}>{defaultTitleLabel}</Text>
                      <CustomSpacer space={sh4} />
                      <View style={flexRow}>
                        {defaultTitleLabel !== DASHBOARD_EDD_CASE.LABEL_AMLA_REMARK &&
                        defaultTitleLabel !== DASHBOARD_EDD_CASE.LABEL_REMARKS ? (
                          <Fragment>
                            <View>
                              <CustomSpacer space={sh4} />
                              <IcoMoon color={colorBlue._1} name="check" size={sw14} />
                            </View>
                            <CustomSpacer isHorizontal space={sw8} />
                          </Fragment>
                        ) : null}
                        <View style={centerVertical}>
                          <Text style={{ ...fs16BoldGray6, maxWidth: sw280 }}>{checkTitle}</Text>
                        </View>
                      </View>
                    </View>
                  ) : null}
                  {bodyData !== undefined && bodyData.length > 0 ? (
                    <View
                      style={{
                        borderBottomLeftRadius: sw16,
                        borderBottomRightRadius: sw16,
                        ...padding,
                        ...checkBackground,
                      }}>
                      {bodyData.map((currentData: ILabeledTitleWithFile, currentDataIndex: number) => {
                        const { label, data: content, isMulti } = currentData;
                        const checkAttachment = label === "document" ? DASHBOARD_EDD_CASE.LABEL_ATTACHMENTS : label;
                        const checkRemark = label === "remark" ? DASHBOARD_EDD_CASE.LABEL_REMARKS : checkAttachment;
                        const checkDirection: ViewStyle = isMulti === true ? { ...flexRow } : {};

                        return (
                          <Fragment key={currentDataIndex}>
                            <View>
                              {currentDataIndex !== 0 ? <CustomSpacer space={sh16} /> : null}
                              {label !== undefined && label !== null ? (
                                <Fragment>
                                  <Text style={fs10RegGray5}>{checkRemark}</Text>
                                  <CustomSpacer space={sh4} />
                                </Fragment>
                              ) : null}
                              {typeof content !== "object" ? (
                                <View style={checkDirection}>
                                  <View>
                                    <Text style={fs16BoldGray6}>{content}</Text>
                                    {/* {subtitle !== null ? <Text style={fs12BoldGray6}>{subtitle}</Text> : null} */}
                                  </View>
                                </View>
                              ) : (
                                // Display bullets for multiselect
                                <Fragment key={currentDataIndex}>
                                  {isMulti === true ? (
                                    <Fragment>
                                      {content.length > 0
                                        ? (content as IDataDropdown[]).map((eachData: IDataDropdown, eachDataIndex: number) => {
                                            const { description, value } = eachData;
                                            return (
                                              <View key={eachDataIndex}>
                                                <View style={flexRow}>
                                                  <Text style={fs16BoldGray6}>•</Text>
                                                  <CustomSpacer isHorizontal space={sw4} />
                                                  <View>
                                                    <Text style={fs16BoldGray6}>{value}</Text>
                                                    {description !== undefined ? (
                                                      <Text style={fs12RegGray6}>{eachData.description}</Text>
                                                    ) : null}
                                                  </View>
                                                </View>
                                              </View>
                                            );
                                          })
                                        : null}
                                    </Fragment>
                                  ) : (
                                    // Display the array of documents
                                    <Fragment>
                                      {content.length > 0
                                        ? (content as FileBase64[]).map((eachData: FileBase64, eachDataIndex: number) => {
                                            const { name } = eachData;
                                            const fileNameArray = name.split(".");
                                            const selectedName = fileNameArray.splice(fileNameArray.length - 2, 1).join("");
                                            const [selectedExtension] = fileNameArray.slice(-1);
                                            const shortFileName = shortenString(selectedName, 20, 28);
                                            const uploadLabel = `${shortFileName}.${selectedExtension}`;
                                            return (
                                              <TouchableWithoutFeedback
                                                key={eachDataIndex}
                                                onPress={() =>
                                                  eachData.url !== undefined && eachData.url !== null ? setFile(eachData) : undefined
                                                }>
                                                <View key={eachDataIndex}>
                                                  <View style={flexRow}>
                                                    <Text style={{ ...fs16BoldGray6, maxWidth: sw280 }}>{uploadLabel}</Text>
                                                    <View style={{ ...flexRow, ...centerVertical }}>
                                                      <CustomSpacer isHorizontal={true} space={sw10} />
                                                      <IcoMoon color={colorBlue._8} name="file" size={sw16} />
                                                    </View>
                                                  </View>
                                                </View>
                                              </TouchableWithoutFeedback>
                                            );
                                          })
                                        : null}
                                    </Fragment>
                                  )}
                                </Fragment>
                              )}
                            </View>
                          </Fragment>
                        );
                      })}
                    </View>
                  ) : null}
                </View>
              </Fragment>
            );
          })}
        </Fragment>
      ) : (
        <View style={flexChild}>
          <Loading />
        </View>
      )}
    </View>
  );
};
