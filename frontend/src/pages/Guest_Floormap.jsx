import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";


import { useHistory } from "react-router-dom";


const what = styled.div`
  background-color:lightblue;
  width:100%;
  height:100%;
`;

const GuestList_Floormap = () => {
  
  const history = useHistory();

  return (<what onClick={() => history.push("/Waitlist")}>
    <button>hi i am</button>
  </what>
  )
  ;
};

export default GuestList_Floormap;
