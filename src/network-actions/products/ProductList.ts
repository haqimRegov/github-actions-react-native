import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getProductList = async (variables: IProductListRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IProductListQuery = await gqlOperation<IProductListQuery, IProductListRequest>(
      GQL_QUERIES.productList,
      variables,
      undefined,
      handleError,
    );
    return data.productList;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getProductList line 10 at ProductList.ts", error);
    return error;
  }
};
