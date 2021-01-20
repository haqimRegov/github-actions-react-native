export type GlobalState = {
  agent?: IAgentProfile;
  config?: IConfig;
  loading?: boolean;
  unreadMessages?: string;
};

export const globalInitialState: GlobalState = {
  agent: undefined,
  config: undefined,
  loading: false,
  unreadMessages: "0",
};
