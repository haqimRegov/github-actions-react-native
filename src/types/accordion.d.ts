declare interface IAccordionSection {
  title: string;
  sections: ISection[];
}

declare interface ISection {
  heading?: string;
  subHeading?: string;
  termsList: {
    label?: string;
    content: string;
  }[];
}

declare interface IBasicAccordionProps {
  expandAll?: boolean;
  expandMultiple?: boolean;
  headerStyle?: import("react-native").ViewStyle;
  hideIcon?: boolean;
  icon?: string;
  sections: IAccordionSection[];
  spaceInBetween?: number;
  titleStyle?: import("react-native").TextStyle;
}
