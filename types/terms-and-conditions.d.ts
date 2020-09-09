declare interface ITermsAndConditions {
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
