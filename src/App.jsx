import React from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">Wild Oasis</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button>Check In</Button>
              <Button>Check Out</Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as="h2">Form</Heading>
            <Input type="number" placeholder="number of guests" />
            <Input type="number" placeholder="number of guests" />
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
