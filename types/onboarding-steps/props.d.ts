declare interface RenderContentProps {
  handleNextStep: (nextRoute: string) => void;
}

declare interface OnboardingStepsProps {
  activeContent?: IContentItem | IAccordionContent;
  activeSection: number;
  handleContentChange: (item: IContentItem | IAccordionContent) => void;
  RenderContent: (props: RenderContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | IAccordionContent) => void;
  setActiveSection: (section: any) => void;
  setFinishedStep: (step: number[]) => void;
  steps: IAccordionContent[];
  visitedSections: number[];
}
