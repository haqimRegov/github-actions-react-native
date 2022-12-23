import React, { createContext, FunctionComponent, ReactNode, useState } from "react";

const initialState: IContextState = {
  duplicateModal: false,
  expired: false,
  expiryModal: false,
  loggedOut: false,
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext<IContextProvider>({
  contextState: initialState,
  duplicateModal: false,
  expired: false,
  expiryModal: false,
  handleContextState: () => {},
  loggedOut: false,
  setContextState: () => {},
  setDuplicateModal: () => {},
  setExpired: () => {},
  setExpiryModal: () => {},
  setLoggedOut: () => {},
});

const { Provider } = ModalContext;

export const ModalProvider: FunctionComponent<ModalProviderProps> = ({ children }: ModalProviderProps) => {
  const [contextState, setContextState] = useState<IContextState>(initialState);
  const { duplicateModal, expired, expiryModal, loggedOut } = contextState;

  const handleContextState = (state: Partial<IContextState>) => {
    setContextState({ ...contextState, ...state });
  };

  const setDuplicateModal = (toggle: boolean) => {
    setContextState({ ...contextState, duplicateModal: toggle });
  };

  const setExpiryModal = (toggle: boolean) => {
    setContextState({ ...contextState, expiryModal: toggle });
  };

  const setExpired = (toggle: boolean) => {
    setContextState({ ...contextState, expired: toggle });
  };

  const setLoggedOut = (toggle: boolean) => {
    setContextState({ ...contextState, loggedOut: toggle });
  };

  return (
    <Provider
      value={{
        contextState,
        duplicateModal,
        expired,
        expiryModal,
        handleContextState,
        loggedOut,
        setContextState,
        setDuplicateModal,
        setExpired,
        setExpiryModal,
        setLoggedOut,
      }}>
      {children}
    </Provider>
  );
};
