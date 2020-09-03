import React, { Fragment } from "react";
import { TextStyle, View } from "react-native";

import { CustomSpacer, LabeledTitle } from "../../components";
import { flexRow, fs10BoldBlack2, fs16BoldBlack1, fullWidth, px, sh6, sw240, sw32 } from "../../styles";

export interface CardItem {
  label: string;
  onPress?: () => void;
  value: string;
}

export interface InfoSummaryCardProps {
  data: CardItem[];
  labelStyle: TextStyle;
}
export const CardV2 = ({ data, labelStyle }: InfoSummaryCardProps) => {
  const defaultLabelStyle: TextStyle = { ...fs10BoldBlack2, ...labelStyle };
  return (
    <View style={{ ...flexRow, ...fullWidth }}>
      {data.map((item: CardItem) => (
        <Fragment key={item.value}>
          <LabeledTitle
            label={item.label}
            labelStyle={defaultLabelStyle}
            spaceToLabel={sh6}
            style={{ width: sw240, ...px(sw32) }}
            title={item.value}
            titleStyle={fs16BoldBlack1}
          />
          <CustomSpacer space={sw32} isHorizontal={true} />
        </Fragment>
      ))}
    </View>
  );
};
