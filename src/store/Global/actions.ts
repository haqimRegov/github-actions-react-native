import { typedAction } from "../actionCreator";
import { GlobalState } from "./state";

export const addAgent = (agent: IAgentProfile) => {
  return typedAction("global/ADD_AGENT", agent);
};

export const addConfig = (config: IConfig) => {
  return typedAction("global/ADD_CONFIG", config);
};

export const addGlobal = (global: GlobalState) => {
  return typedAction("global/ADD_GLOBAL", global);
};

export const updatedUnreadMessages = (count: string) => {
  return typedAction("global/UPDATE_UNREAD_MESSAGES", count);
};

export const setLoading = (loading: boolean) => {
  return typedAction("global/SET_LOADING", loading);
};

export const resetAgent = () => {
  return typedAction("global/RESET_AGENT");
};

export const resetEvents = () => {
  return typedAction("global/RESET_EVENTS");
};

export const resetConfig = () => {
  return typedAction("global/RESET_ORDERS");
};

export const resetGlobal = () => {
  return typedAction("global/RESET_GLOBAL");
};

export type GlobalAction = ReturnType<
  | typeof addAgent
  | typeof addConfig
  | typeof addGlobal
  | typeof resetAgent
  | typeof resetConfig
  | typeof resetEvents
  | typeof resetGlobal
  | typeof setLoading
  | typeof updatedUnreadMessages
>;

export const GlobalActionProps = {
  addAgent,
  addConfig,
  addGlobal,
  resetAgent,
  resetEvents,
  resetConfig,
  resetGlobal,
  setLoading,
  updatedUnreadMessages,
};

export type GlobalActionTypes = typeof GlobalActionProps;
