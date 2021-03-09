import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { flexCol, flexRow, flexWrap } from "../../styles";
import { CustomSpacer } from "../Views";

interface CustomCardProps {
  direction?: "row" | "column";
  items: JSX.Element[];
  itemsPerGroup?: number;
  noLastIndexSpace?: boolean;
  spaceBetweenGroup?: number;
  spaceBetweenItem?: number;
}

export const CustomCard: FunctionComponent<CustomCardProps> = ({
  direction,
  items,
  itemsPerGroup,
  noLastIndexSpace,
  spaceBetweenGroup,
  spaceBetweenItem,
}: CustomCardProps) => {
  const perChunk = itemsPerGroup !== undefined ? itemsPerGroup : 2; // items per chunk

  const cardItems = items.reduce((resultArray: JSX.Element[][], item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      // eslint-disable-next-line no-param-reassign
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  const chunksStyle = direction === "column" ? flexCol : flexRow;
  const container = direction === "column" ? flexRow : flexCol;
  // TODO improved styling for flex wrap if direction is column

  return (
    <View style={container}>
      {cardItems.map((chunks, chunksIndex) => {
        return (
          <Fragment key={chunksIndex}>
            <View style={{ ...chunksStyle, ...flexWrap }}>
              {chunks.map((chunk, chunkIndex) => {
                return (
                  <Fragment key={chunkIndex}>
                    {chunk}
                    {chunkIndex === chunks.length - 1 ? null : (
                      <CustomSpacer isHorizontal={direction !== "column"} space={spaceBetweenItem || 0} />
                    )}
                  </Fragment>
                );
              })}
            </View>
            {noLastIndexSpace === true && chunksIndex === cardItems.length - 1 ? null : (
              <CustomSpacer isHorizontal={direction === "column"} space={spaceBetweenGroup || 0} />
            )}
          </Fragment>
        );
      })}
    </View>
  );
};
