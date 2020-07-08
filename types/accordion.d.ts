declare interface IAccordionSection {
  content: JSX.Element;
  title: string;
}

declare interface IBasicAccordionProps {
  expandMultiple?: boolean;
  headerStyle?: import("react-native").ViewStyle;
  hideIcon?: boolean;
  icon?: string;
  sections: IAccordionSection[];
  spaceInBetween?: number;
  titleStyle?: import("react-native").TextStyle;
}
