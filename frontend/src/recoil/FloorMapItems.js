import { atom } from "recoil";

const shortid = require("shortid");

export const DEFAULT_NODE_DATA = {
  rotateAngle: 0,
  size: { height: 60, width: 60 },
  label: "",
};

const INITIAL_NODES = [
  // {
  //   type: "halfCircle",
  //   id: shortid.generate(),
  //   data: { ...DEFAULT_NODE_DATA, label: "3", rotateAngle: 30 },
  //   position: { x: 0, y: 0 },
  // },
  // {
  //   type: "circle",
  //   id: shortid.generate(),
  //   data: { ...DEFAULT_NODE_DATA, label: "a" },
  //   position: { x: 240, y: 0 },
  // },
  // {
  //   type: "lshape",
  //   id: shortid.generate(),
  //   data: { label: "f", size: { width: 120, height: 120 }, rotateAngle: 0 },
  //   position: { x: 60, y: 40 },
  // },
  // {
  //   type: "square",
  //   id: shortid.generate(),
  //   data: { ...DEFAULT_NODE_DATA, label: "BS" },
  //   position: { x: -40, y: 80 },
  // },
  // {
  //   type: "circle",
  //   id: shortid.generate(),
  //   data: { ...DEFAULT_NODE_DATA, label: "G5" },
  //   position: { x: 120, y: 220 },
  // },
  // {
  //   type: "square",
  //   id: shortid.generate(),
  //   data: { ...DEFAULT_NODE_DATA, label: "ZH" },
  //   position: { x: 120, y: 220 },
  // },
];

export const FloorMapItems = atom({
  key: "floorMapItems",
  default: INITIAL_NODES,
});
