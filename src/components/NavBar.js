import React from "react";
import styled from "styled-components";
import excelIcon from "../assets/excel-icon.png";

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(224, 224, 224);
  display: flex;
  align-items: center;
  height: 70px;
  justify-content: center;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 20px;
`;

const ImgExcel = styled.img`
  width: 50px;
  height: 50px;
`;

function NavBar() {
  return (
    <Container>
      <ImgExcel src={excelIcon} />
      <Title>Csv Editor</Title>
    </Container>
  );
}

export default NavBar;
