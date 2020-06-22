declare interface RenderContentProps {
  handleNextStep: (nextRoute: string) => void;
}

declare interface OnboardingStepsProps {
  activeContent?: IContentItem | IOnboarding;
  activeSection: number;
  handleContentChange: (item: IContentItem | IOnboarding) => void;
  RenderContent: (props: RenderContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | IOnboarding) => void;
  setActiveSection: (section: any) => void;
  setFinishedStep: (step: number[]) => void;
  steps: IOnboarding[];
  visitedSections: number[];
}
