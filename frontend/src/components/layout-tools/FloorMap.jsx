import React, { useState, useEffect, useRef } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";
import Tool from "./Tool";

const FloorMapContainer = styled.div`
  width: 100rem;
  height: 100rem;
  /* background-color: ${({ theme }) => theme.colors.primary}; */
  background-color: red;

  /* VERY IMPORTANT LINE: */
  /* ensures that the right margin is accounted for it overflows */
  display: inline-block;
`;

const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  background-color: #fff;
  position: relative;
`;

const opacityStyle = css`
  background-color: blue;
`;

const Board = ({ offset = { x: 0, y: 0 }, ...props }) => {
  const [items, setItems] = useState([]);

  const [endDropCoords, setEndDropCoords] = useState({ x: 0, y: 0 });
  const [{ item, isOver, didDrop, ...addedProps }, drop] = useDrop({
    accept: ItemTypes.TOOL,
    hover: (item, monitor) => {
      const fin = monitor.getClientOffset();

      const diffX = Math.abs(endDropCoords.x - fin.x);
      const diffY = Math.abs(endDropCoords.y - fin.y);

      if (diffX > 5 || diffY > 5) {
        setEndDropCoords({ x: fin.x - offset.x, y: fin.y - offset.y });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      didDrop: monitor.didDrop(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    console.log("hel", didDrop, item);

    if (item) {
      if (item.data.dropped) {
        const minusItemArray = items.filter(
          (f_i, i) => item.data.id !== f_i.id
        );
        const updatedItem = {
          id: item.data.id,
          data: item.data.data,
          coordinates: endDropCoords,
          dropped: true,
        };

        setItems([...minusItemArray, updatedItem]);
      } else {
        const newItem = {
          id: Math.random(),
          data: item.data.data,
          coordinates: endDropCoords,
          dropped: true,
        };
        console.log("newItem", newItem);
        setItems([...items, newItem]);
      }
    }
  }, [didDrop]);

  return (
    <BoardWrapper
      ref={drop}
      css={isOver ? opacityStyle : null}
      onClick={() => {
        console.log("items", items);
      }}
    >
      {items.map((item, i) => (
        <Tool key={i} info={item} />
      ))}
    </BoardWrapper>
  );
};

const FloorMap = () => {
  const fmRef = useRef();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (fmRef) {
      const offsetBounds = fmRef.current.getBoundingClientRect();
      console.log(offsetBounds);
      setOffset({ x: offsetBounds.x, y: offsetBounds.y });
    }
  }, [fmRef]);
  return (
    <FloorMapContainer ref={fmRef}>
      <Board offset={offset}></Board>
    </FloorMapContainer>
  );
};

export default FloorMap;
