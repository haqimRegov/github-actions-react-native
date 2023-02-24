import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { BaseColorCardProps, BaseTextCardProps, ColorCard, CustomSpacer, IconText, TextCard } from "../../components";
import {
  border,
  borderBottomBlue4,
  colorGray,
  flexChild,
  fs12RegGray5,
  fs16BoldBlack2,
  fs16BoldBlue1,
  fs18BoldBlack2,
  px,
  rowCenterVertical,
  sh12,
  sh8,
  shadow12Blue110,
  sw1,
  sw16,
  sw24,
  sw328,
  sw8,
} from "../../styles";

interface SummaryColorCardProps {
  colorCardProps?: BaseColorCardProps;
  data: LabeledTitleProps[];
  headerTitle: string;
  section?: ISummaryColorCardSection[];
  spaceToTop?: number;
  textCardProps?: BaseTextCardProps;
}

export const summaryColorCardStyleProps = {
  containerStyle: shadow12Blue110,
  contentStyle: { ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8 },
  headerStyle: { backgroundColor: colorGray._2, ...shadow12Blue110, ...px(sw24) },
  header: { labelStyle: fs18BoldBlack2 },
};

export const SummaryColorCard: FunctionComponent<SummaryColorCardProps> = ({
  colorCardProps,
  data,
  headerTitle,
  section,
  spaceToTop,
  textCardProps,
}: SummaryColorCardProps) => {
  const headerProps =
    colorCardProps !== undefined
      ? { labelStyle: fs16BoldBlue1, label: headerTitle }
      : { ...summaryColorCardStyleProps.header, label: headerTitle };

  return (
    <Fragment>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      <ColorCard
        {...summaryColorCardStyleProps}
        {...colorCardProps}
        content={
          <View>
            <TextCard data={data} itemStyle={{ width: sw328 }} showEmptyDash={true} {...textCardProps} />
            {section !== undefined && section.length > 0 ? (
              <Fragment>
                {section.map((sectionItem: ISummaryColorCardSection, indexItem: number) => {
                  return (
                    <Fragment key={indexItem}>
                      {sectionItem.data.map((textCardData: LabeledTitleProps[], index: number) => {
                        const iconTitle =
                          sectionItem.textWithCount === true && sectionItem.data.length > 1
                            ? `${sectionItem.text} ${index + 1}`
                            : sectionItem.text;

                        return (
                          <View key={index}>
                            <CustomSpacer space={sh8} />
                            <View style={rowCenterVertical}>
                              <IconText name={sectionItem.iconName} iconSize={sw24} text={iconTitle} textStyle={fs16BoldBlack2} />
                              {sectionItem.subtitle !== undefined ? (
                                <Fragment>
                                  <CustomSpacer isHorizontal={true} space={sw8} />
                                  <Text style={fs12RegGray5}>{sectionItem.subtitle}</Text>
                                </Fragment>
                              ) : null}
                              <CustomSpacer isHorizontal={true} space={sw16} />
                              <View style={{ ...borderBottomBlue4, ...flexChild }} />
                              <CustomSpacer isHorizontal={true} space={sw24} />
                            </View>
                            <CustomSpacer space={sh12} />
                            <TextCard data={textCardData} itemStyle={{ width: sw328 }} showEmptyDash={true} {...textCardProps} />
                          </View>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </Fragment>
            ) : null}
          </View>
        }
        header={headerProps}
      />
    </Fragment>
  );
};
