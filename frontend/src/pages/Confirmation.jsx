import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const ConfContainer = styled.div`
    width 80%;
    height 80%;
    background-color: blue; 

    display: flex;
    justify-content: center; 

`
const Confirmation = () => {
  return (
    <ConfContainer>
        <p>Hello From Confirmation Page</p>
        <p>Thank You for Waitlisting!</p>
        <p>A confirmation has been sent.</p>
        <p>Tell your friends about us!</p> 




    </ConfContainer>


  )};

export default Confirmation;
