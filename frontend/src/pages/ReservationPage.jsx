import React from 'react'

import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";


const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;

`;

const Wrapper = styled.section`
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    background: papayawhip;
`;


const ReservationPage = () => {

return(
    <Wrapper>
        <Title>
            Hello World!
        </Title>
    </Wrapper>
    );
};
export default ReservationPage;
