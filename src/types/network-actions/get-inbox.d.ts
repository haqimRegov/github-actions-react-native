declare interface IGetInboxRequest {
  page: string;
  search: string;
}

declare interface IGetInboxMessage {
  createdOn: string;
  isRead: boolean;
  isSeen: boolean;
  message: string;
  notificationId: string;
  searchKey: string;
  searchType: string;
  senderName: string;
  source: AvatarType;
  title: string;
  updatedAt: string;
}

declare interface IGetInboxResult {
  inbox: IGetInboxMessage[];
  newMessageCount: string;
  page: string;
  pages: string;
}

declare type IGetInboxResponse = IQueryResponse<IGetInboxResult> | undefined;

declare interface IGetInboxQuery {
  getInbox: IGetInboxResponse;
}
