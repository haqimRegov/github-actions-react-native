import { SAMPLE_AGENT } from "../../mocks";

export type GlobalState = {
  agent?: IAgentProfile;
  config?: IConfig;
  loading?: boolean;
};

export const globalInitialState: GlobalState = {
  agent: SAMPLE_AGENT,
  config: undefined,
  loading: false,
};
