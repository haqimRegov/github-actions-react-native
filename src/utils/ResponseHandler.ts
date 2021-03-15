import { Auth } from "aws-amplify";

import { ERRORS } from "../data/dictionary";
import { gqlOperation } from "../integrations";
import { ErrorHandler } from "./ErrorHandler";

export const responseHandler = async <ResultType extends {}, VariablesType extends {}, HeadersType extends {} = {}>(
  query: string,
  variables?: VariablesType,
  headers?: HeadersType,
  navigation?: IStackNavigationProp,
  handleError?: ResponseErrorType,
  tokenCheck?: boolean,
) => {
  try {
    if (tokenCheck !== false) {
      const currentSession = await Auth.currentSession();
      // eslint-disable-next-line no-console
      console.log("currentSession", currentSession);
    }
    const data: ResultType = await gqlOperation<string, VariablesType, HeadersType>(query, variables, headers);
    // eslint-disable-next-line no-console
    console.log("responseHandler", data);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in response handler", error);
    const err = error === "No current user" || error?.message === "Refresh Token has expired" ? ERRORS.unauthenticated : error;
    if (handleError !== undefined) {
      return handleError(err);
    }

    return ErrorHandler(err, navigation);
  }
};
