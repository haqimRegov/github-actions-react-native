declare interface IContentItem {
  title: string;
  route: string;
}

declare interface IOnboarding {
  content?: IContentItem[];
  label: string;
  route?: string;
}

declare interface OnboardingContentProps {
  handleNextStep: (nextRoute: string) => void;
}

declare interface OnboardingStepsProps {
  activeContent?: IContentItem | IOnboarding;
  activeSection: number;
  collapse?: boolean;
  handleContentChange: (item: IContentItem | IOnboarding) => void;
  onPressBackdrop?: () => void;
  onPressExpand?: () => void;
  overlay?: boolean;
  RenderContent: (props: OnboardingContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | IOnboarding) => void;
  setActiveSection: (section: any) => void;
  setFinishedStep: (step: number[]) => void;
  steps: IOnboarding[];
  visitedSections: number[];
}
