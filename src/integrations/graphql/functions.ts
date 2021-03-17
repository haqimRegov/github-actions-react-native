import { API, graphqlOperation } from "aws-amplify";

export const gqlOperation = async <ResultType extends {}, VariablesType extends {}, HeadersType extends {} = {}>(
  query: string,
  variables?: VariablesType,
  headers?: HeadersType,
) => {
  try {
    const response = (await API.graphql(graphqlOperation(query, { input: variables }), { ...headers })) as {
      data: ResultType;
    };
    // eslint-disable-next-line no-console
    console.log("Response in gqlOperation", response);
    // if ("error" in response.data || Object.values(response.data).includes(null)) {
    //   throw Error;
    // }
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in gqlOperation at integrations/graphql/functions.ts", error);
    return error;
  }
};
