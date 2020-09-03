import { IFundSummary } from "./fund-summary";

export interface IOrderSummary {
  date: string;
  funds: IFundSummary[];
  orderNo: string;
  totalAmount: number;
}
