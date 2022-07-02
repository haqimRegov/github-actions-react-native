import React, { Fragment, FunctionComponent } from "react";
import { Pressable, Text } from "react-native";

import { CustomSpacer, EmptyTable } from "../../components";
import { Language } from "../../constants";
import { fs12BoldBlue8, fsUnderline, sh20 } from "../../styles";

const { DASHBOARD_HOME, EMPTY_STATE } = Language.PAGE;

interface EmptyStateTableProps {
  handleClearFilter?: () => void;
  isFetching: boolean;
  isNotFiltered: boolean;
  noTransactionsYet: boolean;
  search?: string;
}

export const EmptyStateTable: FunctionComponent<EmptyStateTableProps> = ({
  handleClearFilter,
  isFetching,
  isNotFiltered,
  noTransactionsYet,
  search,
}: EmptyStateTableProps) => {
  const noSearchResults = search !== undefined && search !== "";

  const title = noTransactionsYet === true ? DASHBOARD_HOME.EMPTY_TITLE_TRANSACTIONS : EMPTY_STATE.LABEL_NO_RESULTS;
  const emptySubtitle = noSearchResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : EMPTY_STATE.TITLE_FILTER;
  const subtitle = noTransactionsYet === true ? DASHBOARD_HOME.EMPTY_TRANSACTIONS_SUBTITLE : emptySubtitle;
  const hintText = noTransactionsYet === true ? undefined : EMPTY_STATE.SUBTITLE;

  return (
    <EmptyTable hintText={hintText} loading={isFetching} title={title} subtitle={subtitle}>
      {noSearchResults === false && isNotFiltered === false ? (
        <Fragment>
          <CustomSpacer space={sh20} />
          {handleClearFilter !== undefined ? (
            <Pressable onPress={handleClearFilter}>
              <Text style={{ ...fs12BoldBlue8, ...fsUnderline }}>{EMPTY_STATE.LABEL_CLEAR_ALL}</Text>
            </Pressable>
          ) : null}
        </Fragment>
      ) : null}
    </EmptyTable>
  );
};
