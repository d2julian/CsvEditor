import React, { useRef, useState } from "react";
import styled from "styled-components";
import DropFile from "./DropFile";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  background-color: white;
  ${mobile({ flexDirection: "column" })}
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Left = styled.div`
  margin-bottom: 15px;
  width: 60%;
`;

const Right = styled.div`
  height: 100%;
  border: 1px dashed #00a510;
  background: #f5fdf6;
  display: flex;
`;

const Title = styled.h1`
  font-size: 54px;
  font-weight: bold;
`;

const List = styled.ul`
  list-style-type: decimal;
`;
const ListItem = styled.li`
  text-align: left;
  font-size: 24px;
  font-weight: 200;
`;

function Header({ setFileData, setFileName }) {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Edit your csv file easy and fast</Title>
          <List>
            <ListItem>Load a valid file</ListItem>
            <ListItem>Edit it as you wish</ListItem>
            <ListItem>Click save & download</ListItem>
          </List>
        </Left>
      </Wrapper>
      <Wrapper>
        <Right>
          <DropFile setFileData={setFileData} setFileName={setFileName} />
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Header;
