import { API, graphqlOperation } from "aws-amplify";
import { Alert } from "react-native";

import { ERRORS } from "../../data/dictionary";

export const gqlOperation = async <ResultType extends {}, VariablesType extends {}, HeadersType extends {} = {}>(
  query: string,
  variables?: VariablesType,
  headers?: HeadersType,
  handleError?: ResponseErrorType,
) => {
  const errorHandling = () => {
    if (handleError !== undefined) {
      return handleError(ERRORS.internal);
    }
    return Alert.alert(ERRORS.internal.message);
  };
  try {
    const response = (await API.graphql(graphqlOperation(query, { input: variables }), { ...headers })) as {
      data: ResultType;
    };
    // eslint-disable-next-line no-console
    console.log("Response", response);
    if ("error" in response.data || Object.values(response.data).includes(null)) {
      throw Error;
    }
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in gqlOperation line 23 at integrations/graphql/functions.ts", error);
    errorHandling();
    return error;
  }
};
