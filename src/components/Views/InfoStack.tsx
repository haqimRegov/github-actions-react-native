import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import {
  alignItemsEnd,
  border,
  borderBottomBlue3,
  colorBlue,
  colorWhite,
  flexRow,
  fs12RegGray4,
  fs14BoldBlue1,
  fs14BoldGray5,
  fsAlignRight,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  sh8,
  sw1,
  sw144,
  sw16,
  sw232,
  sw440,
  sw448,
  sw8,
  sw96,
} from "../../styles";
import { TableBadge } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface IInfoStackData {
  label: string;
  value: string;
}

interface InfoStackProps {
  data: IInfoStackData[];
  spaceToData?: number;
  title?: string;
  titleBadge?: string;
}

export const InfoStack: FunctionComponent<InfoStackProps> = ({ data, spaceToData, titleBadge, title }: InfoStackProps) => {
  const containerStyle: ViewStyle = { ...border(colorBlue._3, sw1, sw8), backgroundColor: colorWhite._1, width: sw440 };
  const cardStyle: ViewStyle = { ...py(sh16), ...px(sw16) };
  return (
    <Fragment>
      <View style={{ width: sw448 }}>
        <View style={containerStyle}>
          <View style={cardStyle}>
            <View style={rowCenterVertical}>
              {title !== undefined ? (
                <Fragment>
                  <Text style={fs14BoldBlue1}>{title}</Text>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                </Fragment>
              ) : null}
              {titleBadge !== undefined ? <TableBadge text={titleBadge} color="primary" /> : null}
            </View>
            {title !== undefined || titleBadge !== undefined ? <CustomSpacer space={spaceToData || sh12} /> : null}
            {data.map(({ label, value }: IInfoStackData, index: number) => {
              return (
                <View key={index}>
                  <View style={flexRow}>
                    <View style={{ maxWidth: sw144 }}>
                      <Text style={fs12RegGray4}>{label}</Text>
                    </View>
                    <CustomFlexSpacer />
                    <View style={{ ...alignItemsEnd, minWidth: sw96, maxWidth: sw232 }}>
                      <Text style={{ ...fs14BoldGray5, ...fsAlignRight }}>{value}</Text>
                    </View>
                  </View>
                  {index === data.length - 1 ? null : (
                    <Fragment>
                      <CustomSpacer space={sh8} />
                      <View style={borderBottomBlue3} />
                      <CustomSpacer space={sh8} />
                    </Fragment>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Fragment>
  );
};
