import React, {useState} from 'react'

import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";


import { useHistory } from "react-router-dom";


const RContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


//To initial the values 
const INITIAL = {
    /*S */
    name: "",
    phone: "",
    /*Party size*/
    date: ""
    /*table*/
};



const FormContainer = styled.form`
    background-color: ${({ theme }) => theme.colors.surface};

    width: 40%;
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    const history = useHistory();
    const [formValues, setFormValues] = useState(INITIAL);
    const [submitted, setSubmitted] = useState(false);

return(
    <RContainer>
        <FormContainer
            onSubmit={(e) => {
                e.preventDefault();
                console.log("formvalues", formValues);
                setSubmitted(true);
      
                setFormValues(INITIAL);
      
                history.push("/reservation-choose-table");
              }}
        >
            <Title>
                Reservation
            </Title>

            /*Dropdown Search for the resturant*/

            <RFormInput
                required
                htmlFor="name"
                label="name"
                value={formValues.name}
                handleChange={(e) => {
                    setFormValues({ ...formValues, name: e.target.value });
                }}
            />
            <RFormInput
                required
                htmlFor="phone"
                label="phone"
                value={formValues.phone}
                handleChange={(e) => {
                    setFormValues({ ...formValues, phone: e.target.value });
                }}
                additionalInfo="(###-###-####)"
                maxLength={12}
            />
            

            /*Dropdown*/

            <RFormInput
                required
                htmlFor="date"
                label="date"
                value={formValues.date}
                handleChange={(e) => {
                    setFormValues({ ...formValues, date: e.target.value });
                }}
                additionalInfo="(MM-DD-YYYY)"
                maxLength={10}
            />
            
            <Button text="Pick table"></Button>

        </FormContainer>
    </RContainer>
    );
};
export default ReservationPage;
