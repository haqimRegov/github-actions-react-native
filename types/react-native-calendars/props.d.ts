declare type CalendarsDirection = "left" | "right";

declare interface ICalendarsProps {
  dayComponent?: import("react").FunctionComponent;
  disabledByDefault?: boolean;
  disableMonthChange?: boolean;
  firstDay?: number;
  hideArrows?: boolean;
  hideDayNames?: boolean;
  hideExtraDays?: boolean;
  maxDate?: string;
  minDate?: string;
  monthFormat?: string;
  onDayLongPress?: () => void;
  onDayPress?: (date: ICalendarsDate | undefined) => void;
  onMonthChange?: (date: Date) => void;
  onPressArrowLeft?: () => void;
  onPressArrowRight?: () => void;
  onVisibleMonthsChange?: () => void;
  renderArrow?: (direction: CalendarsDirection) => import("react").ReactNode;
  showWeekNumbers?: boolean;
}
