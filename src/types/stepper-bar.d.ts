declare interface IStepperBarRef<TKeys> {
  handleNextStep: (route: TKeys) => void;
}

declare interface IStepperBarContentItem<TKeys> {
  route: TKeys;
  title: string;
  key: TKeys;
}

declare interface IStep<TKeys> {
  content?: IStepperBarContentItem<TKeys>[];
  key: TKeys;
  label: string;
  route?: TKeys;
}

// declare interface StepperBarContentProps<TKeys> {
//   cancelSteps?: boolean;
//   handleCancelSteps?: () => void;
//   handleResetSteps: () => void;
//   handleNextStep: (route: TKeys) => void;
// }
