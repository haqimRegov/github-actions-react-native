import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Calendar, DateObject } from "react-native-calendars";

import { CALENDAR_FORMAT, DEFAULT_DATE_FORMAT, MONTH_YEAR_FORMAT } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circle,
  colorBlack,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs12SemiBoldBlue1,
  fs12SemiBoldGray6,
  fs14BoldGray6,
  fs16RegGray6,
  fsAlignCenter,
  fullHW,
  px,
  py,
  sh16,
  sh24,
  sh56,
  sh8,
  shadow16Blue112,
  spaceBetweenHorizontal,
  sw16,
  sw24,
  sw32,
  sw360,
  sw48,
} from "../../styles";
import { CustomTextInput } from "../Input";
import { RNModal } from "../Modals";
import { CustomSpacer } from "../Views";

export interface CalendarProps extends ICalendarsProps {
  arrowColor?: string;
  backgroundColor?: string;
  endDate?: Date;
  handleSetEndDate?: (date: Date | undefined) => void;
  handleSetStartDate: (date: Date | undefined) => void;
  markingDots?: ICalendarsCustomMarkingDots;
  selectedDayColor?: string;
  startDate?: Date;
  textColor?: string;
  textDisabledColor?: string;
  textFontSize?: number;
  todayBackgroundColor?: string;
  todayTextColor?: string;
}

