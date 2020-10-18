import React from "react";
import { useDragLayer } from "react-dnd";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// import { ItemTypes } from "./ItemTypes";
// import { BoxDragPreview } from "./BoxDragPreview";
// import { snapToGrid } from "./snapToGrid";

// const layerStyles = {
//   position: "fixed",
//   pointerEvents: "none",
//   zIndex: 100,
//   left: 0,
//   top: 0,
//   width: "100%",
//   height: "100%",
// };
// function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
//   if (!initialOffset || !currentOffset) {
//     return {
//       display: "none",
//     };
//   }
//   let { x, y } = currentOffset;
//   if (isSnapToGrid) {
//     x -= initialOffset.x;
//     y -= initialOffset.y;
//     [x, y] = snapToGrid(x, y);
//     x += initialOffset.x;
//     y += initialOffset.y;
//   }
//   const transform = `translate(${x}px, ${y}px)`;
//   return {
//     transform,
//     WebkitTransform: transform,
//   };
// }

const TestDiv = styled.div`
  width: 10rem;
  height: 5rem;
  background-color: red; ;
`;

export const CustomDragLayer = (props) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  // function renderItem() {
  //   switch (itemType) {
  //     case ItemTypes.BOX:
  //       return <BoxDragPreview title={item.title} />;
  //     default:
  //       return null;
  //   }
  // }

  if (!isDragging) {
    return null;
  }
  return <TestDiv></TestDiv>;
};
