import { SAMPLE_CLIENT_4 } from "../../mocks";
import { ClientActionsType } from "../../store";

export const verifyClient = (actionProps: ClientActionsType, params: IClientDetails) => {
  // TODO integration
  const results = SAMPLE_CLIENT_4;
  const client = {
    ...results,
    mailingAddress: results.permanentAddress!,
    name: params.name!,
    id: params.id!,
    idType: params.idType!,
    verified: true,
  };
  actionProps.addClientDetails(client);
};
