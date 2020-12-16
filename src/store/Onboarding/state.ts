export type OnboardingState = {
  finishedSteps: TypeOnboardingKey[];
};

export const onboardingInitialState: OnboardingState = {
  finishedSteps: [],
};
