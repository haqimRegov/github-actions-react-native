import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { flexRow, fs10BoldBlack2, fs16BoldBlack2, fsCapitalize, sh6, sw144, sw16 } from "../../styles";
import { LabeledTitle, LabeledTitleProps } from "../Views/LabeledTitle";
import { CustomSpacer } from "../Views/Spacer";

export interface CardV5Props {
  data: LabeledTitleProps[];
  spaceBetween?: number;
}
export const CardV5: FunctionComponent<CardV5Props> = ({ data, spaceBetween }: CardV5Props) => {
  const defaultSpace = spaceBetween !== undefined ? spaceBetween : sw16;

  return (
    <View style={flexRow}>
      {data.map((item: LabeledTitleProps, index: number) => (
        <Fragment key={index}>
          {index === 0 ? null : <CustomSpacer isHorizontal={true} space={defaultSpace} />}
          <LabeledTitle
            {...item}
            labelStyle={fs10BoldBlack2}
            onPress={item.onPress}
            spaceToLabel={sh6}
            style={{ minWidth: sw144 }}
            titleStyle={{ ...fs16BoldBlack2, ...fsCapitalize }}
          />
        </Fragment>
      ))}
    </View>
  );
};
