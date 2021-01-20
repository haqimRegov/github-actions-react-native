declare interface IUpdateInboxRequest {
  notificationIds: string[];
}

declare interface IUpdateInboxResult {
  status: string;
  message: string;
}

declare type IUpdateInboxResponse = IQueryResponse<IUpdateInboxResult> | undefined;

declare interface IUpdateInboxQuery {
  updateInbox: IUpdateInboxResponse;
}
