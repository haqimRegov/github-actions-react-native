export type ClientState = {
  details?: IClientDetails;
  loading: boolean;
};

export const clientInitialState: ClientState = {
  details: undefined,
  loading: false,
};
