import React, { useState } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

import styled from "@emotion/styled";
import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";
//import SearchBar2 from "../components/SearchBar2";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";

import Select from "react-select";

const partySizeArr = ["1","2","3","4","5","6","7","8","9","10"] 

const restaurantArray = [
  { restaurant_name: "Dominos" },
  { restaurant_name: "Papa John's" },
  { restaurant_name: "Red West" },
];

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Nothing = styled.input`
  width: 10rem;
  background-color: lightgray;
  color: black;
  height: 2rem;
`;

const DropdownR = styled.div`
  height: 10rem;
  width: 10rem;
  background-color: lightblue;

  position: absolute;

  top: 2rem;
  left: 0;
  z-index: 0;
`;

const SearchbarContainer = styled.div`
  position: relative;
  z-index: 5;
  /* background-color: red;

  width: 10rem;
  height: 5rem; */
`;

const SearchBar = () => {
  const [searchValue, setSelectedOption] = useState("");

  const handleChange = (e) => {
    console.log("settings new value", e.target.value);
    setSelectedOption(e.target.value);

    // setSelectedOption();
    // code to make something happen after selecting an option
  };

  return (
    <SearchbarContainer>
      {/* <Select
        options={options}
        onClick={handleChange}
        onChange={handleChange}
      /> */}
      <Nothing onChange={handleChange} type="text" />
      {searchValue !== "" && (
        <DropdownR>
          {options
            .filter((item) => {
              console.log(item);
              return item.value.includes(searchValue);
            })

            .map((item, i) => (
              <div>
                {i + " "}
                {item.value}
              </div>
            ))}
        </DropdownR>
      )}
      {/* <AB /> */}
    </SearchbarContainer>
  );
};

// const MyComponent = () => <Select options={options} />;

//Style for the search
const StyledSearch = styled(Select)`
  width: 300px;
  padding: 20px;
  .select__menu-list::-webkit-scrollbar {
    width: 4px;
    height: 0px;
  }
  .select__menu-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .select__menu-list::-webkit-scrollbar-thumb {
    background: #888;
  }
  .select__menu-list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const RContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

//To initial the values
const INITIAL = {
  /*S */
  name: "",
  phone: "",
  /*Party size*/
  date: "",
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

  return (
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
        <Title>Reservation</Title>
        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another Action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something</Dropdown.Item>
            </DropdownButton> */}
        {/*Dropdown Search for the resturant*/}
        {/*Input and then a div-loading all of the items in the array ==use the ecosystem props and state*/}
        
        {/* <SearchBar2 /> */}
        {/* <MyComponent /> */}
        <SearchBar />
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
        
        <DropdownButton id="party-size-dropdown" title="Party Size">
            {partySizeArr.map((item,i) => {return <Dropdown.Item href={item}>{item}</Dropdown.Item>})}
        </DropdownButton>

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
