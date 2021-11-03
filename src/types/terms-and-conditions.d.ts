declare interface ITermsAndConditions {
  title: string;
  subsection: IBasicAccordionSection[];
}

declare interface IAgreeTerms {
  agree1: boolean;
  agree2: boolean;
  agree3: boolean;
}

declare interface ITermsList {
  label?: string;
  content: IContent[];
}

declare interface IContent {
  indentSpace?: number;
  prefix?: string;
  prefixIndent?: boolean;
  prefixIndentSpace?: number;
  text: string;
}
interface IBasicAccordionSection {
  heading?: string;
  subHeading?: string;
  termsList: ITermsList[];
}

interface ITermsAccordionSection {
  title: string;
  custom?: JSX.Element;
  subsection?: IBasicAccordionSection[];
}
