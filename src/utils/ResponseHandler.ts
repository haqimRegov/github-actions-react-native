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

    if ("errors" in data) {
      throw data;
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in response handler", error);
    let err = error;
    if (error === "No current user" || error?.message === "Refresh Token has expired") {
      err = ERRORS.unauthenticated;
    } else if ("errors" in error) {
      err = ERRORS.internal;
    }

    if (handleError !== undefined) {
      return handleError(err);
    }

    return ErrorHandler(err, navigation);
  }
};
