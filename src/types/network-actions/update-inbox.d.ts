declare type IUpdateInboxRequest = Record<string, unknown>;

declare interface IUpdateInboxResult {
  message: string;
  status: string;
}

declare type IUpdateInboxResponse = IQueryResponse<IUpdateInboxResult> | undefined;

declare interface IUpdateInboxQuery {
  updateInbox: IUpdateInboxResponse;
}