export const CustomCalendar: FunctionComponent<CalendarProps> = ({
  arrowColor,
  backgroundColor,
  disableMonthChange,
  endDate,
  firstDay,
  handleSetEndDate,
  handleSetStartDate,
  hideArrows,
  hideDayNames,
  hideExtraDays,
  maxDate,
  minDate,
  monthFormat,
  onDayPress,
  onMonthChange,
  selectedDayColor,
  showWeekNumbers,
  startDate,
  markingDots,
  textColor,
  textDisabledColor,
  todayBackgroundColor,
  todayTextColor,
  ...otherProps
}: CalendarProps) => {
  const [selectedMonth, setSelectedMonth] = useState<DateObject | undefined>();
  const todayDate: string = moment().format(DEFAULT_DATE_FORMAT);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  let today: ICalendarsCustomMarking = {};
  let startDay: ICalendarsCustomMarking = {};
  let endDay: ICalendarsCustomMarking = {};

  const SELECTED_DAY_BACKGROUND_COLOR = colorRed._1;

  const CustomCalendarDateConverter = (date?: Date): ICalendarsDate => {
    const convert = moment(date);
    return {
      dateString: moment(date).format(CALENDAR_FORMAT),
      day: convert.get("day"),
      month: convert.get("month"),
      timestamp: convert.valueOf(),
      year: convert.get("year"),
    };
  };

  const convertedStartDate = CustomCalendarDateConverter(startDate);
  const convertedEndDate = CustomCalendarDateConverter(endDate);

  const todayDateStyle = (bgColor: string): CustomMarking => ({
    dots: [],
    selected: true,
    selectedColor: bgColor || SELECTED_DAY_BACKGROUND_COLOR,
  });

  const SELECTED_DATE_STYLE: CustomMarking = {
    dots: [],
    selectedColor: SELECTED_DAY_BACKGROUND_COLOR,
  };

  const END_DATE_STYLE: CustomMarking = {
    dots: [],
    selectedColor: SELECTED_DAY_BACKGROUND_COLOR,
  };

  const getVisibleMonth = (dateStart?: Date, dateEnd?: Date) => {
    if (dateStart !== undefined && dateEnd === undefined) {
      return dateStart;
    }
    if (dateEnd !== undefined) {
      return dateEnd;
    }
    return new Date();
  };

  const dMarkingDots: ICalendarsCustomMarkingDots = markingDots || {};
  if (todayBackgroundColor) {
    const styling = todayDateStyle(todayBackgroundColor);
    today = {
      [todayDate]: { ...styling, ...dMarkingDots[todayDate] },
    };
  }
  if (startDate) {
    startDay = {
      [convertedStartDate.dateString]: { selected: true, startingDay: true, ...SELECTED_DATE_STYLE },
    };
  }
  if (endDate) {
    endDay = {
      [convertedEndDate.dateString]: { selected: true, endingDay: true, ...END_DATE_STYLE },
    };
  }

  const handleChangeMonth = (month: DateObject) => {
    setSelectedMonth(month);
    if (onMonthChange) {
      onMonthChange(moment(month.timestamp, "").toDate());
    }
  };

  const handlePressUnselectDay = (day?: ICalendarsDate) => {
    if (onDayPress !== undefined) {
      onDayPress(day);
    }
  };

  const handleSelectDate = (day: ICalendarsDate) => {
    if (startDate === undefined || day.timestamp < convertedStartDate.timestamp) {
      handleSetStartDate(moment(day.timestamp, "").toDate());
      return undefined;
    }
    if (day.dateString === convertedStartDate.dateString) {
      handleSetStartDate(undefined);
      if (handleSetEndDate) {
        handleSetEndDate(undefined);
      }
      handlePressUnselectDay();
      return false;
    }
    if (handleSetEndDate) {
      if (endDate === undefined || day.timestamp > convertedEndDate.timestamp) {
        handleSetEndDate(moment(day.timestamp, "").toDate());
        return undefined;
      }
      if (day.dateString === convertedEndDate.dateString) {
        handleSetEndDate(undefined);
        handlePressUnselectDay();
        return false;
      }
      handleSetStartDate(moment(day.timestamp, "").toDate());
      handleSetEndDate(undefined);
      return undefined;
    }
    handleSetStartDate(moment(day.timestamp, "").toDate());
    return undefined;
  };

  const current: Date | undefined = getVisibleMonth(startDate, endDate);
  const markedDates = { ...dMarkingDots, ...today, ...startDay, ...endDay };

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const calendarContainer: ViewStyle = {
    // backgroundColor: colorWhite._1,
    ...shadow16Blue112,
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleShowCalendar}>
        <View onStartShouldSetResponderCapture={() => true}>
          <CustomTextInput
            // disabled={disabled}
            editable={false}
            placeholder={"dd/mm/yyyy"}
            rightIcon="calendar"
            value={moment(startDate).format(DEFAULT_DATE_FORMAT)}
          />
        </View>
      </TouchableWithoutFeedback>
      <RNModal visible={showCalendar}>
        <View style={{ ...fullHW, ...centerHV }}>
          <View style={calendarContainer}>
            <CustomSpacer space={sh8} />
            <Calendar
              {...otherProps}
              dayComponent={(dayComponentProps) => {
                const isSelected = CustomCalendarDateConverter(startDate).dateString === dayComponentProps.date.dateString;
                const dayTextColor = isSelected ? colorWhite._1 : colorBlue._1;
                const selectedDayStyle: ViewStyle = { backgroundColor: colorRed._1, ...circle(sw32, colorRed._1) };
                const defaultDayStyle: ViewStyle = { width: sw32, height: sw32 };
                const dayViewStyle: ViewStyle = isSelected ? selectedDayStyle : defaultDayStyle;
                const dayTextStyle: TextStyle = { ...fs16RegGray6, color: dayTextColor };

                const dayPress = () => {
                  handleSelectDate(dayComponentProps.date);
                  setShowCalendar(false);
                };

                return (
                  <TouchableWithoutFeedback onPress={dayPress}>
                    <View style={{ ...centerHV, ...dayViewStyle }}>
                      <Text style={dayTextStyle}>{dayComponentProps.date.day}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
              renderHeader={(date) => {
                return <Text style={fs14BoldGray6}>{moment(date[0]).format(MONTH_YEAR_FORMAT)}</Text>;
              }}
              current={selectedMonth?.dateString || current}
              disableMonthChange={disableMonthChange !== undefined ? disableMonthChange : true}
              firstDay={firstDay || 1}
              hideArrows={hideArrows !== undefined ? hideArrows : false}
              hideDayNames={hideDayNames}
              hideExtraDays={hideExtraDays !== undefined ? hideExtraDays : true}
              markedDates={markedDates}
              markingType="multi-dot"
              maxDate={maxDate}
              minDate={minDate}
              monthFormat={monthFormat !== undefined ? monthFormat : "MMMM yyyy"}
              onDayPress={handleSelectDate}
              onMonthChange={handleChangeMonth}
              renderArrow={(dir: string) => {
                return <IcoMoon name={`caret-${dir}`} color={arrowColor || colorBlue._1} size={sw24} />;
              }}
              style={{ width: sw360, ...px(sw16), ...py(sh16), borderRadius: sw16 }}
              showWeekNumbers={showWeekNumbers !== undefined ? showWeekNumbers : false}
              theme={{
                arrowColor: arrowColor || colorBlue._1,
                backgroundColor: backgroundColor || colorWhite._1,
                calendarBackground: backgroundColor || colorWhite._1,
                dayTextColor: textColor || colorBlack._1,
                monthTextColor: textColor || colorBlack._1,
                selectedDayBackgroundColor: arrowColor || colorRed._1,
                selectedDayTextColor: selectedDayColor || colorWhite._1,
                selectedDotColor: colorRed._1,
                textDayFontFamily: fs16RegGray6.fontFamily,
                textDayFontSize: fs16RegGray6.fontSize,
                textDayFontWeight: fs16RegGray6.fontWeight || "normal",
                textDisabledColor: textDisabledColor || colorWhite._1,
                textMonthFontFamily: fs12SemiBoldGray6.fontFamily,
                textMonthFontSize: fs12SemiBoldGray6.fontSize,
                textMonthFontWeight: undefined,
                todayTextColor: todayTextColor || colorBlack._1,
                "stylesheet.calendar.header": {
                  week: { ...centerVertical, ...flexRow, ...spaceBetweenHorizontal, height: sh24 },
                  dayHeader: { ...fs12SemiBoldBlue1, ...fsAlignCenter, width: sw48 },
                  header: { ...centerVertical, ...flexRow, ...spaceBetweenHorizontal, height: sh56, marginBottom: sh8 },
                },
                // textDayHeaderFontSize: 40,
                // textDayStyle: fs12RegBlue12,
                // dotColor: "",
                // textDayHeaderFontFamily: "",
                // textDayHeaderFontWeight: "",
                // textSectionTitleColor: "",
                // indicatorColor: "",
                // textDayStyle: "",
                // dotStyle: "",
                // arrowStyle: "",
              }}
            />
          </View>
        </View>
      </RNModal>
    </View>
  );
};
