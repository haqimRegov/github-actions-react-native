import DateTimePicker from "@react-native-community/datetimepicker";
import React, { Fragment, useState } from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { Language } from "../../constants/language";
import {
  colorGray,
  colorTransparent,
  colorWhite,
  fullHW,
  noBGColor,
  sh228,
  sh276,
  sh38,
  sh40,
  sh42,
  sw1,
  sw20,
  sw32,
  sw358,
  sw359,
  sw360,
} from "../../styles";
import { CustomTextInput } from "../Input";
import { BasicModal } from "../Modals";
import { CustomButton } from "../Touchables";

const { PAYMENT } = Language.PAGE;

export interface IDatePicker {
  buttonText: string;
  datePicker: boolean;
  handleData: (data: any) => void;
  setShowCollapsible: (toggle: boolean) => void;
  showCollapsible: boolean;
  value?: string;
}

export const DateAndTimePicker = ({ buttonText, datePicker, handleData, setShowCollapsible, showCollapsible, value }: IDatePicker) => {
  const [date, setDate] = useState(new Date());
  const [layout, setLayout] = useState<any>();
  const [ref, setRef] = useState<any>();

  const handleChange = (_event, selectedDate) => {
    setDate(selectedDate);
  };

  const handleCollapse = () => {
    ref.measure((_fx, _fy, _width, _height, px, py) => {
      setLayout({ x: px, y: py + sh42 });
    });
    setShowCollapsible(!showCollapsible);
  };

  const unCollapsedBorder: ViewStyle = { borderRadius: sw32, borderWidth: sw1 };
  const collapsedBorder: ViewStyle = {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: sw20,
    borderWidth: sw1,
  };
  const border = showCollapsible === false ? collapsedBorder : unCollapsedBorder;
  const absolutePosition: ViewStyle = layout !== undefined ? { left: layout.x, position: "absolute", top: layout.y } : {};
  const containerStyle: ViewStyle = { ...border, borderColor: colorGray._7, width: sw360 };
  const collapsibleStyle: ViewStyle = {
    ...absolutePosition,
    borderBottomLeftRadius: sw20,
    borderBottomRightRadius: sw20,
    borderColor: colorTransparent,
    borderLeftColor: colorGray._7,
    borderRightColor: colorGray._7,
    borderTopWidth: 0,
    borderWidth: sw1,
    height: sh276,
    justifyContent: "center",
    width: sw360,
  };
  const inputStyle: ViewStyle = { ...noBGColor, borderWidth: 0, height: sh38 };
  const icon = datePicker === true ? "calendar" : "clock";
  const mode = datePicker === true ? "date" : "time";
  const placeholderText = datePicker === true ? PAYMENT.LABEL_DATE_FORMAT : PAYMENT.LABEL_TIME;

  return (
    <Fragment>
      <View style={{ height: sh40, width: sw360 }}>
        <View style={containerStyle} ref={(refs) => setRef(refs)}>
          <TouchableWithoutFeedback onPress={handleCollapse}>
            <View onStartShouldSetResponderCapture={() => true}>
              <CustomTextInput
                editable={false}
                placeholder={placeholderText}
                placeholderTextColor={colorGray._7}
                rightIcon={icon}
                value={value}
                viewStyle={inputStyle}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <BasicModal visible={!showCollapsible} hasBackdrop={false}>
        <TouchableWithoutFeedback onPress={() => setShowCollapsible(!showCollapsible)}>
          <View style={{ ...fullHW }}>
            <Collapsible collapsed={showCollapsible} style={collapsibleStyle}>
              <View>
                <DateTimePicker
                  display="calendar"
                  is24Hour={true}
                  mode={mode}
                  onChange={handleChange}
                  style={{ width: sw358, backgroundColor: colorWhite._1, height: sh228 }}
                  testID="dateTimePicker"
                  value={date}
                />
                <CustomButton
                  buttonStyle={{
                    borderBottomRightRadius: sw20,
                    borderBottomLeftRadius: sw20,
                    width: sw359,
                  }}
                  onPress={() => handleData(date)}
                  text={buttonText}
                />
              </View>
            </Collapsible>
          </View>
        </TouchableWithoutFeedback>
      </BasicModal>
    </Fragment>
  );
};
