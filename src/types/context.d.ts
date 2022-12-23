declare interface IContextProvider {
  contextState: IContextState;
  duplicateModal: boolean;
  expired: boolean;
  expiryModal: boolean;
  handleContextState: (update: Partial<IContextState>) => void;
  loggedOut: boolean;
  setContextState: (value: IContextState) => void;
  setDuplicateModal: (toggle: boolean) => void;
  setExpiryModal: (toggle: boolean) => void;
  setExpired: (toggle: boolean) => void;
  setLoggedOut: (toggle: boolean) => void;
}

declare interface IContextState {
  duplicateModal: boolean;
  expired: boolean;
  expiryModal: boolean;
  loggedOut: boolean;
}
