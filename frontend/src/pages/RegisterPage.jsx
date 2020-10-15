import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Input from "../components/inputs/Input";
import Card from "../components/Card";
import Button from "../components/buttons/Button";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/UserState";

const INITIAL_ACC_INFO = {
  restaurantName: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
  settings: {
    capacity: 50,
  },
};

const RegisterContainer = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;

const ButtonContainer = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const RegisterButton = styled(Button)`
  width: 100%;
`;

const RegisterPage = () => {
  const [user, setUser] = useRecoilState(userState);

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => setUser(data);

  const resNameReqs = {
    required: { value: true, message: "name required" },
  };

  const emailReqs = {
    required: { value: true, message: "email required" },
    validate: (value) => value.includes("@") || "email requires an @",
  };

  const passwordReqs = {
    required: { value: true, message: "password required" },
    minLength: { value: 8, message: "8 or more characters" },
  };

  const confirmPwReqs = {
    validate: (value) =>
      value === watch("password") || "passwords do not match",
  };

  return (
    <RegisterContainer>
      <Card>
        {/* noValidate disables the html5 validation and its ugly messages */}
        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="text"
            htmlFor="restaurant"
            label="restaurant name"
            name="restaurant"
            ref={register(resNameReqs)}
            error={errors.restaurant && errors.restaurant.message}
            css={css`
              margin-top: 1rem;
            `}
          />

          <Input
            type="email"
            htmlFor="email"
            label="email"
            name="email"
            ref={register(emailReqs)}
            error={errors.email && errors.email.message}
            css={css`
              margin-top: 1rem;
            `}
          />

          <Input
            type="password"
            htmlFor="password"
            label="password"
            name="password"
            ref={register(passwordReqs)}
            error={errors.password && errors.password.message}
            css={css`
              margin-top: 1rem;
            `}
          />

          <Input
            type="password"
            htmlFor="confirmPassword"
            label="confirm password"
            name="confirmPassword"
            ref={register(confirmPwReqs)}
            error={errors.confirmPassword && errors.confirmPassword.message}
            onClick={() => console.log(errors)}
            css={css`
              margin-top: 1rem;
            `}
          />
          <ButtonContainer>
            <RegisterButton type="submit" text="register" />
          </ButtonContainer>
        </FormContainer>
      </Card>
    </RegisterContainer>
  );
};

export default RegisterPage;
