import React from 'react'

import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import FormInput from "../components/inputs/FormInput";

const RContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.form`
    background-color: ${({ theme }) => theme.colors.surface};

    width: 40%;
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
    overflow: auto;
`;

const RFormInput = styled(FormInput)`
    min-width: 80%;
    
    margin-bottom: 2rem;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;

`;


const ReservationPage = () => {

return(
    <RContainer>
        <FormContainer>
            <RFormInput>
                
            </RFormInput>
        </FormContainer>
    </RContainer>
    );
};
export default ReservationPage;
