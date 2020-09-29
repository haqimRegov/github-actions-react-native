export type GlobalState = {
  agent?: IAgentProfile;
  config?: IConfig;
  loading?: boolean;
};

export const globalInitialState: GlobalState = {
  agent: undefined,
  config: undefined,
  loading: false,
};
