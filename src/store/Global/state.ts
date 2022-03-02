export type GlobalState = {
  agent?: IAgentProfile;
  config?: IConfig;
  events?: IEvent[];
  loading?: boolean;
  unreadMessages?: string;
};

export const globalInitialState: GlobalState = {
  agent: undefined,
  config: undefined,
  events: undefined,
  loading: false,
  unreadMessages: "0",
};
