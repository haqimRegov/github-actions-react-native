import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  flexRow,
  fs10RegBlue6,
  fs12BoldBlue1,
  px,
  py,
  sh32,
  sh4,
  sh8,
  sw12,
  sw144,
  sw16,
  sw4,
  sw8,
  sw96,
} from "../../styles";
import { MenuPopup } from "../Touchables/Menu";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export const TableHeaderPopup: FunctionComponent<TableHeaderPopupProps> = ({
  content,
  onPressContent,
  onPressTitle,
  selectedIndex,
  title,
  titleIcon,
  titleStyle,
  viewStyle,
}: TableHeaderPopupProps) => {
  return (
    <MenuPopup
      RenderButton={({ show }) => {
        const container: ViewStyle = { ...flexRow, ...centerVertical, ...px(sw8), width: sw96, ...viewStyle };
        const handlePress = () => {
          if (onPressTitle !== undefined) {
            onPressTitle({ show: show });
          } else {
            show();
          }
        };
        return (
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={container}>
              {title && <Text style={{ ...fs10RegBlue6, ...titleStyle }}>{title}</Text>}
              {titleIcon === undefined ? null : (
                <Fragment>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <IcoMoon
                    color={titleIcon.color || colorBlue._1}
                    name={titleIcon.name}
                    onPress={titleIcon.onPress}
                    size={titleIcon.size || sw12}
                    suppressHighlighting={true}
                  />
                </Fragment>
              )}
            </View>
          </TouchableWithoutFeedback>
        );
      }}
      RenderContent={({ hide }) => {
        return (
          <View style={{ width: sw144, ...py(sh8) }}>
            {content.map((item, index) => {
              const handlePress = () => {
                onPressContent({ hide: hide, text: item.text, key: item.key });
              };
              const selected = selectedIndex !== undefined && selectedIndex.includes(index);
              const backgroundColor = selected === true ? { backgroundColor: colorBlue._2 } : {};
              return (
                <TouchableWithoutFeedback key={index} onPress={handlePress}>
                  <View style={{ ...flexRow, ...centerVertical, ...px(sw16), ...py(sh4), height: sh32, ...backgroundColor }}>
                    <Text style={{ ...fs12BoldBlue1, ...item.textStyle }}>{item.text}</Text>
                    <CustomFlexSpacer />
                    {item.icon !== undefined && selected === true ? (
                      <Fragment>
                        <IcoMoon
                          color={item.icon.color || colorBlue._1}
                          name={item.icon.name}
                          onPress={item.icon.onPress}
                          size={item.icon.size || sw16}
                          suppressHighlighting={true}
                        />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                      </Fragment>
                    ) : null}
                    {/* {selected === false ? null : (
                      <Fragment>
                        <CustomFlexSpacer />
                        <CustomSpacer isHorizontal={true} space={sw12} />
                        <IcoMoon color={colorGreen._1} name="success-filled" size={sw24} />
                        <CustomSpacer isHorizontal={true} space={sw4} />
                      </Fragment>
                    )} */}
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        );
      }}
    />
  );
};
