import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { ColorCard, CustomSpacer, IconText, TextCard } from "../../components";
import {
  border,
  borderBottomBlue4,
  colorGray,
  flexChild,
  fs16BoldBlack2,
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
} from "../../styles";

interface SummaryColorCardProps {
  data: LabeledTitleProps[];
  section?: ISummaryColorCardSection;
  headerTitle: string;
  spaceToTop?: number;
}

export const summaryColorCardStyleProps = {
  containerStyle: shadow12Blue110,
  contentStyle: { ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8 },
  headerStyle: { backgroundColor: colorGray._2, ...shadow12Blue110, ...px(sw24) },
  header: { labelStyle: fs18BoldBlack2 },
};

export const SummaryColorCard: FunctionComponent<SummaryColorCardProps> = ({
  data,
  section,
  headerTitle,
  spaceToTop,
}: SummaryColorCardProps) => {
  return (
    <Fragment>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      <ColorCard
        {...summaryColorCardStyleProps}
        content={
          <View>
            <TextCard data={data} itemStyle={{ width: sw328 }} showEmptyDash={true} />
            {section !== undefined && section.data.length > 0 ? (
              <Fragment>
                {section.data.map((textCardData: LabeledTitleProps[], index: number) => {
                  const iconTitle =
                    section.textWithCount === true && section.data.length > 1 ? `${section.text} ${index + 1}` : section.text;

                  return (
                    <View key={index}>
                      <CustomSpacer space={sh8} />
                      <View style={rowCenterVertical}>
                        <IconText name={section.iconName} iconSize={sw24} text={iconTitle} textStyle={fs16BoldBlack2} />
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={{ ...borderBottomBlue4, ...flexChild }} />
                        <CustomSpacer isHorizontal={true} space={sw24} />
                      </View>
                      <CustomSpacer space={sh12} />
                      <TextCard data={textCardData} itemStyle={{ width: sw328 }} showEmptyDash={true} />
                    </View>
                  );
                })}
              </Fragment>
            ) : null}
          </View>
        }
        header={{ ...summaryColorCardStyleProps.header, label: headerTitle }}
      />
    </Fragment>
  );
};
