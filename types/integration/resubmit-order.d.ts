declare interface IResubmitOrderRequest {
  orderNumber: string;
}

declare interface IResubmitOrderResult {
  status: boolean;
  message: string;
}

declare type IResubmitOrderResponse = IMutationResponse<IResubmitOrderResult> | undefined;

declare interface IResubmitOrderMutation {
  resubmitOrder: IResubmitOrderResponse;
}
