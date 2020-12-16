declare interface IMutationResponse<T> extends IResponseErrorResult {
  data: IResponseResult<T> | null;
}

declare interface IQueryResponse<T> extends IResponseErrorResult {
  data: IResponseResult<T> | null;
}

declare interface IResponseError {
  errorCode: string;
  errorList?: string[];
  message: string;
  statusCode: string;
  [key: string]: any;
}

declare interface IResponseErrorResult {
  error: IResponseError | null;
}

declare interface IError {
  error: IResponseError;
}

declare interface IResponseResult<T> {
  result: T;
}

declare type ResponseErrorType = (error: IError) => void;
