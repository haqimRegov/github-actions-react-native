declare interface ITermsAndConditions {
  title: string;
  subsection: IBasicAccordionSection[];
}

declare interface ITermsList {
  label?: string;
  content: string;
}
interface IBasicAccordionSection {
  heading?: string;
  subHeading?: string;
  termsList: ITermsList[];
}

interface ICustomAccordionSection {
  title: string;
  custom?: JSX.Element;
  subsection?: IBasicAccordionSection[];
}
