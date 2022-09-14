export type GlobalState = {
  agent?: IAgentProfile;
  config?: IConfig;
  events?: IEvent[];
  isMultiUtmc?: boolean;
  isTermsAgreed: boolean;
  loading?: boolean;
  unreadMessages?: string;
};

export const globalInitialState: GlobalState = {
  agent: undefined,
  config: undefined,
  events: undefined,
  isMultiUtmc: undefined,
  isTermsAgreed: false,
  loading: false,
  unreadMessages: "0",
};
