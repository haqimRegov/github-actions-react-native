import { SAMPLE_CLIENTS } from "../../mocks";
import { ClientActionsType } from "../../store";

export const verifyClient = (actionProps: ClientActionsType, params: IClientDetails) => {
  // TODO integration
  // eslint-disable-next-line no-console
  console.log(params);
  // Pretend fetch
  const results = SAMPLE_CLIENTS[0];
  actionProps.addClientDetails(results as IClientDetailsState);
};
