import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import FormInput from "../components/inputs/FormInput";
import Card from "../components/Card";
import FloorMapBackground from "../components/FloorMapBackground";

import LinkPreview from "../assets/imgs/link-preview.png";
import { Link } from "react-router-dom";

const intro =
  "Unfortunately, we are a not like Yelp, you can't browse a listing of restaurants and just  waitlist or reserve :( However, you can continue using Yelp or your favorite way to find restaurants. As long as a restaurant signs up for our service, they will advertise a QR code or a link, you can use those two ways to waitlist or reserve. The restaurant may advertise the link on their Yelp page or on their website. They may have the QR code posted out on their storefront.";

const tldr =
  "w8r is not like yelp; use a link or QR code advertised by select restaurants to waitlist or reserve!";

const CustomerFAQContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const SectionContainer = styled.div`
  margin-top: 2rem;
  position: relative;
  z-index: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 45%;
  padding: 1rem;
  /* background-color: red; */
  img {
    width: 100%;
    object-fit: cover;
    /* max-width: 50rem; */
    border: 1px solid ${({ theme }) => theme.colors.outline};
  }

  @media (max-width: 1024px) {
    width: 80%;
  }
`;

const answerSpacing = css`
  margin-left: 2rem;
`;

const P = styled.p`
  ${answerSpacing}
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.onBackground};
`;

const TLDR = styled.p`
  ${answerSpacing}

  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.onBackground};
  span {
    color: inherit;

    font-weight: bold;
  }
`;

const Q = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.onBackground};
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Example = styled.p`
  /* ${answerSpacing} */
  margin-bottom: 0.5rem;

  margin-top: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.onBackground};
  span {
    color: inherit;

    font-weight: bold;
  }
`;

const MyLink = styled(Link)`
  font-weight: bold;
`;

const CustomerFAQ = () => {
  return (
    <CustomerFAQContainer>
      <SectionContainer>
        <ContentWrapper>
          <Q>Q: I'm a prototype reviewer, just let me see an example</Q>
          <P>
            Okay here you go; this is a link you might see on a restaurant's
            website or maybe on their yelp page:
          </P>

          <P>
            <MyLink to="/miles-steakhouse">w8r.it/miles-steakhouse</MyLink>
          </P>

          <P>See the question below for a more detailed explanation.</P>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <Q>Q: How do I find a restaurant to waitlist or reserve?</Q>
          <P>
            Unfortunately, we are a not like Yelp, you can't browse a listing of
            restaurants and just waitlist or reserve 🙃. However, you can
            continue using Yelp or your favorite way to find restaurants. As
            long as a restaurant signs up for our service, they will advertise a
            QR code or a link, you can use those two ways to waitlist or
            reserve. The restaurant may advertise the link on their Yelp page or
            on their website. They may have the QR code posted out on their
            storefront.
          </P>
          <TLDR>
            <span>TLDR: </span>
            w8r is not like yelp; use a link or QR code advertised by select
            restaurants to waitlist or reserve!
          </TLDR>

          <Example>
            <span>Example: </span>
            Where you might be able to find a w8r link on yelp
          </Example>
          <img
            src={LinkPreview}
            alt="Example of where you might find a w8r link"
          />
        </ContentWrapper>
      </SectionContainer>

      <FloorMapBackground />
    </CustomerFAQContainer>
  );
};

export default CustomerFAQ;
