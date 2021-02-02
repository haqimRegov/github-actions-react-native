declare interface CustomMarkingCustomStyles {
  container: import("react-native").ViewStyle;
  text: import("react-native").TextStyle;
}

declare interface CustomMarking {
  endingDay?: boolean;
  startingDay?: boolean;
  disabled?: boolean;
  dots: import("react-native-calendars").CalendarDot[];
  selected?: boolean;
  selectedColor?: string;
}

declare interface ICalendarsCustomMarking {
  [date: string]: CustomMarking;
}

declare interface CustomMarkingDots {
  dots: import("react-native-calendars").CalendarDot[];
}

declare interface ICalendarsCustomMarkingDots {
  [date: string]: CustomMarkingDots;
}
