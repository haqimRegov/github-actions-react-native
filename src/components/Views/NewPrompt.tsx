import React, { Fragment, FunctionComponent } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  flexRowCC,
  fs10RegGray6,
  fs24BoldBlue1,
  fsAlignCenter,
  imageContain,
  px,
  sh16,
  sh20,
  sh24,
  sh28,
  sh40,
  sh96,
  shadow12Blue108,
  sw136,
  sw28,
  sw48,
  sw536,
  sw56,
  sw8,
} from "../../styles";
import { NewActionButtons, NewActionButtonsProps } from "./NewActionButtons";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface NewPromptProps extends NewActionButtonsProps {
  children?: JSX.Element;
  closable?: boolean;
  contentStyle?: ViewStyle;
  handleClose?: () => void;
  illustration?: ImageSourcePropType;
  illustrationStyle?: ImageStyle;
  spaceToButton?: number;
  spaceToIllustration?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  title?: string;
  titleStyle?: TextStyle;
}

// interface IPropsCache {
//   illustration?: ImageSourcePropType;
//   primaryButton?: string;
//   secondaryButton?: string;
//   subtitle?: string;
//   title?: string;
// }

export const NewPrompt: FunctionComponent<NewPromptProps> = ({
  children,
  closable,
  contentStyle,
  handleClose,
  illustration,
  illustrationStyle,
  spaceToButton,
  spaceToIllustration,
  spaceToTitle,
  spaceToTop,
  subtitle,
  subtitleStyle,
  title,
  titleStyle,
  ...actionButtonProps
}: NewPromptProps) => {
  const { buttonContainerStyle, primary, secondary } = actionButtonProps;

  // const propsCache = useRef<IPropsCache>({
  //   illustration: illustration,
  //   primaryButton: primary !== undefined ? primary.text : "",
  //   secondaryButton: secondary !== undefined ? secondary.text : "",
  //   subtitle: subtitle,
  //   title: title,
  // });
  // console.log("props", propsCache, primary);

  const modalContainer: ViewStyle = {
    backgroundColor: colorBlue._2,
    borderRadius: sw8,
    width: sw536,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw8,
    borderBottomRightRadius: sw8,
    height: sh96,
    ...shadow12Blue108,
    ...buttonContainerStyle,
  };

  const defaultIllustrationStyle: ImageStyle = { ...imageContain, height: sw136, width: sw136, ...illustrationStyle };

  const topSpace = spaceToTop !== undefined ? spaceToTop : sh40;
  const defaultTopSpace = closable === true ? sh20 : topSpace;

  return (
    <View style={modalContainer}>
      {closable === true ? (
        <Fragment>
          <CustomSpacer space={sh28} />
          <View style={flexRow}>
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._1} name="close" onPress={handleClose} size={sh24} suppressHighlighting={true} />
            <CustomSpacer isHorizontal={true} space={sw28} />
          </View>
        </Fragment>
      ) : null}
      <View>
        <CustomSpacer space={defaultTopSpace} />
        {illustration !== undefined ? (
          <View style={centerHV}>
            <Image source={illustration} style={defaultIllustrationStyle} />
            <CustomSpacer space={spaceToIllustration || sh24} />
          </View>
        ) : null}
      </View>
      <View style={{ ...centerVertical, ...px(sw48), ...contentStyle }}>
        {title !== undefined ? <Text style={{ ...fs24BoldBlue1, ...fsAlignCenter, ...titleStyle }}>{title}</Text> : null}
        {subtitle !== undefined ? (
          <Fragment>
            <CustomSpacer space={spaceToTitle || sh16} />
            <Text style={{ ...fs10RegGray6, ...fsAlignCenter, ...subtitleStyle }}>{subtitle}</Text>
          </Fragment>
        ) : null}
        {children}
        <CustomSpacer space={spaceToButton || sh40} />
      </View>
      {primary !== undefined || secondary !== undefined ? (
        <NewActionButtons
          buttonContainerStyle={buttonContainer}
          primary={primary !== undefined ? { ...primary, text: primary.text } : undefined}
          secondary={secondary !== undefined ? { ...secondary, text: secondary.text } : undefined}
        />
      ) : null}
    </View>
  );
};
